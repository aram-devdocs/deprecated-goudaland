import { Container } from "@mui/system";
import {
  Button,
  Checkbox,
  IconButton,
  Input,
  InputBase,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

import axios from "axios";
import DeleteForever from "@mui/icons-material/DeleteForever";
export default function CreateNewModule(props) {
  const { _state } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [modules, setModules] = useState([]);

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function createModule() {
    axios
      .post("/modules/create", { title, description })
      .then((r) => {
        if (r.status === 200) {
          console.log(r);
          setModules([...modules, { ...r.data.data, activity: [] }]);
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const [users, setUsers] = useState([]);
  // Datatable options

  useEffect(() => {
    axios
      .get("/users/admin_users")
      .then((r) => {
        if (r.status === 200) {
          console.log(r);
          setUsers(r.data);
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/modules")
      .then((r) => {
        if (r.status === 200) {
          console.log(r);
          setModules(r.data);
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Datatable options
  const options = {
    filterType: "checkbox",
  };

  const columns = [
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "activites",
      label: "Activites",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const moduleId = modules[dataIndex].id;
          const activites = modules[dataIndex].activity;
          return (
            <Select
              defaultValue={activites.length > 0 ? activites[0]._id : "n/a"}
            >
              {activites.map((a) => (
                <MenuItem key={a._id} value={a._id}>
                  {a.title}{" "}
                  <IconButton
                    onClick={() => {
                      axios
                        .delete(`/activites/${a._id}`)
                        .then((r) => {
                          if (r.status === 200) {
                            setModules(
                              modules.map((m) => {
                                if (m.id !== moduleId) {
                                  return m;
                                } else {
                                  return {
                                    ...m,
                                    activity: m.activity.filter(
                                      (ma) => ma._id !== a._id
                                    ),
                                  };
                                }
                              })
                            );
                          }
                        })
                        .catch((e) => console.log(e));
                    }}
                  >
                    <DeleteForever fontSize="small" />
                  </IconButton>
                </MenuItem>
              ))}
            </Select>
          );
        },
      },
    },

    {
      name: "users",
      label: "Users",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          // console.log("rerender");
          const moduleId = modules[dataIndex].id;
          return (
            <Select defaultValue={users.length > 0 ? users[0]._id : "n/a"}>
              {users.map((u) => (
                <Button
                  sx={
                    !u.modules.includes(moduleId)
                      ? { backgroundColor: "red" }
                      : { backgroundColor: "green" }
                  }
                  key={u.id}
                  value={u.id}
                  onClick={() => {
                    if (!u.modules.includes(moduleId)) {
                      axios
                        .put("/users/admin_addModuleToUser", {
                          userId: u.id,
                          moduleId,
                        })
                        .then((r) => {
                          if (r.status === 200) {
                            //
                            _state.flash.error("Added");
                          } else {
                            throw new Error();
                          }
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    } else {
                      axios
                        .put("/users/admin_removeModuleFromUser", {
                          userId: u.id,
                          moduleId,
                        })
                        .then((r) => {
                          if (r.status === 200) {
                            _state.flash.error("Removed");
                          } else {
                            throw new Error();
                          }
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }
                  }}
                >
                  {u.fullname}
                </Button>
              ))}
            </Select>
          );
        },
      },
    },

    {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const moduleId = modules[dataIndex].id;
          return (
            <Button
              onClick={() => {
                axios
                  .delete(`/modules/${moduleId}`)
                  .then((r) => {
                    if (r.status === 200) {
                      setModules(modules.filter((m) => m.id !== moduleId));
                    }
                  })
                  .catch((e) => console.log(e));
              }}
            >
              Delete
            </Button>
          );
        },
      },
    },
  ];

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
        <Button onClick={createModule}> Create Module </Button>
      </Paper>

      <MUIDataTable
        title={"Modules"}
        data={modules}
        columns={columns}
        options={options}
      />
    </Container>
  );
}
