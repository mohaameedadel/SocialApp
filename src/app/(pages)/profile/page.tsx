"use client";
import { RootState } from "@/app/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import SignIN from "../signin/page";

export default function Profile() {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  if (!token) {
    return <SignIN />;
  } else {
    return <div className="">profile</div>;
  }
}
