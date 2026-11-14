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

const me = async () => {
  try {
    const response = await apiClient.get("/users/me");
    return response;
  } catch (error) {
    throw error;
  }
};

const create = async ({
  name,
  email,
  password,
  phone,
  department_id,
  status,
}: {
  name: string;
  email: string;
  password: string;
  phone: string;
  department_id: string;
  status: string;
}) => {
  try {
    const formData = new FormData();

    formData.append(
      "user",
      JSON.stringify({ name, email, password, phone, department_id, status }),
    );

    const response = await apiClient.post("/users", formData);

    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  login,
  me,
};
