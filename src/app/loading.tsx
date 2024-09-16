"use client";
import React from "react";
import { Triangle } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-full fixed top-0 left-0 h-screen flex justify-center items-center flex-col z-50">
      <h2 className="uppercase text-3xl">Tri<span className="text-5xl">V</span>ibe</h2>
      <Triangle
        visible={true}
        height="100"
        width="100"
        color="#151515"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
