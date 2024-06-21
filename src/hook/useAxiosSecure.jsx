import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response.status;
    if (status === 401 || status === 403) {
      await logout();
      // Navigate to login page using useEffect
      // This ensures it happens after the component has rendered
      // and avoids the warning about direct navigate usage.
      console.log('Navigating to login page');
      // Wrapping navigate in a useEffect hook
      navigate('/login');
    }
    return Promise.reject(error);
  });

  return axiosSecure;
};

export default useAxiosSecure;
