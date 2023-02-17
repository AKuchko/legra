const axios = require("axios");
const timeout = 60000;
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout,
  withCredentials: true,
});

const client = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  delete: axiosInstance.delete,
  put: axiosInstance.put,
};

const baseRequestInterceptor = (config) => config;
const baseResponseInterceptor = (response) => response;
const baseErrorInterceptor = (error) => error;

const addRequestInterceptor = ({ requestInterceptor, errorInterceptor }) => {
  const interceptor = axiosInstance.interceptors.request.use(
    requestInterceptor || baseRequestInterceptor,
    errorInterceptor || baseErrorInterceptor
  );
  return () => {
    axiosInstance.interceptors.request.eject(interceptor);
  };
};

const addResponseInterceptor = ({ responseInterceptor, errorInterceptor }) => {
  const interceptor = axiosInstance.interceptors.response.use(
    responseInterceptor || baseResponseInterceptor,
    errorInterceptor || baseErrorInterceptor
  );
  return () => {
    axiosInstance.interceptors.response.eject(interceptor);
  };
};

export { addRequestInterceptor, addResponseInterceptor };
export default client;
