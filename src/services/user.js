import axios from "axios";

const baseUrl = "http://localhost:3001/api/users";

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const getAll = () => {
  return axios.get(baseUrl);
};

const update = (id, updateObject, token) => {
  return axios.patch(`${baseUrl}/${id}`, updateObject, {
    headers: { Authorization: `bearer ${token}` },
  });
};

const subscribe = (subscribed, token) => {
  return axios.patch(
    `${baseUrl}/me/subscribe`,
    { subscribed },
    { headers: { Authorization: `bearer ${token}` } }
  );
};

export const userService = { getAll, create, update, subscribe };
