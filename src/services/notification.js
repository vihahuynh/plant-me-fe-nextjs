import axios from "axios";

const baseUrl = "http://localhost:3001/api/notification";

const getAll = (query, token) => {
  return axios.get(`${baseUrl}?${query}`, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const update = (id, newObject, token) => {
  return axios.patch(`${baseUrl}/${id}`, newObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

export const notificationService = { getAll, update };
