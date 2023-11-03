import axios from "axios";
const baseUrl = "/api/guest-orders";

const getAll = (query, token) => {
  return axios.get(`${baseUrl}?${query}`, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const get = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, updateObject) => {
  return axios.patch(`${baseUrl}/${id}`, updateObject);
};

export const guestOrderService = { getAll, get, create, update };
