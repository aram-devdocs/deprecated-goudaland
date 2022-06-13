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
                <Button size="small">View All</Button>
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
              <CardContent>Calendar</CardContent>
              <CardActions>
                <Button size="small">Expand</Button>
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
              <CardContent>Settings</CardContent>
              <CardActions>
                <Button size="small">View All</Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
        {admin && (
          <Grid item xs={6}>
            <Paper elevation={5}>
              <Card
                sx={{
                  minWidth: 275,
                  height: "300px",
                  overflow: "auto",
                }}
              >
                <CardContent>Admin</CardContent>
                <CardActions>
                  {/* <Tooltip title="Create new post"> */}
                    <IconButton
                      onClick={() => _state.set.content("admin")}
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ marginLeft: "10px" }}
                    >
                      <AddIcon />
                    </IconButton> Create Post
                  {/* </Tooltip> */}
                  {/* <Button size="small">View All</Button> */}
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
