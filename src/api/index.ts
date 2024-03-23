import axios from "axios";

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

baseApi.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(error)
  }
)
