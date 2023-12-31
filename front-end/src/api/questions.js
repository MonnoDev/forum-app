import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const createQuestion = async (question) => {
  const response = await axios.post(`${API_BASE_URL}/question`, question);
  return response.data;
};

export const getQuestions = async (sortOrder, answersCountOrder) => {
  const response = await axios.get(`${API_BASE_URL}/questions`, {
    params: { sortOrder, answersCountOrder },
  });
  return response.data;
};

export const updateQuestion = async (question) => {
  const response = await axios.put(
    `${API_BASE_URL}/question/${question.id}`,
    question
  );
  return response.data;
};

export const getQuestion = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/question/${id}`);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/question/${id}`);
  return response.data;
};
