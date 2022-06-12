import { Box, CssBaseline, ThemeProvider, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "./theme";
import axios from "axios";
import Login from "./components/Login";
import MasterLoader from "./components/MasterLoader";
import { Container } from "@mui/system";

export default function App() {
  // Handle Axios Settings
  axios.defaults.baseURL = "http://localhost:3005"; // PROD: MOVE TO PROCESS

  if (process.env.NODE_ENV === "development")
    axios.defaults.baseURL = "http://localhost:3005"; // MOVE TO PROCESS

  // Set App States
  const [tabIndex, setTabIndex] = useState(0);
  const [masterLoader, setLoader] = useState(true);
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
          // setLoggedIn({ ...loggedIn, token: r.data });
          // localStorage.setItem(
          //   "loggedIn",
          //   JSON.stringify({ ...loggedIn, token: r.data })
          // );
          setLoader(false);
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response.status);
          if (e.response.status === 401) {
            console.log("log out user expiry");
            _state.set.loggedIn(null);
            // localStorage.setItem("loggedIn", null);
            // setLoggedIn(null);
            setLoader(false);
          }
        });
    } else {
      console.log("not logged in")
      setLoader(false)
    }
  }, [loggedIn, masterLoader, _state.set]);

  // Helpers
  function onTabChange(event, newValue) {
    setTabIndex(newValue);
  }
  // if (masterLoader) return <MasterLoader />;
  return (
    // Setup theme and css baseline for the Material-UI app
    // https://mui.com/customization/theming/
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
                  Logged In{" "}
                  <Button onClick={() => _state.set.loggedIn(null)}>
                    Log Out
                  </Button>
                </Container>
              )}
            </div>
          )}
        </main>
      </Box>
    </ThemeProvider>
  );
}
