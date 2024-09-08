"use client";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import SignIN from "./(pages)/signin/page";

export default function Home() {
  const { token } = useSelector((state: RootState) => state.loginSlice);

  if (!token) {
    return <SignIN />;
  } else {
    return <div className="">hhhhhhh</div>;
  }
}
