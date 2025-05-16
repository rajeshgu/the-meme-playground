import axios from 'axios';

const API_URL = 'http://localhost:5000/api/memes';

const getAllMemes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createMeme = async (memeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post(API_URL, memeData, config);
  return response.data;
};

const upvoteMeme = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/${id}/upvote`, {}, config);
  return response.data;
};

const downvoteMeme = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/${id}/downvote`, {}, config);
  return response.data;
};

export default { getAllMemes, createMeme, upvoteMeme, downvoteMeme };