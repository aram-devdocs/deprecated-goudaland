import {
  Button,
  Container,
  FormControl,
  Input,
  Paper,
  Typography,
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
        setDebug(r.statusText);
      })
      .catch((e) => {
        console.log(e);
        setDebug(JSON.stringify(e.response));
      });
  }

  function debugUser() {
    // TODO - encrypt using bcrypt and pass a JWT to _state
    axios
      .post("/users/login", form)
      .then((r) => {
        if (r.data) {
          setDebug(r.response.data);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    console.log("log in time");
  });
  return (
    <Container>
      <Paper>
        {signupMode ? (
          <div>
            {" "}
            <Input
              placeholder="First Name"
              onChange={(e) => {
                setForm({ ...form, fname: e.target.value });
              }}
            />
            <br />
            <Input
              placeholder="Last Name"
              onChange={(e) => {
                setForm({ ...form, lname: e.target.value });
              }}
            />
            <br />
          </div>
        ) : (
          <></>
        )}
        <Input
          placeholder="Email"
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />
        <br />
        <Input
          placeholder="Password"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
        <br />

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
      ) : (
        <></>
      )}
      {/* <Button onClick={debugUser} variant="outlined">
        DEBUG
      </Button> */}
      <Typography>Login Response: {debug}</Typography>
    </Container>
  );
}
