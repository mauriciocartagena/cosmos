import { Form, Formik } from "formik";
import React from "react";
import PhoneInput from "react-phone-input-2";
import { InputField } from "../../form-fields/InputField";
import { useUpdateUserMutation } from "../../generated/graphql";
import { Button } from "../Button";
import { ButtonLink } from "../ButtonLink";
import { Modal } from "../Modal";

interface EditAccountModal {
  onRequestClose: () => void;
  id: number;
  direction: string;
  email: string;
  first_last_name: string;
  name: string;
  phone: string;
  second_last_name: string;
}

export const EditAccountModal: React.FC<EditAccountModal> = ({
  onRequestClose,
  id,
  name,
  direction,
  email,
  first_last_name,
  phone,
  second_last_name,
}) => {
  const [updatedAccount] = useUpdateUserMutation();

  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Formik
        initialValues={{
          name: name,
          first_last_name: first_last_name,
          second_last_name: second_last_name,
          direction: direction,
          phone: phone,
        }}
        onSubmit={async (values) => {
          try {
            await updatedAccount({
              variables: {
                id: id,
                ...values,
              },
              update: (cache) => {
                cache.evict({
                  id: "ROOT_QUERY",
                  fieldName: "fetchUser",
                });
              },
            });
            onRequestClose();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className={`grid grid-cols-1 gap-4 focus:outline-none w-full`}>
            <div className={`col-span-3 block`}>
              <h4 className={`mb-2 text-primary-100`}>Editar Perfil</h4>
              <div className={`text-primary-300`}>
                Por favor usar información verdadera
              </div>
            </div>
            <div className={`h-full w-full col-span-3`}>
              <InputField
                className={`rounded-8 bg-primary-700 px-4 h-6`}
                name="name"
                maxLength={60}
                placeholder={"Nombre"}
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className={`h-full w-full col-span-3`}>
              <InputField
                className={`rounded-8 bg-primary-700 px-4 h-6`}
                name="first_last_name"
                maxLength={60}
                placeholder={"Primer apellido"}
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className={`h-full w-full col-span-3`}>
              <InputField
                className={`rounded-8 bg-primary-700 px-4 h-6`}
                name="second_last_name"
                maxLength={60}
                placeholder={"Segundo apellido"}
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className={`h-full w-full col-span-3`}>
              <PhoneInput
                inputClass="w-full py-2 px-4 rounded-8  placeholder-primary-300 text-primary-100 focus:outline-none bg-primary-700  rounded-8 bg-primary-700 px-4 h-6"
                inputStyle={{
                  backgroundColor: "var(--color-primary-700)",
                  border: "none",
                }}
                value={values.phone}
                dropdownClass="rounded-8 phone placeholder-primary-300 text-primary-100 focus:outline-none bg-primary-700  rounded-8 bg-primary-700"
                dropdownStyle={{
                  backgroundColor: "var(--color-primary-800)",
                  borderColor: "gray",
                  border: "none",
                }}
                onChange={(value) => {
                  setFieldValue("phone", `+ ${value}`);
                }}
                country="bo"
                specialLabel=""
                inputProps={{
                  FocusEvent: "outline-none",
                  name: "phone",
                }}
              />
            </div>
            <div className={`col-span-3 bg-primary-700 rounded-8`}>
              <InputField
                className={`px-3 h-11 col-span-3 w-full`}
                name="direction"
                placeholder="Dirección"
                rows={3}
                maxLength={500}
                textarea
              />
            </div>

            <div className={`flex pt-2 space-x-3 col-span-full items-center`}>
              <Button type="submit" className={`mr-3`} loading={isSubmitting}>
                Editar
              </Button>
              <ButtonLink type="button" onClick={onRequestClose}>
                Cancelar
              </ButtonLink>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
