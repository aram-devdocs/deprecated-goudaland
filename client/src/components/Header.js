import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";
import axios from "axios";

export default function Header(props) {
  const { _state } = props;

  function logout() {
    _state.set.loggedIn(null);
    axios.defaults.headers.common["x-access-token"] = "";
    localStorage.setItem("role", null);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={() => _state.set.content("landing")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            Goudaland
          </Typography>

          <Tooltip title="Create new post">
            <IconButton
              onClick={() => _state.set.content("admin")}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
