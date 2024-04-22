import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import "/src/styles/view.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]);
  const { id = 9 } = useParams();
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [postData, setPostData, user] = useOutletContext();
  const [currPost] = postData.filter((post) => post.post_id === Number(id));
  const [voted, setVoted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getSupabaseComments = async () => {
      const postComments = await supabase.from("comments").select().eq("post_id", id);
      setComments(postComments.data);
      setCommentCount(postComments.data.length);

    };
    getSupabaseComments();
    if (currPost) {
      setUpvoteCount(currPost.upvotes);
    }
  }, [currPost]);


  // console.log("Post data: ",postData);

  async function handleCommentSubmit(event) {
    event.preventDefault();
    const commentText = event.target.elements.comment.value;

    let currComments = commentCount + 1;
    setCommentCount(commentCount + 1);

    const randomIndex = Math.floor(Math.random() * (3000 - 75 + 1)) + 75;
    console.log(comments);

    const commentAuthor = user.identities[0].identity_data.name;

    const tempComment = {
      "comment_id": randomIndex,
      "created_at": "2024-04-14T21:55:38.387543+00:00",
      "comment": commentText,
      "author": commentAuthor
    };

    const { data, err } = await supabase.from("comments").insert({
      "post_id": id,
      "comment": commentText,
      "author": commentAuthor
    }).select("*");

    // console.log(comments);
    const oldPosts = postData.filter((post) => post.post_id !== Number(id));

    currPost.comments = currComments;

    setPostData([currPost, ...oldPosts]);

    await supabase
      .from("posts")
      .update({ "comments": currComments })
      .eq("post_id", id),

      setComments([tempComment, ...comments]);
    event.target.elements.comment.value = "";
  }

  const getImgUrl = () => {
    if (currPost.imageUrl === null || currPost.imageUrl === "" ||
      currPost.imageUrl === undefined) {
      return bitCoinImg;
    } else {
      return currPost.imageUrl;
    }
  };

  return (
    <div>
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

              <Box sx={{
                display: "flex", alignItems: "start", flexDirection: "row",
                gap: 10
              }}>
                <Box sx={{
                  display: "flex", alignItems: "start", flexDirection: "row"
                }}>
                  <ThumbUpAltIcon
                    color={"action"}
                    style={{ color: voted ? "#4578b9" : "" }}
                    className={"thumb"}
                    sx={{
                      "&:hover": {
                        color: "#4578b9",
                        cursor: "pointer"
                      }
                    }}
                    onClick={async () => {
                      let currUpvotes = upvoteCount;
                      if (!voted) {
                        currUpvotes++;
                        setUpvoteCount(upvoteCount + 1);

                      } else {
                        setUpvoteCount(upvoteCount - 1);
                        currUpvotes--;
                      }

                      // console.log("currPost: ", currPost);

                      const oldPosts = postData.filter((post) => post.post_id !== Number(id));

                      currPost.upvotes = currUpvotes;

                      setPostData([currPost, ...oldPosts]);

                      // console.log("old posts: ",oldPosts);

                      setVoted(!voted);

                      await supabase
                        .from("posts")
                        .update({ "upvotes": currUpvotes })
                        .eq("post_id", id);

                    }}
                  />
                  <Typography variant="subtitle2" sx={{ ml: 1 }}

                  >
                    {upvoteCount} Upvotes
                  </Typography>
                </Box>

                {user.identities[0].identity_data.name === currPost.poster
                  ?
                  <><Box sx={{
                    display: "flex", alignItems: "start", flexDirection: "row"
                  }}>
                    <EditIcon color="action" className={"edit"}
                    />
                    <Typography variant="subtitle2" onClick={() => {

                      navigate("/create", { state: { currPost } });
                    }}
                                sx={{
                                  ml: 1,
                                  "&:hover": {
                                    color: "#4578b9",
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    textDecorationColor: "red"
                                  }
                                }}
                    >
                      Edit Post
                    </Typography>
                  </Box>
                    <Box sx={{
                      display: "flex",
                      alignItems: "start",
                      flexDirection: "row"
                    }}>
                      <DeleteIcon color="action" className={"delete"}
                      />
                      <Typography variant="subtitle2" onClick={async () => {

                        await supabase
                          .from("posts")
                          .delete()
                          .eq("post_id", id);

                        navigate("/");

                        setPostData(
                          postData.filter((post) => post.post_id !== Number(id))
                        );
                      }}
                                  sx={{
                                    ml: 1,
                                    "&:hover": {
                                      color: "#4578b9",
                                      cursor: "pointer",
                                      textDecoration: "underline",
                                      textDecorationColor: "red"
                                    }
                                  }}
                      >
                        Delete Post
                      </Typography>
                    </Box></>
                  :
                  ""
                }

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
