import axios from "axios";

const baseUrl = "http://localhost:3001/api/addresses";

// get all addresses of specific user
const getAll = (token) => {
  return axios.get(baseUrl, { headers: { Authorization: `bearer ${token}` } });
};

const get = (id, token) => {
  return axios.get(`${baseUrl}/${id}}`, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const update = (id, updateObject, token) => {
  return axios.patch(`${baseUrl}/${id}`, updateObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const create = (newObject, token) => {
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const remove = (id, token) => {
  return axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `bearer ${token}` },
  });
};

export const addressService = { getAll, get, create, update, remove };
