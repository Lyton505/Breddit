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
  const [commentCount, setCommentCount] = useState(0)
  const [comments, setComments] = useState([]);
  const { id = 9 } = useParams();

  useEffect(() => {
    const getSupabaseComments = async () => {
      const postComments = await supabase.from("comments").select().eq("post_id", id);
      setComments(postComments.data);
      setCommentCount(postComments.data.length);

    };
    getSupabaseComments();
  }, []);

  const [postData, , user] = useOutletContext();
  const [currPost] = postData.filter((post) => post.post_id === Number(id));


  async function handleCommentSubmit(event) {
    event.preventDefault();
    const commentText = event.target.elements.comment.value;

    setCommentCount(commentCount+1)

    const randomIndex = Math.floor(Math.random() * (3000 - 75 + 1)) + 75;
    console.log(comments);

    const commentAuthor = user.identities[0].identity_data.name

    const tempComment = {
      "comment_id": randomIndex,
      "created_at": "2024-04-14T21:55:38.387543+00:00",
      "comment": commentText,
      "author": commentAuthor,
    };

     const {data, err} = await supabase.from('comments').insert({
      "post_id": id,
    "comment": commentText,
      "author": commentAuthor,
    }).select("*");

    console.log(comments);

    setComments([tempComment, ...comments]);
    event.target.elements.comment.value = "";
  }

  const getImgUrl = () => {
    if (currPost.imageUrl === null || currPost.imageUrl === "" |
      currPost.imageUrl === undefined) {
      return bitCoinImg;
    } else {
      return currPost.image_url;
    }
  };

  return (<div>
    {postData.length > 0 ? (<>
      <Box sx={{ maxWidth: 600, mx: "auto", my: 4, padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {currPost.heading}
        </Typography>
        <Card>
          <CardMedia
            component="img"
            height="194"
            image={getImgUrl()}
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
                                  color: "#4578b9",
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
        <Typography>Here's what {commentCount} other users are
          saying:</Typography>
        <List>
          {comments.map((comment) => (
            <ListItem alignItems="flex-start" key={comment.comment_id}>
              <ListItemAvatar key={comment.comment_id}>
                <Avatar alt="Remy Sharp" src={comment.avatarUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={comment.author}
                secondary={<>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.comment}
                  </Typography>
                </>}
              />
            </ListItem>))}
        </List>
      </Box>

    </>) : <p>Fetching the data....</p>}
  </div>);
}
