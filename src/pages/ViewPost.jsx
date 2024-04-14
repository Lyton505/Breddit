import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import "/src/styles/view.css";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  ListItemAvatar,
  Typography
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt.js";
import bitCoinImg from "/postDefaultImage.jpg";
import { supabase } from "../utils/client.js";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ViewPost() {
  const [comments, setComments] = useState([]);
  const { id = 9 } = useParams();

  useEffect(() => {
    const getSupabaseComments = async () => {
      const postComments = await supabase.from("comments").select().eq("post_id", id);
      console.log("Comments ", postComments.data);
      setComments(postComments.data);
    };
    getSupabaseComments();
  }, []);

  const [postData] = useOutletContext();
  console.log("Incoming data: ", postData);


  console.log("The id: ", id);
  console.log("Our post: ", postData.filter((post) => post.post_id === Number(id)));

  const [currPost] = postData.filter((post) => post.post_id === Number(id));

  console.log(currPost);

  function handleCommentSubmit(event) {
    event.preventDefault();
    const commentText = event.target.elements.comment.value;

    // Here you would typically post the commentText to your backend/database
    console.log("Submitting comment:", commentText);
    // Clear the input field after submit
    event.target.elements.comment.value = "";
  }

  return (
    <div>
      {postData.length > 0 ?
        (<>
            <Box sx={{ maxWidth: 600, mx: "auto", my: 4, padding: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {currPost.heading}
              </Typography>
              <Card>
                <CardMedia
                  component="img"
                  height="194"
                  image={
                    currPost.image_url === null ?
                      currPost.image_url = bitCoinImg :
                      currPost.image_url = currPost.image_url
                  }
                  alt="Post image"
                />
                <CardContent>
                  <Typography variant="body1">{currPost.body}</Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {`Created on: ${currPost.created_at}`}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ThumbUpAltIcon color="action" className={"thumb"}
                                    sx={{
                                      "&:hover": {
                                        // backgroundColor: '#3498db', // Change to
                                        // your preferred hover color
                                        color: "#4578b9", // Optional: change the
                                                          // color of the icon as
                                                          // well
                                        cursor: "pointer"
                                      }
                                    }}
                    />
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {currPost.upvotes} Upvotes
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Divider sx={{ my: 2 }} />

              <Box component="form" onSubmit={handleCommentSubmit} noValidate
                   sx={{ mt: 2 }}>
                <TextField
                  id="comment"
                  label="Add a comment"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit Comment
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
                <Typography>Here's what {currPost.comments} other users are saying:</Typography>
              <List>
                {comments.map((comment) => (
                  <ListItem alignItems="flex-start" key={comment.comment_id}>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={comment.avatarUrl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.author}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {comment.comment}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

          </>
        )
        :
        <p>Fetching the data....</p>
      }
    </div>
  );
}
