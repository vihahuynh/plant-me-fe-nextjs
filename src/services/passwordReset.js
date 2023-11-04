import axios from "axios";

const baseUrl = "http://localhost:3001/api/password-reset";

const sendLink = (object) => {
  return axios.post(baseUrl, object);
};

const updatePassword = (userId, token, object) => {
  return axios.post(`${baseUrl}/${userId}/${token}`, object);
};

export const passwordResetService = { sendLink, updatePassword };
