import { Box, Button, Typography } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import { Link } from "react-router-dom";
import MySvgComponent from "../MySvgComponent";

const Layout = () => {
  return (
    <Box>
      <Box>
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h1"
              sx={{
                color: "#F1426A",
                textAlign: "center",
                width: "35rem",
                mb: 3,
                fontFamily: "Euphoria Script",
              }}
            >
              <strong>
                La Biblia <br />
                <em style={{ marginLeft: "0.5rem", color: "#3f3d56" }}>en línea.</em>
              </strong>
            </Typography>
            <Link to="/home" style={{ color: "inherit", textDecoration: "inherit" }}>
              <Button
                variant="contained"
                startIcon={<AutoStoriesIcon />}
                sx={{
                  width: "12rem",
                  backgroundColor: "#F1426A",
                  color: "#FFFF",
                  textTransform: "none",
                  p: 1.5,
                  fontWeight: 600,
                  borderRadius: 10,
                }}
              >
                Comenzar a leer
              </Button>
            </Link>
          </Box>
          <Box mt={4}>
            <MySvgComponent />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
