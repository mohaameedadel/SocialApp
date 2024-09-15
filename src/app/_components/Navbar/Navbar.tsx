"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { clearData, getToken } from "@/app/redux/slices/loginSlice";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { getUserData } from "@/app/redux/slices/userInfoSlice";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
export default function Navbar() {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const { photo, addImage, loading, name } = useSelector(
    (state: RootState) => state.userInfo
  );

  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { push } = useRouter();
  const pathName = usePathname();
  React.useEffect(() => {
    dispatch(getToken());
  }, [dispatch, token]);

  React.useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, [token, dispatch, addImage]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="z-[9999999999999999999999999]" position="fixed">
        <Toolbar className="relative">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link onClick={() => setShow(false)} href={"/"}>
              Social App
            </Link>
          </Typography>

          <div className={`p-4`}>
            {token ? (
              <>
                {loading ? (
                  <CircularProgress color="inherit" />
                ) : photo ? (
                  <div className="relative">
                    <Chip
                      onClick={() => setShow(!show)}
                      component={Button}
                      className="text-white cursor-pointer"
                      avatar={<Avatar alt="Natacha" src={photo} />}
                      label={name}
                      variant="outlined"
                    />
                    {show && (
                      <List className=" absolute overflow-hidden top-[39px] -left-10 shadow bg-mainColor text-white z-[9999999999]">
                        <Link href="/">
                          <ListItem
                            className={`${pathName == "/" && "bg-slate-700"} `}
                            disablePadding
                            component="button"
                            onClick={() => setShow(false)}
                          >
                            <ListItemButton className="px-9">
                              <ListItemIcon>
                                <HomeIcon className="text-white" />
                              </ListItemIcon>
                              <ListItemText primary="Home" />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                        <Link href="/profile">
                          <ListItem
                            className={`${
                              pathName == "/profile" && "bg-slate-700"
                            } `}
                            disablePadding
                            component="button"
                            onClick={() => setShow(false)}
                          >
                            <ListItemButton className="px-9">
                              <ListItemIcon>
                                <AccountBoxIcon className="text-white" />
                              </ListItemIcon>
                              <ListItemText primary="Profile" />
                            </ListItemButton>
                          </ListItem>
                        </Link>

                        <Link href="/forgetpass">
                          <ListItem
                            className={`${
                              pathName == "/forgetpass" && "bg-slate-700"
                            } `}
                            disablePadding
                            component="button"
                            onClick={() => setShow(false)}
                          >
                            <ListItemButton className="px-9">
                              <ListItemIcon>
                                <ManageAccountsIcon className="text-white" />
                              </ListItemIcon>
                              <ListItemText primary="Change Password" />
                            </ListItemButton>
                          </ListItem>
                        </Link>

                        <ListItem
                          onClick={() => {
                            setShow(false);
                            dispatch(clearData());
                            push("/signin");
                          }}
                          disablePadding
                          component="button"
                        >
                          <ListItemButton className="px-9">
                            <ListItemIcon>
                              <LogoutIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="LogOut" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    )}
                  </div>
                ) : (
                  name.slice(0, 1).toUpperCase()
                )}
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
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
