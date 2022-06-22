import React, { Component, useState } from "react";
import { render } from "react-dom";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Button } from "@mui/material";
import draftToHtml from "draftjs-to-html";
import { Box } from "@mui/material";

// import "./Editor.css";
function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

function EditorContainer(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newState) => {
    // console.log(editorState)
    setEditorState(newState);
    props.getContent(sendContent());
  };

  const sendContent = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "700px",
        color: "black",
        overflow: "auto",
      }}
    >
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css"
      />
      {/* // TODO : Clean up editor styling */}
      <Editor
        // toolbarOnFocus
        spellCheck={true}
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </Box>
  );
}

export default EditorContainer;
