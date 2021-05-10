import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormCheck from 'react-bootstrap/FormCheck';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './Login.module.css'

import TextField from '../../components/TextField'
// import Page from "../../components/Page";
// import { handleUserNextStep } from "../../Utilities/auth";
import { signup } from "../../services/auth";
// import { SIGNUP, RESET_PASSWORD } from "../../constants/routes";
// import Navbar from "../../components/NavBar";
// import { getUserByToken } from "../../services/auth";
import { setCookie } from "../../services/cookies";
// import loginStyle from "../css/Login.css";

// import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import { User } from "../../types/User";
//import Spinner from "../../components/Spinner/Spinner";
import { GlobalContext } from '../../context/GlobalState';

const SignUp = () => {
    const [openSpinner, setOpenSpinner] = useState(false);
    const toatStyles = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    const { handleSignup, isAuthenticated } = useContext(GlobalContext);

    const onSubmit = ( values:User) => {
        handleSignup && handleSignup(values);
    };

    console.log(isAuthenticated)
if (isAuthenticated) {
  return <Redirect to="/" />;
}
    // const Register = async (values: User) => {
    //     console.log("valuessss", values)
    //     const response = await signup(values);
    //     if (response) {
    //       const { data } = response;
    //       setCookie(data);
    //     //   const route = handleUserNextStep(data.user);
    //     //   toast.success("Login Successful.", toatStyles);
    //     //   return history.push(route);
    //     }
    // };
    return (

        <Container fluid>
            <Row>
                <Col xs={{ span: 12, order: 2 }} lg={{ span: 6, order: 1 }} className="px-lg-5">
                    <div className={`${styles.wControlCol1} ${styles.signInHeight} d-flex flex-column justify-content-center text-center mx-auto`}>
                        <h2 className="mb-3 mt-3 font-weight-bold">Sign up to Your Account!</h2>

                        <div className="mt-3">
                            <Formik
                                initialValues={{
                                    name:"",
                                    email: "",
                                    password: "",
                                }}
                                validationSchema={Yup.object().shape({
                                    name: Yup.string()
                                        .required('Name is Required'),
                                    email: Yup.string()
                                        .email("Must be a valid email")
                                        .max(255)
                                        .required("Email is required"),
                                    password: Yup.string().max(255).required("Password is required"),
                                })}
                                onSubmit={onSubmit}
                            >
                                {({
                                    errors,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                    touched,
                                    values,
                                }) => (
                                    <>
                                        <Form className="w-100 mt-3 mb-3" onSubmit={handleSubmit}>
                                            <TextField
                                                error={Boolean(touched.email && errors.email)}
                                                fullWidth
                                                helperText={touched.email && errors.email}
                                                label="Full Name"
                                                margin="normal"
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.name}
                                                variant="outlined"
                                                className="pb-4 mb-1 shadow-none"
                                            />
                                            <TextField
                                                error={Boolean(touched.email && errors.email)}
                                                fullWidth
                                                helperText={touched.email && errors.email}
                                                label="Email Address"
                                                margin="normal"
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="email"
                                                value={values.email}
                                                variant="outlined"
                                                className="pb-4 mb-1 shadow-none"
                                            />
                                            <TextField
                                                error={Boolean(touched.password && errors.password)}
                                                fullWidth
                                                helperText={touched.password && errors.password}
                                                label="Password"
                                                margin="normal"
                                                name="password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="password"
                                                value={values.password}
                                                variant="outlined"
                                                className="pb-4 mb-1 shadow-none"
                                            />
                                            <Button className={`${styles.loginButton} w-100 shadow-none font-weight-bold`} variant="primary" type="submit" style={{ backgroundColor: "#1267EF" }}>Submit</Button>
                                        </Form>
                                        <p>Already have an account? <Link to='/login'><a><span style={{ color: "#1267EF" }}>Login</span></a></Link></p>
                                    </>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Col>

                <Col xs={{ span: 12, order: 1 }} lg={{ span: 6, order: 2 }} style={{ backgroundColor: "#1267EF" }}>
                    <div className={styles.closeIcon}>
                        <a href="/">
                            <img src="/static/icons/crossIcon.svg" alt="crossIcon" />
                        </a>
                    </div>
                    <div className={`${styles.wControlCol2} ${styles.signInHeight} d-flex flex-column justify-content-center text-center mx-auto`}>
                        <div className="my-3">
                            {/* <img
                                    src="/static/icons/logo.svg"
                                    className="mx-auto mw-100"
                                    alt="logo"
                                    width="111px"
                                    height="54px"
                                /> */}
                        </div>
                        <h5 className="text-white">To keep connected with us, Please login with your
                                    personal information by email address and password</h5>
                        <div className="mt-3">
                            <img
                                src="/static/icons/sign-in.svg"
                                className="mx-auto mw-100"
                                alt="sign-in"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>

    );
};

export default SignUp;
