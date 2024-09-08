"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getPosts } from "./redux/slices/postsSlice";
import { Container } from "@mui/material";
import AllPosts from "./_components/AllPosts/AllPosts";
import SkelltonLoading from "./_components/SkelltonLoading/SkelltonLoading";

export default function Home() {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const { loading, posts } = useSelector((state: RootState) => state.posts);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/signin");
    }else{
      dispatch(getPosts());
    }
  }, [token, router,dispatch]);

  if (!token) {
    return null;
  }

  return (
    <>
      <Container maxWidth="sm">
        {loading ? <SkelltonLoading /> : posts && <AllPosts />}
      </Container>
    </>
  );
}
