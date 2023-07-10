import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const createAnswer = async (questionId, answerData) => {
  const response = await axios.post(
    `${API_BASE_URL}/question/${questionId}/answers`,
    answerData
  );
  return response.data;
};

export const getAnswers = async (questionId) => {
  const response = await axios.get(
    `${API_BASE_URL}/question/${questionId}/answers`
  );
  return response.data;
};

export const updateAnswer = async (answer) => {
  const response = await axios.put(
    `${API_BASE_URL}/answer/${answer.id}`,
    answer
  );
  return response.data;
};

export const deleteAnswer = async (answerId) => {
  const response = await axios.delete(`${API_BASE_URL}/answer/${answerId}`);
  return response.data;
};

export const getAnswer = async (answerId) => {
  const response = await axios.get(`${API_BASE_URL}/answer/${answerId}`);
  return response.data;
};
