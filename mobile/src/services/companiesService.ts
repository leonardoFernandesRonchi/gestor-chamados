import type { ImagePickerAsset } from "expo-image-picker";
import { apiClient } from "./apiClient";

type CreateCompanyParams = {
  companyName: string;
  cnpj: string;
  companyPhone: string;
  companyEmail: string;
  userName: string;
  userPassword: string;
  userPhone: string;
  userEmail: string;
  departmentName: string;
  avatar?: ImagePickerAsset | null;
};

const create = async ({
  companyName,
  cnpj,
  companyPhone,
  companyEmail,
  userName,
  userPassword,
  userPhone,
  userEmail,
  departmentName,
  avatar,
}: CreateCompanyParams) => {
  const formData = new FormData();

  formData.append(
    "company",
    JSON.stringify({
      name: companyName,
      cnpj,
      phone: companyPhone,
      email: companyEmail,
    }),
  );

  formData.append(
    "user",
    JSON.stringify({
      name: userName,
      password: userPassword,
      phone: userPhone,
      email: userEmail,
    }),
  );

  formData.append(
    "department",
    JSON.stringify({
      name: departmentName,
    }),
  );

  if (avatar) {
    formData.append("avatar", {
      uri: avatar.uri,
      name: avatar.fileName ?? "avatar.jpg",
      type: avatar.mimeType ?? "image/jpeg",
    } as any);
  }

  const response = await apiClient.post("/companies", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default { create };
