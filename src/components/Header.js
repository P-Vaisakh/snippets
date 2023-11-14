import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Divider,
  Box,
} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { githubDark } from "@uiw/codemirror-theme-github";
import uniqid from "uniqid";
import { ToastContainer, toast } from "react-toastify";
import { postSnippet } from "../requests_app/requests";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSnippets } from "../redux/allSnippets";

const Header = () => {
  const [open, setOpen] = useState(false);

  const [code, setCode] = useState("");

  const [snippetName, setSnippetName] = useState("");

  const [snippetDesc, setSnippetDesc] = useState("");

  const dispatch=useDispatch()

  const isSmallScreen = window.innerWidth <= 600;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code === "" || snippetDesc == "" || snippetName == "") {
      toast.error("Feilds cannot be empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const id = uniqid();
      let snippetObj = {
        id,
        snippetName,
        snippetDesc,
        code,
      };
      console.log(snippetObj);
      const response = await postSnippet(snippetObj);
      setOpen(false);
      if (response.status >= 200 && response.status < 300) {
       dispatch(fetchAllSnippets())
      } 
    }
  };

  return (
    <AppBar sx={{ px: { lg: 20,zIndex:1000 } }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h4" color="inherit" fontWeight={700}>
            Snippets
          </Typography>
        </Link>
        <Button variant={"contained"} color="info" onClick={handleOpen}>
          {" "}
          Add a snippet
        </Button>
      </Toolbar>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add a snippet</DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <form>
            <TextField
              size="small"
              required
              fullWidth
              label="Snippet name"
              onChange={(e) => setSnippetName(e.currentTarget.value)}
            />{" "}
            <br />
            <TextField
              size="small"
              required
              fullWidth
              label="Breif description about the snippet"
              onChange={(e) => setSnippetDesc(e.target.value)}
              sx={{ my: 1 }}
            />
            <CodeMirror
              onChange={(value) => setCode(value)}
              style={{ width: isSmallScreen ? "100%" : "500px" }}
              theme={githubDark}
              height="400px"
              extensions={[javascript({ jsx: true })]}
            />
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={(e) => handleSubmit(e)}
                color="success"
                type="submit"
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpen(false)}
                color="primary"
                sx={{ ml: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </form>
          <ToastContainer style={{ zIndex: 1001 }} />
        </DialogContent>
      </Dialog>
    </AppBar>
  );
};

export default Header;
