const axios = require("axios");
const timeout = 60000;
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout,
});
const client = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  delete: axiosInstance.delete,
  put: axiosInstance.put,
};

export default client;
