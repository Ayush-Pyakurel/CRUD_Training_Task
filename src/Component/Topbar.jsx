import React from "react";
import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Topbar = () => {
  const mobileView = useMediaQuery("(max-width: 375px) ");
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{
        flexDirection: mobileView ? "column" : "row",
        gap: "7px",
      }}
    >
      <Box display="flex" borderRadius="3px" border="1px solid grey">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box>
        <Button variant="outlined">Add a new product</Button>
      </Box>
    </Box>
  );
};

export default Topbar;
