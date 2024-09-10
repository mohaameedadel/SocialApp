"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { clearData, getToken } from "@/app/redux/slices/loginSlice";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();

  const { push } = useRouter();
  const pathName = usePathname();
  React.useEffect(() => {
    dispatch(getToken());
  }, [dispatch, token]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar className="relative">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href={"/"}>Social App</Link>
          </Typography>
          <IconButton
            onClick={() => setShow(!show)}
            className="sm:hidden"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={`${
              show ? "flex flex-col" : "hidden"
            }  p-4 fixed top-[65px] right-5 bg-mainColor sm:bg-transparent sm:right-0 sm:top-0 sm:relative sm:block`}
          >
            {token ? (
              <>
                <Button
                  className={`${pathName == "/" && "bg-slate-700"}`}
                  onClick={() => setShow(false)}
                  color="inherit"
                >
                  <Link href={"/"}>Home</Link>
                </Button>
                <Button
                  className={`${pathName == "/profile" && "bg-slate-700"}`}
                  onClick={() => setShow(false)}
                  color="inherit"
                >
                  <Link href={"/profile"}>Profile</Link>
                </Button>
                <Button
                  onClick={() => {
                    setShow(false);
                    dispatch(clearData());
                    push("/signin");
                  }}
                  color="inherit"
                >
                  LogOut
                </Button>
              </>
            ) : (
              <>
                <Button
                  className={`${pathName == "/signin" && "bg-slate-700"}`}
                  onClick={() => setShow(false)}
                  color="inherit"
                >
                  <Link href={"/signin"}>SignIN</Link>
                </Button>
                <Button
                  className={`${pathName == "/signup" && "bg-slate-700"}`}
                  onClick={() => setShow(false)}
                  color="inherit"
                >
                  <Link href={"/signup"}>SignUp</Link>
                </Button>
              </>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
