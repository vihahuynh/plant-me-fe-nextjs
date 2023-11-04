import axios from "axios";

const baseUrl = "http://localhost:3001/api/email";

const sendEmail = (email) => {
  return axios.post(baseUrl, email);
};

export const emailService = { sendEmail };
