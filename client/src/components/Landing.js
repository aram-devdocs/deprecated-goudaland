import { Button, Typography, Paper } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Posts from "./Posts";

export default function Landing(props) {
  const { _state } = props;

  return (
    <div>
      <Container>
        <Posts _state={_state} />
      </Container>
    </div>
  );
}
