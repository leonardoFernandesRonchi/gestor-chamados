import * as yup from "yup";

const schema = yup.object({
  departmentName: yup.string().required("Informe o nome do departamento"),

  departmentCode: yup.string().required("Informe o código do departamento"),

  userName: yup
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .required("Informe seu nome"),

  userPhone: yup.string().required("Informe seu telefone"),

  userEmail: yup
    .string()
    .email("E-mail inválido")
    .required("Informe seu e-mail"),

  userPassword: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .matches(/[a-z]/, "A senha deve conter uma letra minúscula")
    .matches(/[A-Z]/, "A senha deve conter uma letra maiúscula")
    .matches(/[0-9]/, "A senha deve conter um número")
    .matches(/[^A-Za-z0-9]/, "A senha deve conter um símbolo"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("userPassword")], "As senhas não coincidem")
    .required("Confirme sua senha"),
});

export default schema;
