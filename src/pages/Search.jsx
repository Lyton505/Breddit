import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button"; // Import the Button component
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  const handleSearch = (event) => {
    // Implement your search logic here
    event.preventDefault();
    console.log("Search submitted!");
  };

  return (
    <div>
      <Box sx={{
        width: "100%", display: "flex", flexDirection: "column", // Change to column layout
        alignItems: "center", // Vertically center the items
        // justifyContent: "center", // Horizontally center the items
        height: "100vh", // Set the height to full viewport height
        "& > :not(style)": { m: 1 } // Applies margin to direct children except <style> elements
      }}>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            Search for a post by title
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={<InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>}
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </div>
  );
}
