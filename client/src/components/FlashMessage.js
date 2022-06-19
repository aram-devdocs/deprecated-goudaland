import React, { useState } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FlashMessage(props) {
  const {
    openSnackbar,
    setOpenSnackbar,
    severity,
    message,
    horizontal = "center",
    vertical = "top",
  } = props;
  // const [open, setOpen] = useState(openSnackbar);

  // const handleClick = () => {
  //     setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
