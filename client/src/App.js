import {
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "./theme";
import axios from "axios";
import Login from "./components/Login";
import MasterLoader from "./components/MasterLoader";
import { Container } from "@mui/system";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Posts from "./components/Posts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Modules from "./components/Modules";
import Admin from "./components/Admin";
import FlashMessage from "./components/FlashMessage";
import Activites from "./components/Activties";
export default function App() {
  // Handle Axios Settings
  axios.defaults.baseURL = "http://localhost:3005"; // PROD: MOVE TO PROCESS

  if (process.env.NODE_ENV === "development")
    axios.defaults.baseURL = "http://localhost:3005"; // MOVE TO PROCESS

  // Set App States
  const [masterLoader, setLoader] = useState(true);
  const [content, setContent] = useState(
    localStorage.getItem("last_content") || "landing"
  );
  const [selectedModule, setSelectedModule] = useState(
    localStorage.getItem("moduleId" || null)
  );
  const [history, setHistory] = useState([]);
  // Set _state States
  const [view, setView] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || null
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "student");

  // Set Flash Messagae
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [severity, setSeverity] = useState("error");
  // Global _state handler
  const _state = {
    get: {
      view,
      role,
      selectedModule,
    },
    set: {
      view: (data) => setView(data),
      role: (data) => setRole(data),
      content: (data) => {
        if (data === history[history.length - 1]) return;
        if (data === "landing") {
          setHistory([]);
          setContent("landing");
          return;
        }
        setHistory([...history, data]);
        localStorage.setItem("last_content", data);
        setContent(data);
      },
      loggedIn: (data) => {
        const storage = data ? JSON.stringify(data) : null;
        localStorage.setItem("loggedIn", storage);

        setLoggedIn(data);
      },
      selectedModule: (data) => {
        setSelectedModule(data);
      },
    },

    flash: {
      error: (msg) => {
        setSeverity("error");
        setAlertMessage(msg);
        setAlertOpen(true);
      },
    },

    switch: {},
  };

  useEffect(() => {
    // Handle last view

    // Handle login state
    if (masterLoader && loggedIn) {
      axios.defaults.headers.common["x-access-token"] = loggedIn.token;

      axios
        .post("/users", loggedIn)
        .then((r) => {
          // console.log(r.data.modules);
          _state.set.loggedIn({
            ...loggedIn,
            token: r.data.token,
            modules: r.data.modules,
          });
          setLoader(false);
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response.status);
          if (e.response.status === 401) {
            console.log("log out user expiry");
            _state.set.loggedIn(null);
            setLoader(false);
          }
        });
    } else {
      console.log("not logged in");
      setLoader(false);
    }

    return () => {
      // Set last view
      // localStorage.setItem("content", content);
    };
  }, [loggedIn, masterLoader, _state.set, content]);

  // Helpers
  const contentComponents = {
    landing: <Landing _state={_state} />,
    admin: <Admin _state={_state} />,
    posts: <Posts _state={_state} />,
    calendar: "",
    modules: <Activites _state={_state} />,
    settings: "",
    loader: <MasterLoader />,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        {loggedIn && <Header _state={_state} />}

        <main style={{ marginTop: "70px" }}>
          {loggedIn && content !== "landing" && (
            <Tooltip
              title={
                history.length > 1 ? history[history.length - 2] : "Landing"
              }
            >
              <IconButton
                sx={{ position: "fixed" }}
                onClick={() => {
                  console.log(history);
                  if (history.length > 1) {
                    setContent(history[history.length - 2]);
                    const newHistory = history;
                    newHistory.pop();
                    setHistory(newHistory);
                    return;
                  }
                  setHistory([]);
                  setContent("landing");
                  localStorage.removeItem("last_content");
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
          {masterLoader ? (
            <MasterLoader />
          ) : (
            <div>
              {!loggedIn ? (
                <Login _state={_state} />
              ) : (
                <Box sx={{ margin: 0, padding: 0 }}>
                  {/* <Box sx={{ height: "30px" }}>&nbsp </Box> */}

                  {contentComponents[content]}
                </Box>
              )}
            </div>
          )}
        </main>
        <FlashMessage
          openSnackbar={alertOpen}
          setOpenSnackbar={setAlertOpen}
          message={alertMessage}
          severity={severity}
        />
      </Box>
    </ThemeProvider>
  );
}
