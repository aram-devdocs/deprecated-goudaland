import { Button, Typography, Paper } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Landing(props) {
  const { _state } = props;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/posts")
      .then((r) => {
        console.log(r);
        setPosts(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Container>
        <Typography>Posts:</Typography>
        {posts.map((p) => {
          return (
            <Paper key={p._id}>
              <Typography sx={{ color: "black" }}>
                {p.title}: {new Date(p.date).toString()}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: p.content }} />
            </Paper>
          );
        })}
      </Container>
    </div>
  );
}
