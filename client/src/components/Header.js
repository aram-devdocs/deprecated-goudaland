import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { Paper } from "@mui/material";
export default function Header(props) {
  const { _state } = props;
  const admin = _state.get.role === "admin" ? true : false;

  const theme = useTheme();
  function logout() {
    _state.set.loggedIn(null);
    axios.defaults.headers.common["x-access-token"] = "";
    localStorage.setItem("role", null);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title={"Home"}>
            <Button
              onClick={() => _state.set.content("landing")}
              sx={{ flexGrow: 1 }}
            >
              <Paper
                elevation={2}
                sx={{
                  background: theme.palette.background.default,
                  borderRadius: "400px",
                  marginRight: "10px",
                  height: "50px",
                }}
              >
                <Box
                  component={"img"}
                  src={"/images/logo.png"}
                  alt="logo"
                  sx={{ height: "50px", width: "100px" }}
                />
              </Paper>

              <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer", color: "white" }}
              >
                Goudaland
              </Typography>
            </Button>
          </Tooltip>

          {admin && (
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
          )}
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
