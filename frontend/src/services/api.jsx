import axios from "axios";

const http = axios.create({
  baseURL: "https://localhost:7012/api" || "http://localhost:7012/api",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config
  },
  (error) => Promise.reject(error)
);

// Sử lý lỗi khi token hết hạn
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      window.location.href = '/'; // Chuyển hướng về trang đăng nhập
    }
    return Promise.reject(error);
  }
);

export default () => ({ http });
