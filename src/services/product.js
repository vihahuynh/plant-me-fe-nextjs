import axios from "axios";

const baseUrl = "http://localhost:3001/api/products";

const getAll = (query) => {
  return axios.get(`${baseUrl}?${query}`);
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

const get = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

export const productService = { getAll, create, get, update };
