import axios from "axios";
// import jwt from "jsonwebtoken"

const baseUrl = "/api/login";

const login = (data) => {
  return axios.post(baseUrl, data);
};

// const isExpiredToken = (token) => {
//     const decodedToken = jwt.decode(token, { complete: true })
//     const now = new Date()

//     if (decodedToken.exp < now.getTime()) {
//         return true
//     }
//     return false
// }

export const loginService = { login };
