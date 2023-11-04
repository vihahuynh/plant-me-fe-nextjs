import axios from "axios";

const baseUrl = "http://localhost:3001/api/reviews";

const getAll = (query) => {
  return axios.get(`${baseUrl}?${query}`);
};

const create = (newObject, token) => {
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const update = (id, updateObject) => {
  return axios.patch(`${baseUrl}/${id}`, updateObject);
};

export const reviewService = { getAll, create, update };
