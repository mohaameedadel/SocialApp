"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPosts } from "./redux/slices/postsSlice";
import { Container } from "@mui/material";
import AllPosts from "./_components/AllPosts/AllPosts";
import SkelltonLoading from "./_components/SkelltonLoading/SkelltonLoading";

export default function Home() {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const { loading, posts } = useSelector((state: RootState) => state.posts);
  const { commentAdd} = useSelector((state: RootState) => state.comments);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/signin");
    } else {
      dispatch(getPosts());
      setIsClient(true);
    }
  }, [token, router, dispatch,commentAdd]);

  if (!token) {
    return null;
  }

  return (
    <>
      {isClient && (
        <Container maxWidth="sm">
          {loading ? <SkelltonLoading /> : posts && <AllPosts />}
        </Container>
      )}
    </>
  );
}
