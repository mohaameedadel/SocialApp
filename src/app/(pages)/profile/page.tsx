"use client";
import { AppDispatch, RootState } from "@/app/redux/store";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AddPost from "@/app/_components/AddPost/AddPost";
import { Container, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MenuContext } from "@/app/_context/MenuContext/MenuContext";
import UserPosts from "@/app/_components/UserPosts/UserPosts";
import SkelltonLoading from "@/app/_components/SkelltonLoading/SkelltonLoading";
import { getUserPosts } from "@/app/redux/slices/userPosts";

export default function Profile() {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const { loading, posts, addPost, removePost } = useSelector(
    (state: RootState) => state.userPosts
  );
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    throw new Error("useContext must be used within a MenuContextProvider");
  }

  const { setShowMenu, showMenu } = menuContext;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/signin");
    } else {
      dispatch(getUserPosts());
    }
  }, [token, router, dispatch, addPost, removePost]);

  if (!token) {
    return null;
  }

  return (
    <>
      <Fab
        onClick={() => setShowMenu(true)}
        className="fixed bottom-12 right-12"
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <div className={`${showMenu ? "" : "hidden"}`}>
        <div className="h-screen flex justify-start items-center fixed top-0 left-0 w-full bg-slate-500/60 z-[999]">
          <AddPost />
        </div>
      </div>

      <Container maxWidth="sm">
        {loading ? <SkelltonLoading /> : posts && <UserPosts />}
      </Container>
    </>
  );
}
