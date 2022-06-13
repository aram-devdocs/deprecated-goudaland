import { Button, Typography, Paper, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { CardActions, Card, CardContent } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Posts(props) {
  const { _state } = props;
  const admin = _state.get.role === "admin" ? true : false;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/posts")
      .then((r) => {
        console.log(r);
        setPosts(r.data);
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
                  <Typography sx={{ color: "black" }}>
                    {p.title}: {new Date(p.date).toString()}
                  </Typography>
                  <div dangerouslySetInnerHTML={{ __html: p.content }} />
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                  {admin && (
                    <IconButton
                      onClick={() => {
                        axios
                          .post("/posts/delete", { id: p._id })
                          .then((r) => {
                            console.log(r);
                            setPosts(posts.filter((post) => post._id !== p._id));
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
