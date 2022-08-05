import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const createBranch = (newBranch) => API.post('/branches', newBranch);
export const likeBranch = (id) => API.patch(`/branches/${id}/likeBranch`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const updatePostTimeSheets = (id, updatedPost, timeSheet) => API.patch(`/posts/timeSheets/${id}`, updatedPost);
export const updateBranch = (id, updatedBranch) => API.patch(`/branches/${id}`, updatedBranch);
export const deletePost = (id) => API.delete(`/posts/${id}`);


export const fetchBranch = (id) => API.get(`/branches/${id}`);
export const fetchBranches = (page) => API.get(`/branches?page=${page}`);
export const fetchBranchData = () => API.get(`/branches/all`);
export const fetchEmployeeData = () => API.get(`/posts/all`);

export const fetchBranchesByCreator = (name) => API.get(`/branches/creator?name=${name}`);
export const fetchBranchesBySearch = (searchQuery) => API.get(`/branches/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
