import { Box, Container, Typography, TextField } from "@mui/material";
import React from "react";
import SnippetGrid from "../components/SnippetGrid";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterSnippets } from "../redux/allSnippets";

const Home = () => {
  const { data, loading } = useSelector((state) => state.allSnippets);

  const dispatch = useDispatch();

  return (
    <Box pt={{ lg: 8.2, xs: 7.3 }}>
      {loading == true ? <LinearProgress /> : ""}
      <Container sx={{ pt: 3, textAlign: "center" }}>
        <Typography variant="h4" color="inherit" fontWeight={700}>
          All Snippets
        </Typography>
        <TextField
          variant="standard"
          fullWidth
          sx={{ my: 1, mx: 1 }}
          label="Search a Snippet"
          onChange={(e) => dispatch(filterSnippets(e.target.value))}
        />
        <SnippetGrid />
      </Container>
    </Box>
  );
};

export default Home;
