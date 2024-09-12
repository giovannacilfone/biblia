import {
  backdropClasses,
  Box,
  Button,
  Divider,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";

import { Version } from "../queries/getVersions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import motion from "framer-motion";

import CircularProgress from "@mui/material/CircularProgress";
import getVersions from "../queries/getVersions";
import useSearch from "../hooks/useSearch";
import { VerseFound } from "../queries/searchText";
import Search from "./Search";
import SelectVersion from "./SelectVersion";
import MySvgComponent from "./MySvgComponent";
import { Link } from "react-router-dom";
import Cards from "./Cards";

const Home = () => {
  const [versions, setVersions] = useState<Version[]>([]);
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));

  const {
    loadingSearch,
    textFound,
    search,
    page,
    handleChange,
    version,
    onChangeVersion,
    onChangeSearch,
  } = useSearch();

  const fetchVersions = async () => {
    try {
      const versionsBible: Version[] = await getVersions();
      setVersions(versionsBible);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <Box mt={3}>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Box display="flex" gap={2}>
          <SelectVersion versions={versions} version={version} onChangeVersion={onChangeVersion} />
          <Search search={search} onChangeSearch={onChangeSearch} />
        </Box>

        {loadingSearch && (
          <>
            <CircularProgress sx={{ mt: "15%", color: "#e06377" }} color="secondary" />
            <Typography sx={{ mt: 2, color: "#e06377" }}>Cargando...</Typography>
          </>
        )}
        {!loadingSearch && search.length > 0 && textFound?.data?.length === 0 && (
          <Typography sx={{ mt: "15%", color: "#e06377" }}>
            <strong>No se encontraron resultados.</strong>
          </Typography>
        )}
      </Box>
      {!loadingSearch &&
        (textFound?.data?.length > 0 ? (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Paper
              elevation={6}
              sx={{
                width: "40rem",
                p: 1.5,
                mt: 2,
                height: "28rem",
                overflow: "auto",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
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
              <Typography
                sx={{
                  color: "#e06377",
                  textAlign: "left",
                }}
                fontWeight={600}
                variant="h6"
              >
                Resultados de la búsqueda
              </Typography>
              <Divider sx={{ mt: 1, mb: 1 }} />

              {textFound?.data?.map((text: VerseFound) => (
                <Box mt={1}>
                  <Typography sx={{ color: "#e06377" }} fontSize={16}>
                    <strong>
                      {text?.book} - {text.chapter}:{text.number}
                    </strong>
                  </Typography>
                  <Typography fontSize={16}>{text?.verse}</Typography>
                  <Divider sx={{ mt: 1, mb: 1 }} />
                </Box>
              ))}
            </Paper>
            <Pagination
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#e06377",

                  color: "#fff",
                },
                "& .MuiPaginationItem-page:hover": {
                  backgroundColor: "#e06377",
                  color: "#fff",
                },
              }}
              count={textFound.meta.pageCount}
              page={page}
              onChange={handleChange}
            />
          </Box>
        ) : (
          search.length === 0 && (
            <Box display="flex" justifyContent="center">
              <Cards version={version} />
            </Box>
          )
        ))}
    </Box>
  );
};

export default Home;
