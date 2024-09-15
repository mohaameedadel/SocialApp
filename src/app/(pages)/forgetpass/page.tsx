"use client";
import { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ForgetPass() {
  const { token } = useSelector((state: RootState) => state.loginSlice);

  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/signin");
    } else {
      setIsClient(true);
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <>
      {isClient && (
        <>
          <div>ForgetPass</div>
        </>
      )}
    </>
  );
}
