import { FormControl, Input, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeEditor from "./CodeEditor";

export default function CodeCheck(props) {
  const { answer, question } = props;

  const [submission, setSubmission] = useState("");
  const [correct, setCorrect] = useState(null);

  function handleChange(e) {
    // console.log(hljs);
    const txt = e.target.value;
    setSubmission(txt);

    if (txt) {
      if (txt.toLowerCase() === answer.toLowerCase()) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    } else {
      setCorrect(null);
    }
  }
  return (
    <Paper>
      {question}
      {/* <SyntaxHighlighter
          language="javascript"
          style={dark}
          showLineNumbers={true}
        >
          {submission}
        </SyntaxHighlighter>

        <Input
          sx={{ color: "white" }}
          onChange={handleChange}
          value={submission}
          placeholder="Write code here..."
        ></Input> */}

      <CodeEditor language="javascript" />
      {correct !== null && (
        <strong>{correct ? "Correct!" : "Incorrect!"}</strong>
      )}
    </Paper>
  );
}
