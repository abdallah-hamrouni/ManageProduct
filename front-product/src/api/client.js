import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.49.2:30050/api",
  timeout: 10000,
});
