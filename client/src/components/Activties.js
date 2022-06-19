import { Container } from "@mui/system";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
export default function Activites(props) {
  const { _state } = props;
  const [activities, setActivites] = useState([]);
  useEffect(() => {
    axios
      .get(`/posts/${localStorage.getItem("moduleId")}`)
      .then((r) => {
        console.log(r);
        setActivites(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [_state.get.selectedModule]);

  // MUI Datatable Settings
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
  ];
  return (
    <Container>
      <MUIDataTable
        title={"Activites "}
        data={activities}
        columns={columns}
        options={options}
      />
    </Container>
  );
}
