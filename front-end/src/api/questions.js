import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; 

export const createQuestion = async (question) => {
    const response = await axios.post(`${API_BASE_URL}/questions`, question);
    return response.data;

};

export const getQuestions = async () => {
    const response = await axios.get(`${API_BASE_URL}/questions`);
    return response.data;
  };

export const updateQuestiom = async (question) => {
    const response = await axios.put(
      `${API_BASE_URL}/questions/${question.id}`,
      question
    );
    return response.data;
  };
