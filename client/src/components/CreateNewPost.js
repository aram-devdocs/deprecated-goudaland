import { Container } from "@mui/system";
import React, { useState } from "react";
import Editor from "./Editor";
import { Button, Paper, Input, Typography } from "@mui/material";
import axios from "axios";
export default function CreateNewPost(props) {
  const { _state } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  function submitPost() {
    console.log(content);
    axios
      .post("/posts/create", { title, content, description })
      .then((r) => {
        console.log(r);
        _state.set.content("landing");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <Container>
      <Typography>Create new post:</Typography>
      {!preview ? (
        <div>
          <Paper>
            <Input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
            <br />
            <Input
              placeholder="Description (Optional)"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              fullWidth
              sx={{ height: "100px" }}
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
