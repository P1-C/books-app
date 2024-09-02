import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import BackIcon from '../assets/images/Back.svg';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle back navigation
  const handleClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Extract the title from the URL
  const pathParts = location.pathname.split('/');
  const title = pathParts[pathParts.length - 1];
  
  // Convert title to Pascal case if needed
  const formatTitle = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const formattedTitle = formatTitle(title);

  return (
    <Stack direction="row" spacing={2} alignItems="center" paddingY={2}>
      <Button
        onClick={handleClick}
        sx={{
          textTransform: 'none',
          backgroundColor: 'transparent', // Make the background transparent
          boxShadow: 'none', // Remove any box shadow
          border: 'none', // Remove border
          padding: 0, // Remove default padding
          '&:hover': {
            backgroundColor: 'transparent', // Ensure transparency on hover
            boxShadow: 'none', // Ensure no shadow on hover
          },
        }}
        startIcon={<img src={BackIcon} alt="back" width={30} style={{ marginRight: '5px'}} />}
      >
        <Typography variant="h4" fontWeight={700} color="primary">
          {formattedTitle}
        </Typography>
      </Button>
    </Stack>
  );
};

export default BackButton;
