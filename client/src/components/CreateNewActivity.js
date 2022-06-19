import { Container } from "@mui/system";
import { Button, Input, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

import axios from "axios";
export default function CreateNewActivity(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [moduleId, setModuleId] = useState("n/a");

  const [modules, setModules] = useState([]);

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  function handleModuleId(e) {
    setModuleId(e.target.value);
  }
  function createActivity() {
    if (moduleId === "n/a") return;
    axios
      .post("/activites/create", { title, description, content, moduleId })
      .then((r) => {
        if (r.status === 200) {
          console.log(r);
          setTitle("")
          setDescription("")
          setContent("")
          setModuleId("n/a")
          //   setModules([...modules, r.data.data]);
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    axios
      .get("/modules")
      .then((r) => {
        if (r.status === 200) {
          console.log(r);
          setModules(r.data);
          //   setModuleId(r.)
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container>
      <Paper sx={{ marginBottom: "30px" }}>
        <Input onChange={handleTitle} value={title} placeholder={"Title"} />
        <br />
        <Input
          onChange={handleDescription}
          value={description}
          placeholder={"Description"}
        />
        <br />
        <Input
          onChange={handleContent}
          value={content}
          placeholder={"content"}
        />
        <br />
        <InputLabel>Module:</InputLabel>
        <Select onChange={handleModuleId} value={moduleId}>
          <MenuItem value={"n/a"}>N/A</MenuItem>
          {modules.map((m) => {
            return <MenuItem value={m.id}>{m.title}</MenuItem>;
          })}
        </Select>
        <br />
        <Button onClick={createActivity}> Create Activity </Button>
      </Paper>
    </Container>
  );
}
