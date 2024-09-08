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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Image from "next/image";
import Link from "next/link";

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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const { posts } = useSelector((state: RootState) => state.posts);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
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

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography className="px-2" sx={{ marginBottom: 2 }}>
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
                <Typography className="px-9 py-3" sx={{ marginBottom: 2 }}>
                  {post.comments[0]?.content}
                </Typography>
              </CardContent>
              <Typography className="text-center pb-3 hover:text-mainColor hover:underline duration-200">
                <Link href={"/singlepost"}>Show More</Link>
              </Typography>
            </Collapse>
          </Card>
        ))}
    </>
  );
}
