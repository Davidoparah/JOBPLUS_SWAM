import axios from 'axios';
import { parseErrors } from '../utils/parseErrors';
import { useCookie } from './useCookie';
import { useAuth } from '../contexts/AuthContext';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useApi = () => {
  const { getAuthCookie } = useCookie();
  const { getLoggedInUserId } = useAuth();
  
  const token = getAuthCookie();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['X-User-Id'] = getLoggedInUserId();
  }

  const request = async (endpoint, options={}) => {
    try {
      const res = await axios({
        method: options.method,
        url: `${BACKEND_URL}/${endpoint}`,
        data: options.data || {},
        params: options.params || {},
      });
      options.onSuccess && options.onSuccess(res)
    } catch (err) {
      options.onFailure && options.onFailure(parseErrors(err))
    }
  };

  return {
    post: (endpoint, options) => request(endpoint, { ...options, method: 'POST' }),
    get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
    put: (endpoint, options) => request(endpoint, { ...options, method: 'PUT' }),
    delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
  };
};