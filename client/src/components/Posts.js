import {
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { CardActions, Card, CardContent } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import CommentIcon from "@mui/icons-material/Comment";

export default function Posts(props) {
  const { _state } = props;
  const admin = _state.get.role === "admin" ? true : false;
  // const [isVisible, setIsVisible] = useState({});

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/posts")
      .then((r) => {
        console.log(r);
        setPosts(
          r.data.map((p) => {
            return { ...p, showBody: false };
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <Container>
        <Typography>Posts:</Typography>
        {posts.map((p) => {
          return (
            <Paper key={p._id}>
              <Card sx={{ minWidth: "100px", marginBottom: "10px" }}>
                <CardContent>
                  <Typography
                    variant="h1"
                    sx={{ color: "black", fontSize: "20px" }}
                  >
                    {p.title}:{" "}
                    <Box  component={"span"} sx={{ fontSize: "16px", float: "right" }}>
                      {new Date(p.date).toString()}
                    </Box>
                  </Typography>

                  {p.description ? (
                    <Box>
                      <Typography variant="caption">{p.description}</Typography>
                      <Box
                        sx={{
                          visibility: p.showBody ? "visible" : "hidden",
                        }}
                      >
                        <Paper variant="outlined">
                          <div
                            dangerouslySetInnerHTML={{ __html: p.content }}
                          />
                        </Paper>
                      </Box>
                    </Box>
                  ) : (
                    <Paper variant="outlined">
                      <div dangerouslySetInnerHTML={{ __html: p.content }} />
                    </Paper>
                  )}
                </CardContent>
                <CardActions>
                  <Tooltip title="Comments">
                    <IconButton>
                      <CommentIcon />
                    </IconButton>
                  </Tooltip>
                  {p.description && (
                    <Tooltip title={p.showBody ? "Hide Body" : "Expand Body"}>
                      <IconButton
                        onClick={() => {
                          // Expand and show body
                          setPosts(
                            posts.map((r) => {
                              if (r._id === p._id) {
                                return {
                                  ...r,
                                  showBody: !r.showBody,
                                };
                              } else {
                                return r;
                              }
                            })
                          );
                        }}
                      >
                        {p.showBody ? (
                          <ArrowDropUpRoundedIcon />
                        ) : (
                          <ArrowDropDownRoundedIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}

                  {admin && (
                    <IconButton
                      onClick={() => {
                        axios
                          .post("/posts/delete", { id: p._id })
                          .then((r) => {
                            console.log(r);
                            setPosts(
                              posts.filter((post) => post._id !== p._id)
                            );
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  )}
                </CardActions>
              </Card>
            </Paper>
          );
        })}
      </Container>
    </div>
  );
}
