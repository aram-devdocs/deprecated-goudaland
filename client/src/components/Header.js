import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { Menu, MenuItem, Select, useTheme } from "@mui/material";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { Paper } from "@mui/material";
export default function Header(props) {
  const { _state } = props;
  const admin = _state.get.role === "admin" ? true : false;
  const theme = useTheme();

  const [fullModules, setModules] = useState([]);
  // const [selectedModule, setSelectedModule] = useState(
  //   localStorage.getItem("moduleId" || null)
  // );
  // Helpers
  function logout() {
    _state.set.content("landing");
    _state.set.loggedIn(null);
    axios.defaults.headers.common["x-access-token"] = "";
    localStorage.setItem("role", null);
  }

  const localModules = JSON.parse(localStorage.getItem("loggedIn")).modules;

  useEffect(() => {
    if (localModules.length > 0 && !localStorage.getItem("moduleId")) {
      localStorage.setItem("moduleId", localModules[0]);
    }

    if (fullModules.length === 0 && localModules.length > 0) {
      console.log("searchin");
      axios
        .get("/users/modules")
        .then((r) => {
          if (r.status === 200) {
            console.log(r);
            setModules(r.data.modules);
            if (!_state.get.selectedModule)
              _state.set.selectedModule(r.data.modules[0]._id);
            // window.location.reload();
          } else {
            throw new Error();
          }
        })
        .catch((e) => console.log(e));
    } else {
    }
  });

  return (
    <Box
      width
      sx={{
        flexGrow: 1,
        width: "100%",
        position: "fixed",
        overflow: "hidden",
        top: "0" /* Position the navbar at the top of the page */,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Paper
            elevation={2}
            sx={{
              background: theme.palette.background.default,
              borderRadius: "400px",
              marginRight: "10px",
              height: "50px",
            }}
          >
            <Tooltip title={"Home"}>
              <IconButton
                onClick={() => _state.set.content("landing")}
                // sx={{ paddingRight: "70%" }}
              >
                <Box
                  component={"img"}
                  src={"/images/logo.png"}
                  alt="logo"
                  sx={{ height: "50px", width: "100px" }}
                />
              </IconButton>
            </Tooltip>
          </Paper>

          <Typography variant="h6" component="div" sx={{ color: "white" }}>
            Goudaland
          </Typography>
          {/* </Button> */}

          {localModules.length > 0 && (
            <Select value={_state.get.selectedModule}>
              {fullModules.map((m) => (
                <MenuItem
                  onClick={() => {
                    _state.set.selectedModule(m._id);
                    localStorage.setItem("moduleId", m._id);
                  }}
                  value={m._id}
                  key={m._id}
                >
                  {m.title}
                </MenuItem>
              ))}
            </Select>
          )}

          {admin && (
            <Tooltip title="Admin Tools">
              <IconButton
                onClick={() => _state.set.content("admin")}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ marginLeft: "10px" }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
          <Button sx={{ marginLeft: "70%" }} onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
