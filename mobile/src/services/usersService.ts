import { apiClient } from "./apiClient";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post("/users/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
};
