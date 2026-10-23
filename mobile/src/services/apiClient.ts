import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  //baseURL: "http://10.0.2.2:3000",
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
