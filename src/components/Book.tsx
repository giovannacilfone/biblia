import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import getOneBook, { Verse } from "../queries/getOneBook";
import { Chapter } from "../queries/getOneBook";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { useNavigate, useParams } from "react-router-dom";
const Book = () => {
  const { bookName, version } = useParams<{ bookName: string; version: string }>();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const [book, setBook] = useState<Chapter>();
  const [loading, setLoading] = useState(false);

  const handleBackClick = () => {
    navigate("/");
  };

  const getData = async () => {
    setLoading(true);
    try {
      if (bookName && version) {
        const bookData = await getOneBook(bookName, page, version);
        setBook(bookData);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [bookName, page, version]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <IconButton type="button" sx={{ ml: 3, mt: 3 }} onClick={handleBackClick}>
        <ArrowCircleLeftIcon sx={{ fontSize: "2.5rem", color: "#e06377" }} />
      </IconButton>

      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        {loading ? (
          <>
            <CircularProgress sx={{ mt: "15%", color: "#e06377" }} color="secondary" />
            <Typography sx={{ mt: 2, color: "#e06377" }}>Cargando...</Typography>
          </>
        ) : (
          <>
            <Paper
              elevation={4}
              sx={{
                mr: 4,
                ml: 4,
                mb: 2,
                padding: 2,
                height: "37rem",
                maxWidth: "70%",
                overflow: "auto",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                "&::-webkit-scrollbar": {
                  width: "0.8em",
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#f4a688",
                },
              }}
            >
              <Typography variant="h5" sx={{ color: "#e06377" }}>
                {bookName} - {version === "kjv" ? "Chapter" : "Capítulo"} {page}
              </Typography>
              <Divider sx={{ mt: 1, mb: 1 }} />
              {book?.vers?.map((verse: Verse) => (
                <Box display="flex">
                  <Typography fontSize={16} sx={{ color: "#e06377" }} fontWeight={600} mr={1}>
                    {verse.number}.
                  </Typography>
                  <Typography fontSize={16} fontWeight={500} mb={0.3} sx={{ color: "#e06377" }}>
                    <strong>{verse.verse}</strong>
                  </Typography>
                </Box>
              ))}
            </Paper>
            <Pagination
              variant="outlined"
              sx={{
                mt: 2,
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#e06377",

                  color: "#fff",
                },
                "& .MuiPaginationItem-page:hover": {
                  backgroundColor: "#e06377",
                  color: "#fff",
                },
              }}
              count={book?.num_chapters}
              page={page}
              onChange={handleChange}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Book;
