import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const erropMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    erropMap[field] = message;
  });

  return erropMap;
};
