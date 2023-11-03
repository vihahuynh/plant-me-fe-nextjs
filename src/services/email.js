import axios from "axios";

const baseUrl = "/api/email";

const sendEmail = (email) => {
  return axios.post(baseUrl, email);
};

export const emailService = { sendEmail };
