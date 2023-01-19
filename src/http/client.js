const axios = require('axios')
const timeout = 60000
const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL || '/',
    timeout
})
const client = {
    get: axiosInstance.get,
    post: axiosInstance.post,
    delete: axiosInstance.delete,
    put: axiosInstance.put
}

export default client