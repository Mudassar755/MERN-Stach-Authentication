import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  VALIDATION_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../../utils/setAuthToken";

import { signup, getUser, login, validateToken } from '../../services/auth'

//Load user
export const loadUser = () => async (dispatch:any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
//   if(!localStorage.token){
//     dispatch(setAlert("No Token ", "error"));
//     return
//   }

  try {
    const res = await getUser();

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
//Register User
export const register = (values:any) => async (dispatch:any) => {
//   const userInfo = JSON.stringify({ name, email });
  try {
    // setLoading(true)
    const res = await signup(values);
    // console.log("response", res)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    // setLoading(false)
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error:any) => dispatch(setAlert(error.msg, "error")));
    }
    // setLoading(false)
    // dispatch({
    //   type: REGISTER_FAIL
    // });
  }
};

//Validate User Email
export const validate = (token:string) => async (dispatch:any) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      try {
      const user = await getUser();

    const res = await validateToken(token, user.data._id);
    dispatch({
        type: VALIDATION_SUCCESS,
        payload: res.data
    });
    dispatch(setAlert("Congratulation! You are authorized", "success"))
    dispatch(loadUser());
} catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error:any) => dispatch(setAlert(error.msg, "error")));
    }
    // dispatch({
    //   type: LOGIN_FAIL
    // });
  }
};

//Login User
export const handleLogin = (values:string) => async (dispatch:any) => {

//   const userCred = JSON.stringify({ email });
  try {
    // setLoading(true)
    const res = await login(values);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    // setLoading(false)
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    // setLoading(false)

    if (errors) {
      errors.forEach((error:any) => dispatch(setAlert(error.msg, "error")));
    }
    // dispatch({
    //   type: LOGIN_FAIL
    // });
  }
};

//Update User
// export const update = ({ name, email, password }) => async (dispatch:any) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
//   const body = JSON.stringify({ name, email, password });
//   try {
//     const res = await axios.post("http://localhost:8080/api/users/update", body, config);
//     // console.log("res==>>", res)
//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data
//     });

//     dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach((error:string) => dispatch(setAlert(error.msg, "error")));
//     }
//     // dispatch({
//     //   type: REGISTER_FAIL
//     // });
//   }
// };

//Logout

export const logout = () => (dispatch:any) => {
  dispatch({ type: LOGOUT });

};
