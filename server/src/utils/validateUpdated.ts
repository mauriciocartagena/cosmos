import { InputUpdated } from "../resolvers/InputUpdated";

export const validateUpdated = (options: InputUpdated) => {
  if (options.name.length <= 2) {
    return [
      {
        field: "name",
        message: "Introducir más de 2 caracteres",
      },
    ];
  }

  if (options.first_last_name.length <= 2) {
    return [
      {
        field: "first_last_name",
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
