import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadPdfDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const sendChatMessage = async (question) => {
  const response = await apiClient.post('/chat', { question });
  return response.data;
};