import axios from 'axios';
import { readFromLocalStorage, writeToLocalStorage } from './localStorageUtils';
import { buildErrorMessage } from './axiosErrorsUtils';
import { actions } from '../components/Auth/store';
import { store } from '../store';
import apiRoutes from '../constants/apiRoutes';

/**
 * Sends request with refreshToken to the server API to retrieve the access token
 * and saves refreshed accessToken to the Local Storage
 */
const refreshAccessToken = async (): Promise<string|never> => {
  const refreshToken: string|null = readFromLocalStorage('refreshToken');

  if (!refreshToken) {
    throw new Error('"refreshToken" is not set!');
  }

  const response = await axios.post(apiRoutes.refreshToken, { refreshToken });
  const { accessToken } = response.data;

  writeToLocalStorage('accessToken', accessToken);

  return accessToken;
};

/**
 * Intercepts server responses and refreshes the access tokens if needed
 */
export default () => {
  axios.interceptors.response.use(undefined, async (error) => {
    const { response } = error;

    if (response) {
      const { data: { message, statusCode } } = response;
      if (message === 'Access token invalid') {
        try {
          const retryConfig = error.config;

          retryConfig.headers.Authorization = `Bearer ${await refreshAccessToken()}`;

          return axios.request(retryConfig);
        } catch (e) {
          store.dispatch(actions.resetAuth());
        }
      } else {
        throw new Error(buildErrorMessage(statusCode, message));
      }
    }

    return Promise.reject(error);
  });
};
