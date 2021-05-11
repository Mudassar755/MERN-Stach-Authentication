 //${process.env.REACT_APP_DOMAIN} -> Change this instead of route

export const DOMAIN = `http://localhost:5002/api/`;
//---------------------  Users  ------------------------//
export const SIGNUP = `${DOMAIN}users/`;
export const LOGIN = `${DOMAIN}auth/login`;
export const LOAD_USER = `${DOMAIN}auth`;
export const VALIDATE_TOKEN = `${DOMAIN}auth/validate`;

