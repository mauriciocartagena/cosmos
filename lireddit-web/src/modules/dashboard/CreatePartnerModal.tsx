import { Form, Formik } from "formik";
import React from "react";
import PhoneInput from "react-phone-input-2";
import { InputField } from "../../form-fields/InputField";
import { useCreatePartnerMutation } from "../../generated/graphql";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { toErrorMapParnert } from "../../utils/toErrorMapParnert";
import { useScreenType } from "../../shared-hooks/useScreenType";
interface CreatePartnerModal {
  onRequestClose: () => void;
  title: string;
}

export const CreatePartnerModal: React.FC<CreatePartnerModal> = ({
  onRequestClose,
  title,
}) => {
  const [register] = useCreatePartnerMutation();

  const screenType = useScreenType();

  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Formik
        initialValues={{
          name: "",
          first_last_name: "",
          second_last_name: "",
          direction: "",
          phone: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "partners:{}" });
            },
          });
          // response.data.createPartner.errors
          if (response.data?.createPartner.errors) {
            setErrors(toErrorMapParnert(response.data.createPartner.errors));
          } else if (response.data?.createPartner.people) {
            // worked
            onRequestClose();
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className={`grid grid-cols-2 gap-4 focus:outline-none w-full`}>
            {screenType === "fullscreen" ? (
              <>
                <div className={`col-span-3 block`}>
                  <h4 className={`mb-2 text-primary-100`}>{title}</h4>
                  <p className={`text-primary-300`}>
                    Por favor llene cuidadosamente los datos
                  </p>
                </div>
                <div className={`flex col-span-3 bg-primary-700 rounded-8`}>
                  <InputField
                    className={`rounded-8 bg-primary-700 px-4 h-6`}
                    name="name"
                    maxLength={60}
                    placeholder={"Nombre"}
                    autoFocus
                    autoComplete="off"
                  />
                </div>
                <div className={`flex col-span-3 bg-primary-700 rounded-8`}>
                  <InputField
                    className={`rounded-8 bg-primary-700 px-4 h-6`}
                    name="first_last_name"
                    maxLength={60}
                    placeholder={"Primer apellido"}
                    autoFocus
                    autoComplete="off"
                  />
                </div>
                <div className={`flex col-span-3 bg-primary-700 rounded-8`}>
                  <InputField
                    className={`rounded-8 bg-primary-700 px-4 h-6`}
                    name="second_last_name"
                    maxLength={60}
                    placeholder={"Segundo apellido"}
                    autoFocus
                    autoComplete="off"
                  />
                </div>
                <div className={`flex col-span-3 bg-primary-700 rounded-8`}>
                  <PhoneInput
                    onChange={(value) => {
                      setFieldValue("phone", `+ ${value}`);
                    }}
                    value={values.phone}
                    inputClass="w-full py-2 px-4 rounded-8  placeholder-primary-300 text-primary-100 focus:outline-none bg-primary-700  rounded-8 bg-primary-700 px-4 h-6"
                    inputStyle={{
                      backgroundColor: "var(--color-primary-700)",
                      border: "none",
                    }}
                    dropdownClass="rounded-8 phone placeholder-primary-300 text-primary-100 focus:outline-none bg-primary-700  rounded-8 bg-primary-700"
                    dropdownStyle={{
                      backgroundColor: "var(--color-primary-800)",
                      borderColor: "gray",
                      border: "none",
                    }}
                    country="bo"
                    specialLabel=""
                    inputProps={{
                      FocusEvent: "outline-none",
                      name: "phone",
                    }}
                  />
                </div>

                <div className={`flex col-span-3 bg-primary-700 rounded-8`}>
                  <InputField
                    className={`h-11 col-span-3 w-full`}
                    name="direction"
                    placeholder="Direcci??n"
                    rows={3}
                    maxLength={500}
                    textarea
                  />
                </div>
                <div
                  className={`flex pt-2 space-x-3 col-span-full items-center`}
                >
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    className={`mr-3`}
                  >
                    Registrar
                  </Button>
                  <ButtonLink type="button" onClick={onRequestClose}>
                    Cancelar
                  </ButtonLink>
                </div>
              </>
            ) : (
              <>
                <div className={`col-span-3 block`}>
                  <h4 className={`mb-2 text-primary-100`}>{title}</h4>
                  <p className={`text-primary-300`}>
                    Por favor llene cuidadosamente los datos
                  </p>
                </div>
                <div className={`flex h-full w-full col-span-2`}>
                  <InputField
                    className={`rounded-8 bg-primary-700 px-4 h-6`}
                    name="name"
                    maxLength={60}
                    placeholder={"Nombre"}
                    autoFocus
                    autoComplete="off"
                  />
                </div>
                <div className={`grid items-start grid-cols-1 h-6`}>
                  <InputField
                    className={`rounded-8 bg-primary-700 px-4 h-6`}
                    name="first_last_name"
                    maxLength={60}
                    placeholder={"Primer apellido"}
                    autoFocus
                    autoComplete="off"
                  />
                </div>
                <div className={`flex h-full w-full col-span-2`}>
                  <InputField
                    className={`rounded-8 bg-primary-700 px-4 h-6`}
                    name="second_last_name"
                    maxLength={60}
                    placeholder={"Segundo apellido"}
                    autoFocus
                    autoComplete="off"
                  />
                </div>
                <div className={`grid items-start grid-cols-1 h-6`}>
                  <PhoneInput
                    onChange={(value) => {
                      setFieldValue("phone", `+ ${value}`);
                    }}
                    value={values.phone}
                    inputClass="w-full py-2 px-4 rounded-8  placeholder-primary-300 text-primary-100 focus:outline-none bg-primary-700  rounded-8 bg-primary-700 px-4 h-6"
                    inputStyle={{
                      backgroundColor: "var(--color-primary-700)",
                      border: "none",
                    }}
                    dropdownClass="rounded-8 phone placeholder-primary-300 text-primary-100 focus:outline-none bg-primary-700  rounded-8 bg-primary-700"
                    dropdownStyle={{
                      backgroundColor: "var(--color-primary-800)",
                      borderColor: "gray",
                      border: "none",
                    }}
                    country="bo"
                    specialLabel=""
                    inputProps={{
                      FocusEvent: "outline-none",
                      name: "phone",
                    }}
                  />
                </div>

                <div className={`flex col-span-3 bg-primary-700 rounded-8`}>
                  <InputField
                    className={`h-11 col-span-3 w-full`}
                    name="direction"
                    placeholder="Direcci??n"
                    rows={3}
                    maxLength={500}
                    textarea
                  />
                </div>
                <div
                  className={`flex pt-2 space-x-3 col-span-full items-center`}
                >
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    className={`mr-3`}
                  >
                    Registrar
                  </Button>
                  <ButtonLink type="button" onClick={onRequestClose}>
                    Cancelar
                  </ButtonLink>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
