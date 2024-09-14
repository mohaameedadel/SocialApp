import React, { FormEvent, useContext } from "react";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { CircularProgress, Container, Fab, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MenuContext } from "@/app/_context/MenuContext/MenuContext";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { updateUserImage } from "@/app/redux/slices/userInfoSlice";

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

export default function UpdateImage() {
  const { loading } = useSelector((state: RootState) => state.userInfo);
  const dispatch = useDispatch<AppDispatch>();

  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    throw new Error("useContext must be used within a MenuContextProvider");
  }

  const { setUpdateImage } = menuContext;

  function handelUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const photo = form.photo.files[0];

    const formData = new FormData();
    if (photo) {
      formData.append("photo", photo);
    }

    if (formData.has("photo")) {
      dispatch(updateUserImage(formData));

      setUpdateImage(false);
    }
  }

  return (
    <div className="w-full ">
      <Container maxWidth="sm">
        <Paper className="p-4 text-center">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-start">
                Update Image
              </h2>
              <div onClick={() => setUpdateImage(false)}>
                <CloseIcon className="hover:text-red-500 duration-200 cursor-pointer" />
              </div>
            </div>
            <form onSubmit={handelUpdate}>
              <Button
                className="my-4"
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput type="file" id="photo" multiple />
              </Button>
              {loading ? (
                <CircularProgress className="block mx-auto" />
              ) : (
                <Fab
                  type="submit"
                  className="block mx-auto "
                  variant="extended"
                  color="primary"
                >
                  <UpgradeIcon className="uppercase" sx={{ mr: 1 }} />
                  Update Image
                </Fab>
              )}
            </form>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
