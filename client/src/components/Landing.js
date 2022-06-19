import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
} from "@mui/material";

export default function Landing(props) {
  const { _state } = props;
  const admin = _state.get.role === "admin" ? true : false;
  const localModules = JSON.parse(localStorage.getItem("loggedIn")).modules;

  if (localModules.length === 0) {
    return <div>You aint got no modules dawg</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, margin: "80px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={5}>
            <Card
              sx={{
                minWidth: 275,
                height: "300px",
                overflow: "auto",
              }}
            >
              <CardContent>Content</CardContent>
              <CardActions>
                <Button
                  onClick={() => _state.set.content("posts")}
                  size="small"
                >
                  Posts
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={5}>
            <Card
              sx={{
                minWidth: 275,
                height: "300px",
                overflow: "auto",
              }}
            >
              <CardContent>Activites</CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => _state.set.content("modules")}
                >
                  View All
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
