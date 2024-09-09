"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Image from "next/image";


export default function SinglePostDetails() {
  const { post } = useSelector((state: RootState) => state.posts);

  return (
    <>
      {post && (
        <Card key={post._id} className="mb-4">
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
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          <Collapse in={true} timeout="auto" unmountOnExit>
            <Typography className="px-2" sx={{ marginBottom: 2 }}>
              Comments:
            </Typography>
            {post.comments.map((comment) => (
              <CardContent className="border-b" key={comment._id}>
                <CardHeader
                  avatar={
                    <Avatar className="bg-mainColor" aria-label="recipe">
                      {comment.commentCreator.name.slice(0, 1).toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={comment.commentCreator.name}
                  subheader={comment.createdAt.slice(0, 10)}
                />
                <Typography className="px-9 py-3" sx={{ marginBottom: 2 }}>
                  {comment.content}
                </Typography>
              </CardContent>
            ))}
          </Collapse>
        </Card>
      )}
    </>
  );
}
