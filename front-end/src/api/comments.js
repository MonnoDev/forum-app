import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; 

export const createComment = async (questionId, commentData) => {
    const response = await axios.post(`${API_BASE_URL}/question/${questionId}/comments`, commentData);
    return response.data;
  };

export const getComment = async (questionId) => {
    const response = await axios.get(`${API_BASE_URL}/question/${questionId}/comments`);
    return response.data;
  };

  export const updateComment = async (comment) => {
    const response = await axios.put(
      `${API_BASE_URL}/comments/${comment.id}`,
      comment
    );
    return response.data;
  };

  export const deleteComment = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/comments/${id}`);
    return response.data
  }