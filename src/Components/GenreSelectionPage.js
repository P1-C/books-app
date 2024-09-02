import React from "react";
import {
  Button,
  Typography,
  Container,
  Paper,
  Box,
  Grid2,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GenreCard from "./GenreCard";
import Adventure from "../assets/images/Adventure.svg";
import Drama from "../assets/images/Drama.svg";
import Fiction from "../assets/images/Fiction.svg";
import History from "../assets/images/History.svg";
import Humour from "../assets/images/Humour.svg";
import Philosophy from "../assets/images/Philosophy.svg";
import Politics from "../assets/images/Politics.svg";
import Pattern from "../assets/images/Pattern.svg";

const genres = [
  { name: "Fiction", startIcon: Fiction },
  { name: "Drama", startIcon: Drama },
  { name: "History", startIcon: History },
  { name: "Politics", startIcon: Politics },
  { name: "Philosophy", startIcon: Philosophy },
  { name: "Humour", startIcon: Humour },
  { name: "Adventure", startIcon: Adventure },
];


const GenreSelectionPage = () => {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    navigate(`/books/${genre}`);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${Pattern})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <Container>
          <Typography variant="h1" paddingTop={8} color={"primary"}>
            Gutenberg Project
          </Typography>
          <Typography variant="h6" fontWeight={600} paddingY={3}>
            A social cataloging website that allows you to freely search its
            database of books, annotations, and reviews.
          </Typography>
        </Container>
      </Box>
      <Container>
        <Grid2 container columnSpacing={12} rowSpacing={2} paddingY={4}>
          {genres.map((genre) => (
            <Grid2 size={{ xs: 12, md: 6 }}>
              <GenreCard
                name={genre.name}
                startIcon={genre.startIcon}
                onCardClick={() => handleGenreClick(genre.name)}
              >
                {genre}
              </GenreCard>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default GenreSelectionPage;
