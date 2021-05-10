import React, { createContext, useReducer } from 'react';
import UserReducer from './UserReducer';
import axios from 'axios'
import { Auth } from '../types/Auth';
import { getUser, login, signup } from '../services/auth';
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
    console.log("resssss", res)

    dispatch({
      type: "USER_LOADED",
      payload: res.data
    });

  };
  async function handleLogin(values:Auth) {

    const res = await login(values);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data
    });
    // setLoading(false)
    dispatch(loadUser());
  };

  async function handleSignup(values: User){
  
    const res = await signup(values);
    // console.log("response", res)
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data
    });
    // setLoading(false)
    dispatch(loadUser());
   
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
    logout
  }}>
    {children}
  </GlobalContext.Provider>);
}