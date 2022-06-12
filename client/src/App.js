import { Box, CssBaseline, ThemeProvider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "./theme";
import axios from "axios";
import Login from "./components/Login";

export default function App() {
  // Handle Axios Settings
  axios.defaults.baseURL = "http://localhost:3005"; // PROD: MOVE TO PROCESS

  if (process.env.NODE_ENV === "development")
    axios.defaults.baseURL = "http://localhost:3005"; // MOVE TO PROCESS

  // Set App States
  const [tabIndex, setTabIndex] = useState(0);

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
        localStorage.setItem("loggedIn", JSON.stringify(data));

        setLoggedIn(data);
      },
    },

    switch: {},
  };

  useEffect(() => {
    console.log(loggedIn);
  }, []);

  // Helpers
  function onTabChange(event, newValue) {
    setTabIndex(newValue);
  }
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
          <Login _state={_state} />
        </main>
      </Box>
    </ThemeProvider>
  );
}
