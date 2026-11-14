import { apiClient } from "./apiClient";

const create = async ({ name }: { name: string }) => {
  try {
    const response = await apiClient.post("/departments", { name });
    return response.data;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};

export default { create };
