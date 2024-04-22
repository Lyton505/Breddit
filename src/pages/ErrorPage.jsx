import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', textAlign: 'center' }}
    >
      <Typography variant="h1" component="h2" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        An error occurred
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        We're sorry for the inconvenience. Our team has been notified and will fix the issue as soon as possible.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go Back Home
      </Button>
    </Box>
  );
}