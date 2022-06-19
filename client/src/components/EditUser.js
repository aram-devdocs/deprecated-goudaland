import { Container } from "@mui/system";
import { Paper, Select, MenuItem, IconButton } from "@mui/material";
import DeleteForever from "@mui/icons-material/DeleteForever";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EditUser(props) {
  const [users, setUsers] = useState([]);
  // Datatable options
  const options = {
    filterType: "checkbox",
  };

  useEffect(() => {
    axios
      .get("/users/admin_usersPopulateModules")
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

  const columns = [
    {
      name: "fullname",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "modules",
      label: "Modules",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const modules = users[dataIndex].modules;
          return (
            <Select defaultValue={modules.length > 0 ? modules[0]._id : "n/a"}>
              {modules.map((m) => (
                <MenuItem key={m} value={m._id}>
                  {m.title}
                </MenuItem>
              ))}
            </Select>
          );
        },
      },
    },
  ];
  return (
    <Container>
      {" "}
      <MUIDataTable
        title={"Modules"}
        data={users}
        columns={columns}
        options={options}
      />
    </Container>
  );
}
