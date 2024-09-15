"use client";
import React, { FormEvent, useContext } from "react";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import {
  CircularProgress,
  Container,
  Fab,
  Paper,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { AddUserPost } from "@/app/redux/slices/userPosts";
import { MenuContext } from "../../_context/MenuContext/MenuContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddPost() {
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    throw new Error("useContext must be used within a MenuContextProvider");
  }

  const { setShowMenu } = menuContext;

  const { loading } = useSelector((state: RootState) => state.userPosts);
  const dispatch = useDispatch<AppDispatch>();

  function handelSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const body = form.body.value;
    const image = form.image.files[0];

    const formData = new FormData();
    if (body) {
      formData.append("body", body);
    }
    if (image) {
      formData.append("image", image);
    }
    if (formData.has("body") || formData.has("image")) {
      dispatch(AddUserPost(formData));
      setShowMenu(false);
    }

    form.body.value = "";
  }
  return (
    <Container maxWidth="sm">
      <Paper className="p-4 text-center">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-start">Add Post</h2>
            <div onClick={() => setShowMenu(false)}>
              <CloseIcon className="hover:text-red-500 duration-200 cursor-pointer" />
            </div>
          </div>
          <form onSubmit={handelSubmit}>
            <TextField
              className="w-full"
              id="body"
              label="Post Content"
              multiline
              rows={4}
            />
            <Button
              className="my-4"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput type="file" id="image" multiple />
            </Button>
            {loading ? (
              <CircularProgress className="block mx-auto" />
            ) : (
              <Fab
                className="block mx-auto "
                type="submit"
                variant="extended"
                size="medium"
                color="primary"
              >
                <NavigationIcon sx={{ mr: 1 }} />
                Add Post
              </Fab>
            )}
          </form>
        </div>
      </Paper>
    </Container>
  );
}
