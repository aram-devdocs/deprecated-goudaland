import { Input, Paper } from "@mui/material";
import { useState, useEffect } from "react";

export default function CodeCheck(props) {
  const { answer, question } = props;

  const [submission, setSubmission] = useState("");
  const [correct, setCorrect] = useState(null);

  function handleChange(e) {
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
      <Input
        onChange={handleChange}
        value={submission}
        placeholder="Write code here..."
      />
      {correct !== null && (
        <strong>{correct ? "Correct!" : "Incorrect!"}</strong>
      )}
    </Paper>
  );
}
