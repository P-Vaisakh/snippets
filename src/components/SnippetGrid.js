import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllSnippets } from "../redux/allSnippets";
import { dltSnippet } from "../requests_app/requests";
import { Link, useNavigate } from "react-router-dom";

const SnippetGrid = () => {
  const { data } = useSelector((state) => state.allSnippets);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDlt = async (id) => {
    let response = await dltSnippet(id);
    dispatch(fetchAllSnippets());
  };

  const handleEdit = (id) => {
    navigate(`/editCode/${id}`);
  };

  useEffect(() => {
    dispatch(fetchAllSnippets());
  }, []);

  return (
    <Grid container mt={2} spacing={2} justifyContent={"center"}>
      {data.length > 0 ? (
        data.map((item, ind) => (
          <Grid item xs={10} md={4} sm={5} lg={3} key={ind}>
            <Link
              to={`/editCode/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ minHeight: "176px" }}>
                <CardContent sx={{ textAlign: "start", py: 1, px: 2 }}>
                  <Typography variant="h6" color="inherit" fontWeight={600}>
                    {item.snippetName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="GrayText"
                    mt={1}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      lineHeight: "1.5rem",
                    }}
                  >
                    {item.snippetDesc}
                  </Typography>
                </CardContent>
                <CardActions sx={{ m: 0 }}>
                  <IconButton onClick={() => handleEdit(item.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDlt(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Link>
          </Grid>
        ))
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default SnippetGrid;
