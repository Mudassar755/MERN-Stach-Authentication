import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormCheck from 'react-bootstrap/FormCheck';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './Validation.module.css'

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
import { validate } from '../../redux/Actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/Reducers'

const SignUp = () => {
    const [openSpinner, setOpenSpinner] = useState(false);
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated)
    const user = useSelector((state:RootState) => state.auth.user)

    const onSubmit = (values: any) => {
        dispatch(validate(values.validationCode))
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
                        <h2 className="mb-3 mt-3 font-weight-bold">Validate Your Account!</h2>

                        <div className="mt-3">
                            <Formik
                                initialValues={{
                                    validationCode: "",
                                }}
                                validationSchema={Yup.object().shape({
                                    validationCode: Yup.string().max(6).min(6).required("Enter the Token"),
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
                                                error={Boolean(touched.validationCode && errors.validationCode)}
                                                fullWidth
                                                helperText={touched.validationCode && errors.validationCode}
                                                label="Validation Code"
                                                margin="normal"
                                                name="validationCode"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="number"
                                                value={values.validationCode}
                                                variant="outlined"
                                                className="pb-4 mb-1 shadow-none"
                                            />

                                            <Button className={`${styles.loginButton} w-100 shadow-none font-weight-bold`} variant="primary" type="submit" style={{ backgroundColor: "#1267EF" }}>Submit</Button>
                                        </Form>
                                        {/* <p>Already have an account? <Link to='/login'><a><span style={{ color: "#1267EF" }}>Login</span></a></Link></p> */}
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
