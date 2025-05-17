// utils/auth.js
import axios from 'axios';

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const decoded = JSON.parse(atob(accessToken.split('.')[1]));
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      const res = await axios.post('http://localhost:8000/api/auth/token', { refreshToken });
      localStorage.setItem('accessToken', res.data.accessToken);
      return res.data.accessToken;
    } else {
      return accessToken;
    }
  } catch (err) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};