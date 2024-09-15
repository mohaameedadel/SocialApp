"use client";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPass } from "@/app/redux/slices/userInfoSlice";
import SyncLockIcon from "@mui/icons-material/SyncLock";
export default function ForgetPass() {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const { loading } = useSelector((state: RootState) => state.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Ex:(Ahmed@123)"
      )
      .required("Please enter your password"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Ex:(Ahmed@123)"
      )
      .required("Please enter your newPassword"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(changeUserPass(values));
    },
  });

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
          <Container className="mt-8" maxWidth={"sm"}>
            <Paper className="p-8" elevation={2}>
              <h2 className="text-3xl font-semibold mb-4">Change Password</h2>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  className="w-full relative mb-4"
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <Alert className="mb-4" variant="filled" severity="error">
                    {formik.errors.password}
                  </Alert>
                )}
                <TextField
                  className="w-full relative mb-4"
                  id="newPassword"
                  label="newPassword"
                  type="password"
                  autoComplete="current-newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <Alert className="mb-4" variant="filled" severity="error">
                    {formik.errors.newPassword}
                  </Alert>
                )}
                {loading ? (
                  <Button type="button" variant="contained">
                    <CircularProgress color="inherit" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SyncLockIcon />}
                  >
                    Change Password
                  </Button>
                )}
              </form>
            </Paper>
          </Container>
        </>
      )}
    </>
  );
}
