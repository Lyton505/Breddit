import React from 'react';
import { supabase } from '../utils/client.js';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function LoginPage({signInWithGithub}) {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h" gutterBottom>
        Sign in with GitHub
      </Typography>
      <Button
        variant="contained"
        startIcon={<GitHubIcon />}
        onClick={signInWithGithub}
        sx={{ mt: 2 }}
      >
        Login with GitHub
      </Button>
    </Box>
  );
}
