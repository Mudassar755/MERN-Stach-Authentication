import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    VALIDATION_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../Actions/types";
  
  const initialState = {
    token: null,
    // token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: true,
    user: null
  };
  
  const authReducer = (state = initialState, action:any) => {
    const { payload, type } = action;
    switch (type) {
      case USER_LOADED:
        let token = localStorage.getItem("token")
        return {
          ...state,
          isAuthenticated: payload.valid,
          isLoading: false,
          user: payload,
          token: token
        };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
      case VALIDATION_SUCCESS:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: payload.user.valid,
          isLoading: false
        };
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
        localStorage.removeItem("token");
        return {
          ...state,
          isAuthenticated: false,
          isLoading: false,
          token: null,
          user: null
        };
      default:
        return state;
    }
  }
  
  export default authReducer;