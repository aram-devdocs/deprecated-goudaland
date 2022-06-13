import {
  Button,
  Container,
  FormControl,
  Box,
  Input,
  Paper,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [signupMode, setSignupMode] = useState(false);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "student",
  });
  const [debug, setDebug] = useState("");
  const [loader, setLoader] = useState(false);
  const _state = props._state;

  function createUser() {
    axios
      .post("/users/register", form)
      .then((r) => {
        console.log(r);
        setDebug(r.statusText);
        // if (r.data.status && r.data.status == 200) setSignupMode(false);
      })
      .catch((e) => {
        // window.alert(e.data.e);
        console.log(e);
        setDebug(e.response.data);
      });
  }

  function loginUser() {
    setLoader(true);
    // TODO - encrypt using bcrypt and pass a JWT to _state
    axios
      .post("/users/login", form)
      .then((r) => {
        console.log(r);
        _state.set.loggedIn(r.data);
        _state.set.role(r.data.role);
        localStorage.setItem("role", r.data.role);
        axios.defaults.headers.common["x-access-token"] = r.data.token;
        setDebug(JSON.stringify(r.data));
      })
      .catch((e) => {
        console.log(e);
        setDebug(e.response.data);
      });
  }

  function debugAPI() {
    // TODO - encrypt using bcrypt and pass a JWT to _state
    axios
      .get("/users/welcome")
      .then((r) => {
        console.log(r);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    // console.log("log in time");
  });
  const theme = useTheme();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        {" "}
        <Paper
          elevation={6}
          sx={{
            background: theme.palette.background.secondary,
            borderRadius: "400px",
            marginBottom: "10px",
          }}
        >
          <Box
            component={"img"}
            src={"/images/Original - Blue.png"}
            alt="logo"
            sx={{ height: "400px" }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" alignItems="center" justify="center">
          <Paper
            elevation={6}
            sx={{
              width: "800px",
              height: "400px",
              borderRadius: "30px",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "25%",
              paddingRight: "25%",
              paddingTop: "25px",
            }}
          >
            <Input
              type="email"
              autoComplete="email"
              required
              placeholder="Email"
              onChange={(e) => {
                setForm({ ...form, email: e.target.value.toLowerCase() });
              }}
              sx={{ width: "100%", borderRadius: "10px" }}
            />
            <br />
            <Input
              required
              autoComplete="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
              sx={{ width: "100%", borderRadius: "10px" }}
            />
            <br />
            {signupMode && (
              <div>
                <Input
                  required
                  placeholder="First Name"
                  onChange={(e) => {
                    setForm({ ...form, fname: e.target.value });
                  }}
                  sx={{ width: "100%", borderRadius: "10px" }}
                />
                <br />
                <Input
                  required
                  placeholder="Last Name"
                  onChange={(e) => {
                    setForm({ ...form, lname: e.target.value });
                  }}
                  sx={{ width: "100%", borderRadius: "10px" }}
                />
                <br />

                <InputLabel>Role</InputLabel>
                <Select
                  value={form.role}
                  label="role"
                  onChange={(e) => {
                    setForm({ ...form, role: e.target.value });
                  }}
                >
                  <MenuItem value={"student"}>Student</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </div>
            )}

            {!signupMode ? (
              <Button onClick={loginUser} variant="outlined">
                Login
              </Button>
            ) : (
              <div>
                <Button onClick={createUser} variant="outlined">
                  Sigup
                </Button>

                <Button
                  onClick={() => {
                    setSignupMode(false);
                  }}
                  variant="outlined"
                >
                  Back
                </Button>
              </div>
            )}

            {!signupMode && (
              <Button
                onClick={() => {
                  setSignupMode(true);
                }}
                variant="outlined"
              >
                New
              </Button>
            )}
          </Paper>
        </Grid>
        <Button onClick={debugAPI} variant="outlined">
          DEBUG
        </Button>
        <Typography>Login Response: {debug}</Typography>
      </Grid>
    </Grid>
  );
}
