import axios from 'axios'

export const axiosInstance = axios.create( {
    baseURL: '/api/v1', // /api/v1 is caught in vite config to proxy to http://localhost/api/v1
    timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
} )
