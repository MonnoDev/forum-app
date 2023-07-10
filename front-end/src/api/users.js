import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const createUser = async (newUser) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, newUser);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const updateUser = async (id, updatingUser) => {
  const response = await axios.put(`${API_BASE_URL}/user/${id}`, updatingUser);
  return response.data;
};

export const getUser = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/user/${id}`);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/user/${id}`);
  return response.data;
};
