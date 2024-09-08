"use client";
import { RootState } from "@/app/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/signin");
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return <div className="">profile</div>;
}
