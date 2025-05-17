import API from './index';

export const createMeme = async (memeData) => {
  const response = await API.post('/memes', memeData);
  return response.data;
};

export const getAllMemes = async (params = {}) => {
  const response = await API.get('/memes', { params });
  return response.data;
};

export const getMeme = async (id) => {
  const response = await API.get(`/memes/${id}`);
  return response.data;
};

export const updateMeme = async (id, memeData) => {
  const response = await API.put(`/memes/${id}`, memeData);
  return response.data;
};

export const deleteMeme = async (id) => {
  const response = await API.delete(`/memes/${id}`);
  return response.data;
};

export const upvoteMeme = async (id) => {
  const response = await API.post(`/memes/${id}/upvote`);
  return response.data;
};

export const downvoteMeme = async (id) => {
  const response = await API.post(`/memes/${id}/downvote`);
  return response.data;
};

// Add this new function
export const addComment = async (memeId, commentData) => {
  const response = await API.post(`/memes/${memeId}/comments`, commentData);
  return response.data;
};