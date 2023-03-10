import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
// import { Fragment } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import useAuthCalls from "../hooks/useAuthCalls";
import { useEffect } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import LoginForm from "../components/LoginForm";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter an email"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must be min 8 chars")
    .max(16, "Password must be max 16 chars")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Passwords must have a lowercase")
    .matches(/[A-Z]+/, "Passwords must have a uppercase")
    .matches(/[!,?{}><%&$#£+-.]+/, "Passwords must have e special characters"),
  // age: yup.number().required().positive().integer(),
  // email: yup.string().email(),
  // website: yup.string().ur1(),
});

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state?.auth);
  const { login } = useAuthCalls();

  useEffect(() => {
    if (currentUser) {
      navigate("/stock");
      toastSuccessNotify("Login Performed");
    }
  }, [currentUser]);

  useEffect(() => {
    error && toastErrorNotify("Login can not be performed");
  }, [error]);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              //! Login(values)
              login(values);
              navigate("/stock");
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <LoginForm {...props} />}
          ></Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
