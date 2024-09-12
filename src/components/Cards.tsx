import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import getBooks from "../queries/getBooks";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";

interface BookResponse {
  names: string[];
  abrev: string;
  chapters: number;
  testament: string;
}
interface CardsProps {
  version: string;
}

const Cards = ({ version }: CardsProps) => {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: BookResponse[] = await getBooks();
      setBooks(response);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <CircularProgress sx={{ mt: "15%", color: "#e06377" }} color="secondary" />
          <Typography sx={{ mt: 2, color: "#e06377" }}>Cargando...</Typography>
        </>
      ) : (
        <Box gap={2} display="flex" width="90%" flexWrap="wrap">
          {books?.map((book: BookResponse) => (
            <>
              <Link
                to={`/book/${version}/${
                  version !== "kjv" || !book.names[1] ? book.names[0] : book.names[1]
                }`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    width: "12rem",
                    height: "6rem",
                    mt: 4,
                    mb: 2,
                    backgroundColor: "#ffe9f0",

                    mr: 4,

                    "&::-webkit-scrollbar": {
                      width: "0.8em",
                    },
                    "&::-webkit-scrollbar-track": {
                      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#e06377",
                    },
                  }}
                >
                  <Box display="flex" justifyContent="space-evenly">
                    <ImportContactsIcon sx={{ color: "#ffa5c5" }} />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Typography variant="h6" sx={{ color: "#ffa5c5" }}>
                      {version !== "kjv" || !book.names[1] ? book.names[0] : book.names[1]}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
              <Divider sx={{ mt: 1 }} />
            </>
          ))}
        </Box>
      )}
    </>
  );
};

export default Cards;
