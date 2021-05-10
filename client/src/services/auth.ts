import axios from "axios";
import {
  LOGIN,
  SIGNUP,
  LOAD_USER,

} from "../constants/api";
import { Auth } from "../types/Auth";
import { User } from "../types/User";

export const getUser = async () => {
  return axios.post(LOAD_USER);
};

export const login = async ({ email, password }:Auth) => {
  console.log("emailll", email, password)
  //setOpenSpinner(true);
  const res= axios.post(LOGIN, {
    email,
    password,
  });
 // setOpenSpinner(false);
  return res;
};

export const signup = async (userInfo: User) => {
  console.log("userInfo", userInfo)
  return axios.post(SIGNUP, userInfo);
};
