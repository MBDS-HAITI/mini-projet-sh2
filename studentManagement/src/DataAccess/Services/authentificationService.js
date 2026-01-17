import axios from 'axios';
const API_URL = import.meta.env.VITE_API_BASE;

const login = async (email, password) => {
  const response = await axios.post(API_URL + "login", {
    email,
    password
  });

  if (response.data.accessToken) {
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const isAuthenticated = () => {
  return !!getToken();
};

export{
  login,
  logout,
  getToken,
  getCurrentUser,
  isAuthenticated
};