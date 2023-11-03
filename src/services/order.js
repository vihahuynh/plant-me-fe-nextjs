import axios from "axios";
const baseUrl = "/api/orders";

const getAll = (query, token) => {
  return axios.get(`${baseUrl}?${query}`, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const get = (id, token) => {
  return axios.get(`${baseUrl}/${id}`, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const create = (newObject, token) => {
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const update = (id, updateObject, token) => {
  return axios.patch(`${baseUrl}/${id}`, updateObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

export const orderService = { getAll, get, create, update };
