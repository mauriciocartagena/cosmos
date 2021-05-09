import { FieldErrorParnet } from "../generated/graphql";

export const toErrorMapParnert = (errors: FieldErrorParnet[]) => {
  const erropMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    erropMap[field] = message;
  });

  return erropMap;
};
