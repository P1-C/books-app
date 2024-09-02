import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Next from "../assets/images/Next.svg";

const GenreCard = ({ name, onCardClick, startIcon }) => {
  return (
    <Box
      component={Button}
      marginTop={2}
      minWidth={'100%'}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      onClick={onCardClick}
      variant="elevation"
      elevation={10}
      backgroundColor={"white"}
      padding={2}
      sx={{ cursor: "pointer" }}
    >
      <Stack spacing={2} direction={'row'} alignItems={'center'}>
        <IconButton>
          <img src={startIcon} alt="next" width={30}></img>
        </IconButton>
        <Typography variant={'h5'} fontWeight={700}>{name?.toUpperCase()}</Typography>
      </Stack>
      <IconButton>
        <img src={Next} alt="next"></img>
      </IconButton>
    </Box>
  );
};

export default GenreCard;
