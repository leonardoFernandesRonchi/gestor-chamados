import * as yup from "yup";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const isValidCNPJ = (value: string) => {
  const cnpj = onlyDigits(value);

  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  const calculateDigit = (base: string, weights: number[]) => {
    const sum = base
      .split("")
      .reduce(
        (total, digit, index) => total + Number(digit) * weights[index],
        0,
      );

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(
    cnpj.slice(0, 12),
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );

  const secondDigit = calculateDigit(
    cnpj.slice(0, 12) + firstDigit,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );

  return Number(cnpj[12]) === firstDigit && Number(cnpj[13]) === secondDigit;
};

const schema = yup.object({
  companyName: yup
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .required("Informe o nome da empresa"),

  cnpj: yup.string().required("Informe o CNPJ"),
  // .test("valid-cnpj", "CNPJ inválido", (value) =>
  //   value ? isValidCNPJ(value) : false,
  // ),

  companyPhone: yup.string().required("Informe o telefone da empresa"),
  // .test("valid-phone", "Informe um telefone válido com DDD", (value) => {
  //   if (!value) return false;

  //   const phone = onlyDigits(value);
  //   return (
  //     (phone.length === 10 || phone.length === 11) && /^[1-9]{2}/.test(phone)
  //   );
  // }),

  companyEmail: yup
    .string()
    .trim()
    .email("E-mail inválido")
    .required("Informe o e-mail da empresa"),
});

export default schema;
