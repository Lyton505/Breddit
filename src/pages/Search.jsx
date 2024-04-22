import * as React from "react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import PostCard from "../components/PostCard.jsx";

export default function Search() {
  const [postData] = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
    console.log("About to navigate");
  };

  const filteredPosts = postData.filter((post) => {
      return post.heading?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  );

  console.log("Search term: ", searchTerm);
  console.log("Curr filtered posts ", filteredPosts);


  return (
    <div>
      <Box sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        "& > :not(style)": { m: 1 }
      }}>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            Search for a post by title
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={<InputAdornment
              position="start"><SearchIcon /></InputAdornment>}
            onChange={handleSearchChange}
          />
        </FormControl>
        {filteredPosts.map((post) => (
          <span onClick={() => handlePostClick(post.post_id)}><PostCard
            key={post.post_id}
            upvotes={post.upvotes}
            title={post.heading}
            author={post.poster}
            imgUrl={post.imageUrl}
            commentCount={post.comments}
            creation_time={post.created_at}>
          </PostCard></span>
        ))}
      </Box>
    </div>
  );
}