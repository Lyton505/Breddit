import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useParams } from "react-router-dom";
import "/src/styles/view.css"
import bitCoinImg from "/postDefaultImage.jpg";

// Mock data (replace with actual data)
const postData = {
  title: 'Post Title',
  imageUrl: '', // URL of the image
  body: 'This is the body of the post with a maximum of 50 words showing all the relevant information about the post.',
  creationDate: 'April 12, 2024',
  upvotes: 123,
  comments: [
    {
      id: 1,
      author: 'Jane Doe',
      text: 'This is a comment on the post.',
      avatarUrl: '/path-to-avatar1.jpg', // URL of the commenter's avatar
    },
    {
      id: 1,
      author: 'Jane Doe',
      text: 'This is a comment on the post.',
      avatarUrl: '/path-to-avatar1.jpg', // URL of the commenter's avatar
    },
    {
      id: 1,
      author: 'Jane Doe',
      text: 'This is a comment on the post.',
      avatarUrl: '/path-to-avatar1.jpg', // URL of the commenter's avatar
    },
    {
      id: 1,
      author: 'Jane Doe',
      text: 'This is a comment on the post.',
      avatarUrl: '/path-to-avatar1.jpg', // URL of the commenter's avatar
    },
    {
      id: 1,
      author: 'Jane Doe',
      text: 'This is a comment on the post.',
      avatarUrl: '/path-to-avatar1.jpg', // URL of the commenter's avatar
    },
    {
      id: 1,
      author: 'Jane Doe',
      text: 'This is a comment on the post.',
      avatarUrl: '/path-to-avatar1.jpg', // URL of the commenter's avatar
    },
    {
      id: 1,
      author: 'Jane Doe',
      text: 'This is a comment on the post.',
      avatarUrl: '/path-to-avatar1.jpg', // URL of the commenter's avatar
    },
    {
      id: 1,
      author: 'Jane Doe',
      text: 'This is a comment on the post.',
      avatarUrl: '/path-to-avatar1.jpg', // URL of the commenter's avatar
    },
    {
      id: 1,
      author: 'Jane Doe',
      text: 'This is a comment on the post.',
      avatarUrl: '/path-to-avatar1.jpg', // URL of the commenter's avatar
    },
  ],
};

if (postData.imageUrl === ''){
  postData.imageUrl = bitCoinImg;
}

export default function ViewPost() {

  const {postId} = useParams();

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4, padding:2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {postData.title}
      </Typography>
      <Card>
        <CardMedia
          component="img"
          height="194"
          image={postData.imageUrl}
          alt="Post image"
        />
        <CardContent>
          <Typography variant="body1">{postData.body}</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {`Created on: ${postData.creationDate}`}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThumbUpAltIcon color="action" className={"thumb"}
            sx={{
              '&:hover': {
                // backgroundColor: '#3498db', // Change to your preferred hover color
                color: '#4578b9', // Optional: change the color of the icon as well
                cursor:"pointer",
              }
            }}
            />
            <Typography variant="subtitle2" sx={{ ml: 1 }}>
              {postData.upvotes} Upvotes
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Divider sx={{ my: 2 }} />
      <List>
        {postData.comments.map((comment) => (
          <ListItem alignItems="flex-start" key={comment.id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={comment.avatarUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={comment.author}
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.text}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
