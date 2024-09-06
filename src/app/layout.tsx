"use client"
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Provider store={store}>

        <Navbar />
        <div className="pt-20">{children}</div>
        <Toaster />
        </Provider>
      </body>
    </html>
  );
}
