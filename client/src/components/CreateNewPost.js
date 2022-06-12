import { Container } from "@mui/system";
import React, { useState } from "react";
import Editor from "./Editor";
import { Button, Paper, Input, Typography } from "@mui/material";
import axios from "axios";
export default function CreateNewPost(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  function submitPost() {
    console.log(content);
    axios
      .post("/posts/create", { title, content })
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <Container>
      Create new post:{" "}
      {!preview ? (
        <div>
          <Paper>
            <Input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Paper>

          <Editor
            getContent={(data) => {
              setContent(data);
            }}
          />
          <Button onClick={() => setPreview(true)}>Preview</Button>
        </div>
      ) : (
        <div>
          <Paper sx={{ height: "700px", overflow: "auto" }}>
            <Typography variant="h6">{title}</Typography>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Paper>
          <Button onClick={submitPost}>Submit</Button>
          <Button onClick={() => setPreview(false)}>Edit</Button>
        </div>
      )}
    </Container>
  );
}
