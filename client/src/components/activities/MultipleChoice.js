import { Checkbox, FormControl, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
export default function MultipleChoice(props) {
  const { question, options, answer } = props;
  console.log(options);
  console.log(answer);

  const [correct, setCorrect] = useState(null);
  const [checked, setChecked] = useState(options.map((q) => false));

  function handleOnClick(index, isChecked) {
    let localChecked = checked.map((c) => false);
    if (isChecked) {
      localChecked[index] = true;
      if (index === answer) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    }
    setChecked(localChecked);
  }

  return (
    <Paper sx={{ marginBottom: "35px" }}>
      {question}
      <FormControl>
        {options.map((o) => {
          return (
            <Typography>
              <Checkbox
                onChange={(e, isChecked) => {
                  handleOnClick(o.index, isChecked);
                }}
                checked={checked[o.index]}
              />
              {o.text}
            </Typography>
          );
        })}
      </FormControl>
      {correct !== null && (
        <strong>{correct ? "Correct!" : "Incorrect!"}</strong>
      )}
    </Paper>
  );
}
