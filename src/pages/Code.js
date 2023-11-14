import { Box, Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { githubDark } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSnippet, putObject } from "../requests_app/requests";
import { ToastContainer, toast } from "react-toastify";

const Code = () => {
  const [edit, setedit] = useState(false);

  const [code, setCode] = useState("");

  const [snippetName, setSnippetName] = useState("");

  const [snippetDesc, setSnippetDesc] = useState("");

  const isSmallScreen = window.innerWidth <= 600;

  const { id } = useParams();

  const navigate = useNavigate();

  const getSnippetWithId = async () => {
    let { data } = await getSnippet(id);
    setCode(data.code);
    setSnippetDesc(data.snippetDesc);
    setSnippetName(data.snippetName);
  };

  const saveChanges = async (id) => {
    if (snippetDesc == "" || snippetName == "" || code == "") {
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
      if (edit) {
        let snippetObj = {
          id,
          snippetName,
          snippetDesc,
          code,
        };
        const res = await putObject(id, snippetObj);
        toast.success("Changes saved succesfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  useEffect(() => {
    getSnippetWithId();
  }, []);

  return (
    <Container sx={{ pt: 10 }}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button variant="outlined" onClick={() => setedit(true)}>
          Edit
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={() => saveChanges(id)}
        >
          Save Changes
        </Button>
      </Box>
      <br />
      <TextField
        sx={{ mt: 2 }}
        InputProps={{
          readOnly: edit ? false : true,
        }}
        value={snippetName}
        onChange={(e) => setSnippetName(e.target.value)}
      />
      <TextField
        InputProps={{
          readOnly: edit ? false : true,
        }}
        sx={{ my: 2 }}
        fullWidth
        multiline
        rows={3}
        value={snippetDesc}
        onChange={(e) => setSnippetDesc(e.target.value)}
      />
      <CodeMirror
        readOnly={edit ? false : true}
        value={code}
        onChange={(value) => setCode(value)}
        style={{ width: isSmallScreen ? "100%" : "100%" }}
        theme={githubDark}
        height="400px"
        extensions={[javascript({ jsx: true })]}
      />
      <Button sx={{ mt: 4 }} color="info" onClick={()=>navigate("/")}>
        Back home
      </Button>
      <ToastContainer style={{ zIndex: 1001 }} />
    </Container>
  );
};

export default Code;
