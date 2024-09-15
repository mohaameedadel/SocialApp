"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deletePost, updatePost } from "@/app/redux/slices/userPosts";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ExpandMore = styled((props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
}));

export default function UserPosts() {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState("");
  const { posts } = useSelector((state: RootState) => state.userPosts);
  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();
  const handleExpandClick = () => {
    setExpanded(true);
  };

  const [openDialogId, setOpenDialogId] = React.useState<string | null>(null);

  const handleClickOpen = (id: string) => {
    setOpenDialogId(id);
  };

  const handleClose = () => {
    setOpenDialogId(null);
  };

  function handelSubmit(e: React.FormEvent<HTMLFormElement>, id: string) {
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
      dispatch(updatePost({ formData, id }));
    }

    form.body.value = "";
  }
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <Card key={post._id} className="mb-4 ">
            <CardHeader
              avatar={
                <Avatar className="bg-mainColor" aria-label="recipe">
                  <Image
                    src={post.user.photo}
                    alt={post.user.name}
                    width={150}
                    height={150}
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <EditIcon onClick={() => handleClickOpen(post._id)} />
                </IconButton>
              }
              title={post.user.name}
              subheader={post.createdAt.slice(0, 10)}
            />
            {post.image && (
              <CardMedia
                className="cursor-pointer"
                onClick={() => push(`/singlepost/${post._id}`)}
                component="img"
                height="194"
                image={post.image}
                alt={post.body}
              />
            )}

            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {post.body}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                onClick={() => dispatch(deletePost(post._id))}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>

              <Dialog
                open={openDialogId === post._id}
                onClose={handleClose}
                PaperProps={{
                  component: "form",
                  onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
                    handelSubmit(e, post._id);
                  },
                }}
              >
                <DialogTitle>Post Content</DialogTitle>
                <DialogContent className="text-center">
                  <TextField
                    margin="dense"
                    id="body"
                    name="body"
                    label="Body"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <Button
                    className="my-4 "
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload files
                    <VisuallyHiddenInput type="file" id="image" multiple />
                  </Button>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button variant="contained" type="submit">
                    Update Post
                  </Button>
                </DialogActions>
              </Dialog>
              {post.comments.length > 0 && (
                <ExpandMore
                  expand={expandedId == post._id && expanded}
                  onClick={() => {
                    setExpandedId(post._id);
                    handleExpandClick();
                    if (expandedId == post._id && expanded) {
                      setExpanded(false);
                    }
                  }}
                  aria-expanded={expandedId == post._id && expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              )}
            </CardActions>
            {post.comments.length > 0 && (
              <Collapse
                in={expandedId == post._id && expanded}
                timeout="auto"
                unmountOnExit
              >
                <Typography
                  component="div"
                  className="px-2"
                  sx={{ marginBottom: 2 }}
                >
                  Comments:
                </Typography>
                <CardContent>
                  <CardHeader
                    avatar={
                      <Avatar className="bg-mainColor" aria-label="recipe">
                        {post.comments[0]?.commentCreator.name
                          .slice(0, 1)
                          .toUpperCase()}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={post.comments[0]?.commentCreator.name}
                    subheader={post.comments[0]?.createdAt.slice(0, 10)}
                  />
                  <Typography
                    component="div"
                    className="px-9 py-3"
                    sx={{ marginBottom: 2 }}
                  >
                    {post.comments[0]?.content}
                  </Typography>
                </CardContent>
                <div className="text-center pb-3 hover:text-mainColor hover:underline duration-200">
                  <Link href={`/singlepost/${post._id}`}>
                    Show More Comments
                  </Link>
                </div>
              </Collapse>
            )}
          </Card>
        ))}
    </>
  );
}
