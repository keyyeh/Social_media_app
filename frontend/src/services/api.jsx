import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5039/api", // Cổng đúng với backend bạn đang chạy
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token nếu có
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý khi token hết hạn
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

const createApi = () => ({ http });

export default createApi;
