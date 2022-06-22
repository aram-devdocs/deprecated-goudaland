import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Container } from "@mui/system";
import { Box, Typography } from "@mui/material";
// import Box from "@mui/system";

import Interpreter from "js-interpreter";
export default function CodeEditor() {
  const [results, setResults] = useState("");
  const myInterpreter = new Interpreter("");
  function nextStep() {
    if (myInterpreter.step()) {
      // console.log()
      window.setTimeout(nextStep, 0);
    } else {
      console.log("safe");

      return true;
    }
  }

  const onChange = React.useCallback(async (value, viewUpdate) => {
    // console.log("value:", value);

    // i;
    if (await nextStep()) {
      myInterpreter.append();
      myInterpreter.run();
      setResults(myInterpreter.value);
      // alert(myInterpreter.value);
    }
  }, []);

  return (
    <Container>
      <CodeMirror
        value="console.log('hello world!');"
        height="200px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
      <Typography></Typography>

      {/* <Box></Box> */}
      <Box>
        <iframe
          title="sandbox"
          src="https://codesandbox.io/embed/new?codemirror=1"
          style={{
            width: "100%",
            height: "500px",
            border: 0,
            bordeRadius: "4px",
            overflow: "hidden",
          }}
          // style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
      </Box>
    </Container>
  );
}
// export default App;
