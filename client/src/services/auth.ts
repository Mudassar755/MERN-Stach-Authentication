import axios from "axios";
import {
  LOGIN,
  SIGNUP,
  LOAD_USER,
  VALIDATE_TOKEN,

} from "../constants/api";
import { Auth } from "../types/Auth";
import { User } from "../types/User";

export const getUser = async () => {
  return axios.post(LOAD_USER);
};

export const login = async ({ email }:any) => {
  // console.log("emailll", email, password)
  //setOpenSpinner(true);
  const res= axios.post(LOGIN, {
    email,
    // password,
  });
 // setOpenSpinner(false);
  return res;
};

export const signup = async (userInfo: any) => {
  console.log("userInfo", userInfo)
  return axios.post(SIGNUP, userInfo);
};

export const validateToken = async (token:string, id:string) => {
  const res = axios.post(VALIDATE_TOKEN, { token, id });
  return res;
};
