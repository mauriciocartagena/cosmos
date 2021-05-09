import { PartnerInput } from "../resolvers/PartnetInput";

export const validateRegisterPartner = (input: PartnerInput) => {
  if (input.name.length <= 2) {
    return [
      {
        field: "name",
        message: "Introducir más de 2 caracteres",
      },
    ];
  }
  if (input.first_last_name.length <= 2) {
    return [
      {
        field: "first_last_name",
        message: "Introducir más de 2 caracteres",
      },
    ];
  }

  return null;
};
