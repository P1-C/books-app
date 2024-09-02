import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  TextField,
  Typography,
  Container,
  Card,
  CircularProgress,
  Stack,
  Grid2,
  Box,
  InputAdornment,
} from "@mui/material";
import BackButton from "./BackButton";
import theme from "../theme";
import SearchIcon from "../assets/images/Search.svg";

const BookListPage = () => {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Function to fetch books
  const fetchBooks = useCallback(async (url) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setBooks((prevBooks) => [
        ...prevBooks,
        ...response.data.results.filter((book) =>
          Object.keys(book.formats).some((key) =>
            key.startsWith("image/")
          )
        ),
      ]);
      setNextUrl(response.data.next);
    } catch (error) {
      alert("No more records found")
      setNextUrl(null);
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Generate the URL for fetching books
  const generateUrl = () => {
    return `http://skunkworks.ignitesol.com:8000/books?topic=${encodeURIComponent(
      genre
    )}&mime_type=image%2F&search=${encodeURIComponent(debouncedSearchText)}`;
  };

  useEffect(() => {
    // Debounce the search input
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500); // Debounce delay of 500ms

    setSearchTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    // Fetch books whenever genre or debounced search text changes
    fetchBooks(generateUrl());
  }, [genre, debouncedSearchText, fetchBooks]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.scrollHeight
    ) {
      if (nextUrl && !isLoading) {
        fetchBooks(nextUrl);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, nextUrl, isLoading]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setBooks([]); // Clear existing books to refresh the list
  };

  const openBook = (book) => {
    const formats = ["text/html", "application/pdf", "text/plain"];
    const format = formats.find((f) => book.formats[f] && !book.formats[f].includes("zip"));
    if (format) {
      window.open(book.formats[format], "_blank");
    } else {
      alert("No viewable version available");
    }
  };

  return (
    <>
    <Box sx={{ backgroundColor: theme.palette.background.paper, paddingBottom: 2 }}>
      <Container>
        <BackButton />
        <TextField
          startAdornment={
            <InputAdornment position="start">
              <img src={SearchIcon} alt="search-books" width={30} style={{ marginRight: 8 }} />
            </InputAdornment>
          }
          label="Search"
          value={searchText}
          onChange={handleSearch}
          variant="outlined"
          fullWidth
          margin="none"
          className="search-box"
        />
      </Container>
    </Box>
      <Box sx={{ backgroundColor: theme.palette.background }} >
        <Container>
          <Grid2 container columnSpacing={{ xs: 4, sm: 6, lg: 8, md: 10}}  rowSpacing={2} marginY={3} marginX={'auto'}>
            {books.map((book) => (
              <Grid2 size={{ xs: 4, sm: 3, md: 2 }} key={book.id}>
                <Box onClick={() => openBook(book)}>
                  <img
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                    style={{
                      boxShadow: "0 2px 5px 0 rgba(211, 209, 238, 0.5)",
                      width: "114px",
                      height: "162px",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, maxWidth: "114px" }}
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textDisabled"
                    sx={{
                      maxWidth: "114px",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {book.authors.map((a) => a.name).join(", ")}
                  </Typography>
                </Box>
              </Grid2>
            ))}
          </Grid2>
          {isLoading && (
            <Stack alignItems="center" mt={3}>
              <CircularProgress />
            </Stack>
          )}
        </Container>
      </Box>
    </>
  );
};

export default BookListPage;
