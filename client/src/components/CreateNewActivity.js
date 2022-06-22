import { Container } from "@mui/system";
import {
  Button,
  Checkbox,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

import axios from "axios";
import MultipleChoice from "./activities/MultipleChoice";
import CodeCheck from "./activities/CodeCheck";
export default function CreateNewActivity(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [moduleId, setModuleId] = useState("n/a");
  const [preview, setPreview] = useState([]);
  const [modules, setModules] = useState([]);

  // const [questions, setQuestions] = useState([]);

  const [question, setQuestion] = useState({
    name: "",
    choices: [""],
    answer: 0,
  });

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
    console.log(content);
    // return;
    if (moduleId === "n/a") return;
    axios
      .post("/activites/create", {
        title,
        description,
        content: JSON.stringify(content),
        moduleId,
      })
      .then((r) => {
        if (r.status === 200) {
          console.log(r);
          setTitle("");
          setDescription("");
          setContent([]);
          setModuleId("n/a");
          //   setModules([...modules, r.data.data]);
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function setMultipleChoice() {
    const Choice = (props) => {
      const { i } = props;
      return (
        <div>
          <Input
            onChange={(e) => {
              question.choices = question.choices.map((m, index) => {
                if (index === i) {
                  return e.target.value;
                }
                return m;
              });
            }}
            // value={question.choices[i]}
            defaultValue={question.choices[i]}
            placeholder={`Choice ${i}`}
          />
          <Checkbox
            value={i}
            checked={question.answer === i}
            onChange={() => {
              question.answer = i;
              // console.log(qu)
              setMultipleChoice();
            }}
          />
        </div>
      );
    };
    const QuestionForm = (props) => {
      // useEffect(() => {}, [question.choices]);
      return (
        <div>
          <Input
            onChange={(e) => {
              console.log(e.target.value);
              question.name = e.target.value;
              // setQuestion({ ...question, name: e.target.value });
            }}
            // value={question.name}
            placeholder="Question name:"
          />
          <br />
          {question.choices.map((q, i) => {
            return <Choice i={i} />;
          })}

          <Button
            onClick={() => {
              content.push({
                ...question,
                type: "multiple_choice",
                choices: question.choices.map((q, i) => {
                  return { index: i, text: q };
                }),
              });
              setQuestion({ name: "", choices: [""], answer: 0 });
              setPreview([]);
            }}
          >
            Add To Preview
          </Button>

          <Button
            onClick={() => {
              question.choices.push("");
              setMultipleChoice();
            }}
          >
            Add Choice
          </Button>
        </div>
      );
    };

    setPreview(QuestionForm);
  }

  function setCodeInput() {}

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
        {/* <Input
          onChange={handleContent}
          value={content}
          placeholder={"content"}
        />
        <br /> */}
        <InputLabel>Module:</InputLabel>
        <Select onChange={handleModuleId} value={moduleId}>
          <MenuItem value={"n/a"}>N/A</MenuItem>
          {modules.map((m) => {
            return <MenuItem value={m.id}>{m.title}</MenuItem>;
          })}
        </Select>

        <br />
        <Button onClick={createActivity}> Create Activity </Button>
        <br></br>
        <Button onClick={setMultipleChoice}>MultipleChoice</Button>
        <Button onClick={setCodeInput}>Code Input</Button>
      </Paper>

      <Paper>
        New:
        <br /> {preview}
      </Paper>

      <br />
      {content.length > 0 && (
        <Paper>
          Preview:{" "}
          {content.map((c) => (
            <MultipleChoice
              question={c.name}
              options={c.choices}
              answer={c.answer}
            />
          ))}{" "}
        </Paper>
      )}

      {/* <MultipleChoice
        question={"Test question"}
        options={[
          { index: 0, text: "option one" },
          { index: 1, text: "option two" },
          { index: 2, text: "option three" },
          { index: 3, text: "option four" },
        ]}
        answer={0}
      />

       */}

      <br />
      <CodeCheck question={"Code question"} answer={"The text"} />
    </Container>
  );
}
