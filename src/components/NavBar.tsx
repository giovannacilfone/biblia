import { Box, Typography } from "@mui/material";
import Search from "./Search";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Box
        display="flex"
        height="3rem"
        justifyContent="space-between"
        mb={1}
        sx={{ backgroundColor: "#ffbeca" }}
      >
        <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
          {" "}
          <Box mt={1} ml={1} display="flex" alignItems="center">
            <img
              src="https://i.ibb.co/fNMdtkk/icons8-santa-biblia-50.png"
              height="30px"
              alt="logo-biblia"
            />
            <Typography
              variant="h5"
              sx={{ color: "#FFFF", ml: 1, fontFamily: "fantasy", letterSpacing: "0.05em" }}
            >
              SANTA BIBLIA
            </Typography>
          </Box>
        </Link>

        {/* <Search /> */}
      </Box>
    </nav>
  );
};

export default NavBar;
