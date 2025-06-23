import axios from "axios";

const http = axios.create({
  baseURL: "https://localhost:7012/api" || "http://localhost:7012/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default () => ({ http });
