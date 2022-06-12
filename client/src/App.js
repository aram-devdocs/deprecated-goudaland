import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "./theme";
import axios from "axios";
import Login from "./components/Login";
import MasterLoader from "./components/MasterLoader";
import { Container } from "@mui/system";
import Header from "./components/Header";
import CreateNewPost from "./components/CreateNewPost";
import Landing from "./components/Landing";
export default function App() {
  // Handle Axios Settings
  axios.defaults.baseURL = "http://localhost:3005"; // PROD: MOVE TO PROCESS

  if (process.env.NODE_ENV === "development")
    axios.defaults.baseURL = "http://localhost:3005"; // MOVE TO PROCESS

  // Set App States
  const [tabIndex, setTabIndex] = useState(0);
  const [masterLoader, setLoader] = useState(true);
  const [content, setContent] = useState("landing");
  // Set _state States
  const [view, setView] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || null
  );

  // Global _state handler
  const _state = {
    get: {
      view: view,
    },
    set: {
      view: (data) => setView(data),
      content: (data) => setContent(data),
      loggedIn: (data) => {
        const storage = data ? JSON.stringify(data) : null;
        localStorage.setItem("loggedIn", storage);

        setLoggedIn(data);
      },
    },

    switch: {},
  };

  useEffect(() => {
    // Handle login state
    if (masterLoader && loggedIn) {
      axios.defaults.headers.common["x-access-token"] = loggedIn.token;

      axios
        .post("/users", loggedIn)
        .then((r) => {
          console.log(r);
          _state.set.loggedIn({ ...loggedIn, token: r.data });
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
  }, [loggedIn, masterLoader, _state.set]);

  // Helpers
  const contentComponents = {
    landing: <Landing _state={_state} />,
    admin: <CreateNewPost />,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <main>
          {masterLoader ? (
            <MasterLoader />
          ) : (
            <div>
              {!loggedIn ? (
                <Login _state={_state} />
              ) : (
                <Container>
                  <Header _state={_state} />
                  {contentComponents[content]}
                </Container>
              )}
            </div>
          )}
        </main>
      </Box>
    </ThemeProvider>
  );
}
