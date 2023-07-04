import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; 

export const createUser = async (newUser) => {
    const response = await axios.post(`${API_BASE_URL}/register`, newUser);
    return response.data;

};

export const getUser = async () => {
    const response = await axios.get(`${API_BASE_URL}/register`);
    return response.data;

};
