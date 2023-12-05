import axios from 'axios';
import {API_URL} from '@env';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 segundos
});

axiosInstance.interceptors.response.use(
  response => {
    console.info(response.status);
    return response;
  },
  error => {
    //console.log('API URL:', API_URL);
    if (error.response) {
      const statusMessage =
        error.response.data.message || 'ERRO ' + error.response.status;
      if (error.response.status !== 404 && error.response.status !== 400) {
        console.warn(
          `${
            error.response.data.message
              ? error.response.data.message
              : 'Erro: ' + error.response.status
          }`,
        );
      }

      return Promise.reject(statusMessage);
    } else if (error.request) {
      //console.log('DEBUG:', DEBUG);
      console.error(
        `Erro: ${
          error.response.data.message
            ? error.response.data.message
            : error.response.status
        }`,
      );
      return Promise.reject('Nenhuma resposta recebida');
    } else {
      return Promise.reject('Request falhou');
    }
  },
);

export default axiosInstance;
