import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import { supabase } from "../utils/client.js";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

export default function CreatePost() {

  const location = useLocation();
  let pageFunction = "create";

  let currPost = "";


  if (location.state && location.state.hasOwnProperty("currPost")) {
    currPost = location.state.currPost;
    // console.log("CurrPost on url redir ", currPost);
    pageFunction = "update";
  }

  const navigate = useNavigate();
  const [postData, setPostData, user] = useOutletContext();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [body, setBody] = useState("");
  const [flag, setFlag] = useState("question");

  let poster = user.identities[0].identity_data.name;

  if (poster === undefined || poster === "") {
    poster = user.identities[0].identity_data.user_name;
  }

  useEffect(() => {
    if (pageFunction === "update") {
      setBody(currPost.body);
      setTitle(currPost.heading);
      setFlag(currPost.flag);
      setImage(currPost.imageUrl);
    }
  }, [currPost, pageFunction]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const randomIndex = Math.floor(Math.random() * (3000 - 75 + 1)) + 75;

    const currDataObj = {

      "comments": 0,
      "post_id": randomIndex,
      "created_at": new Date().toISOString().slice(11, 19),
      "image": image,
      "body": body,
      "imageUrl": "",
      "upvotes": 0,
      "flag": flag,
      "heading": title,
      "poster": poster
    };

    setPostData([currDataObj, ...postData]);

    console.log("Form data", currDataObj);
    supabaseSubmit();
  };

  let postId = -1;

  const supabaseSubmit = async () => {


    console.log("Uploaded by ", poster);
    if (pageFunction !== "update") {
      const { data, error } = await supabase.from("posts").upsert({
        "heading": title,
        "body": body,
        "flag": flag,
        "poster": poster
      }).select("*");
      const creationTime = data[0].updated_at.slice(11, 19);
      postId = data[0].post_id;

      await supabase
        .from("posts")
        .update({ "created_at": creationTime })
        .eq("post_id", postId);

    } else {
      const { data, error } = await supabase.from("posts").update({
        "heading": title,
        "body": body,
        "flag": flag
      }).eq("post_id", postId);
    }

    console.log("Form posted to supabase!");

    navigate("/");

  };

  const handleBodyChange = (event) => {
    const text = event.target.value;
    // Limit to 50 words
    const words = text.split(/\s+/);
    if (words.length <= 50) {
      setBody(text);
    } else {
      // Truncate the text to the first 50 words
      setBody(words.slice(0, 50).join(" "));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h4">
        What's on your mind today?
      </Typography>
      <TextField
        required
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        {/*<InputLabel htmlFor="image-upload">Upload Image</InputLabel>*/}
        <Input
          id="image-upload"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <FormHelperText>Optional: Attach image</FormHelperText>
      </FormControl>
      <TextField
        required
        fullWidth
        label="Body"
        multiline
        rows={4}
        value={body}
        onChange={handleBodyChange}
        margin="normal"
        helperText={`${body.split(/\s+/).length}/50 words`}
      />
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Flag</FormLabel>
        <RadioGroup
          row
          aria-label="flag"
          name="flag"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
        >
          <FormControlLabel value="question" control={<Radio />} label="Question" />
          <FormControlLabel value="discussion" control={<Radio />}
                            label="Discussion" />
          <FormControlLabel value="brag" control={<Radio />} label="Brag" />
          <FormControlLabel value="reminder" control={<Radio />} label="Reminder" />
        </RadioGroup>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {pageFunction === "update" ? "Update post" : "Submit post"}
      </Button>
    </Box>
  );
}
