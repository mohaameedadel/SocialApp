"use client";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { signIn } from "@/app/redux/slices/loginSlice";
import { useRouter } from "next/navigation";

export default function SignIN() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.loginSlice);
  const { push } = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter Valid E-mail")
      .required("Please enter your email"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Ex:(Ahmed@123)"
      )
      .required("Please enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      await dispatch(signIn(data));
      if (localStorage.getItem("token")) {
        push("/");
      }
    },
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      push("/");
      setIsClient(false);
    } else {
      setIsClient(true);
    }
  }, [push]);

  return (
    <>
      {isClient && (
        <Container className="mt-8" maxWidth={"sm"}>
          <Paper className="p-8" elevation={2}>
            <h2 className="text-3xl font-semibold mb-4">SignIn</h2>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                className="w-full mb-4"
                id="email"
                label="E-mail"
                type="email"
                autoComplete="current-email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <Alert className="mb-4" variant="filled" severity="error">
                  {formik.errors.email}
                </Alert>
              )}
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
              {loading ? (
                <Button type="button" variant="contained">
                  <CircularProgress color="inherit" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<LoginIcon />}
                >
                  SignIn
                </Button>
              )}
            </form>
          </Paper>
          
        </Container>
      )}
    </>
  );
}
