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
import { deletePost } from "@/app/redux/slices/userPosts";

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
                  <MoreVertIcon />
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
                <Typography component="div" className="px-2" sx={{ marginBottom: 2 }}>
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
                  <Typography component="div" className="px-9 py-3" sx={{ marginBottom: 2 }}>
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
