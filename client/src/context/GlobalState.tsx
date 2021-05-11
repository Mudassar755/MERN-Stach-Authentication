import React, { createContext, useReducer } from 'react';
import UserReducer from './UserReducer';
import axios from 'axios'
import { Auth } from '../types/Auth';
import { getUser, login, signup, validateToken } from '../services/auth';
import setAuthToken from '../utils/setAuthToken';
import { User } from '../types/User';

// Initial state
const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: true,
  user: null
}

type contextProps = {
  isLoading:Boolean,
  user:any,
  isAuthenticated:Boolean,
  loadUser: () => void,
  handleLogin: (values:Auth) => void,
  handleSignup: (values:User) => void
  validate: (token:string) => void
  logout: () => void,
};
// Create context
export const GlobalContext = createContext<Partial<contextProps>>({});

// Provider component
export const GlobalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Actions

  async function loadUser() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await getUser();
    // console.log("resssss", res)

    dispatch({
      type: "USER_LOADED",
      payload: res.data
    });

  };
  async function handleLogin(values:any) {

    const res = await login(values);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data
    });
    // setLoading(false)
    dispatch(loadUser());
  };

  async function handleSignup(values: any){
  
    const res = await signup(values);
    // console.log("response", res)
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data
    });
    // setLoading(false)
    // dispatch(loadUser());
   
  };

  async function validate(token:string) {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const user = await getUser();
    console.log("userrrrr", token, "iddd",  user.data._id)
      const res = await validateToken(token, user.data._id);
      console.log("ressss", res)
      dispatch({
        type: "VALIDATION_SUCCESS",
        payload: res.data
      });
  
  };

  function logout() {
    dispatch({ type: "LOGOUT" });
  
  };

  return (<GlobalContext.Provider value={{
    isLoading: state.isLoading,
    isAuthenticated:state.isAuthenticated,
    user:state.user,
    loadUser,
    handleLogin,
    handleSignup,
    validate,
    logout
  }}>
    {children}
  </GlobalContext.Provider>);
}