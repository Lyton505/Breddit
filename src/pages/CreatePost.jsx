import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Input,
  FormHelperText, Typography
} from "@mui/material";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [body, setBody] = useState('');
  const [flag, setFlag] = useState('question');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('body', body);
    formData.append('flag', flag);

    // TODO: submit the form data
    console.log('Form submitted', { title, body, flag });
  };

  const handleBodyChange = (event) => {
    const text = event.target.value;
    // Limit to 50 words
    const words = text.split(/\s+/);
    if (words.length <= 50) {
      setBody(text);
    } else {
      // Truncate the text to the first 50 words
      setBody(words.slice(0, 50).join(' '));
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
          <FormControlLabel value="discussion" control={<Radio />} label="Discussion" />
          <FormControlLabel value="brag" control={<Radio />} label="Brag" />
          <FormControlLabel value="reminder" control={<Radio />} label="Reminder" />
        </RadioGroup>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit Post
      </Button>
    </Box>
  );
}
