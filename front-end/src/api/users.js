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
  

export const getUser = async () => {
    const response = await axios.get(`${API_BASE_URL}/login`);
    return response.data;

};
