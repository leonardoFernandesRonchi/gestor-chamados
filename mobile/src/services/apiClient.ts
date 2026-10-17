import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "http://10.0.2.2:3000",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  headers: {
    "Content-Type": undefined,
  },
  withCredentials: true,
});
