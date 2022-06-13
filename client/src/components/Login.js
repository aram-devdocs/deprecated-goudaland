import {
  Button,
  Container,
  FormControl,
  Input,
  Paper,
  Typography,
  InputLabel,
  Select,
  MenuItem,
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
  return (
    <Container>
      <Paper>
        <Input
          type="email"
          autoComplete="email"
          required
          placeholder="Email"
          onChange={(e) => {
            setForm({ ...form, email: e.target.value.toLowerCase() });
          }}
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
        />
        <br />
        {signupMode ? (
          <div>
            <Input
              required
              placeholder="First Name"
              onChange={(e) => {
                setForm({ ...form, fname: e.target.value });
              }}
            />
            <br />
            <Input
              required
              placeholder="Last Name"
              onChange={(e) => {
                setForm({ ...form, lname: e.target.value });
              }}
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
        ) : null}

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
      </Paper>
      {/* // TODO : Allow signups */}
      {!signupMode ? (
        <Button
          onClick={() => {
            setSignupMode(true);
          }}
          variant="outlined"
        >
          New
        </Button>
      ) : null}
      <Button onClick={debugAPI} variant="outlined">
        DEBUG
      </Button>
      <Typography>Login Response: {debug}</Typography>
    </Container>
  );
}
