"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { signUp } from "@/app/redux/slices/signupSlice";
import { useRouter } from "next/navigation";


export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.signupSlice);

  const { push } = useRouter();
  const currencies = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z ]{3,}$/)
      .required("Please enter you name"),
    email: Yup.string()
      .email("Enter Valid E-mail")
      .required("Please enter your email"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Ex:(Ahmed@123)"
      )
      .required("Please enter your password"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Please rePassword")
      .required("Please rePassword"),
    dateOfBirth: Yup.string().required("Please enter your dateOfBirth"),
    gender: Yup.string().required("Please enter your gender"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      const result = await dispatch(signUp(data));
      if (result.payload == "success") {
        push("/signin");
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
            <h2 className="text-3xl font-semibold mb-4">SignUp</h2>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                className="w-full mb-4"
                id="name"
                label="Your Name"
                type="text"
                autoComplete="current-name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <Alert className="mb-4" variant="filled" severity="error">
                  {formik.errors.name}
                </Alert>
              )}

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
                className="w-full  mb-4"
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
                className="w-full  mb-4"
                id="rePassword"
                label="rePassword"
                type="password"
                autoComplete="current-rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <Alert className="mb-4" variant="filled" severity="error">
                  {formik.errors.rePassword}
                </Alert>
              )}

              <TextField
                id="gender"
                name="gender"
                select
                label="Select Your Gender"
                className="w-full mb-4"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {formik.errors.gender && formik.touched.gender && (
                <Alert className="mb-4" variant="filled" severity="error">
                  {formik.errors.gender}
                </Alert>
              )}

              <div className="flex justify-between border p-3 rounded-md border-gray-300 mb-4">
                <label
                  className="flex-grow cursor-pointer text-gray-600"
                  htmlFor="dateOfBirth"
                >
                  dateOfBirth
                </label>
                <input
                  className="cursor-pointer"
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
                <Alert className="mb-4" variant="filled" severity="error">
                  {formik.errors.dateOfBirth}
                </Alert>
              )}
              <div className="flex justify-between items-center">
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
                    SignUp
                  </Button>
                )}
              </div>
            </form>
          </Paper>
          
        </Container>
      )}
    </>
  );
}
