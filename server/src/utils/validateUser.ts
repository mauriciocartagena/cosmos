import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateUser = (options: UsernamePasswordInput) => {
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Introducir más de 2 caracteres",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "No debe de incluir @",
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Introducir más de 2 caracteres",
      },
    ];
  }

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Email invalido",
      },
    ];
  }

  return null;
};
