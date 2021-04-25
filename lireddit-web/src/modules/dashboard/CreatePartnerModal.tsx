import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../../form-fields/InputField";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { toErrorMap } from "../../utils/toErrorMap";
import { useCreateUserMutation } from "../../generated/graphql";
import router from "next/router";

interface CreatePartnerModal {
  onRequestClose: () => void;
}

export const CreatePartnerModal: React.FC<CreatePartnerModal> = ({
  onRequestClose,
}) => {
  const [, register] = useCreateUserMutation();
  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Formik
        initialValues={{
          username: "",
          password: "",
          name: "",
          first_last_name: "",
          second_last_name: "",
          phone: 87,
          direction: "",
          email: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);

          if (response.data?.createUser.errors) {
            setErrors(toErrorMap(response.data.createUser.errors));
          } else if (response.data?.createUser.user) {
            // worked
            router.push("/");
          }
        }}
      >
        <Form className={`grid grid-cols-1 gap-4 focus:outline-none w-full`}>
          <div className={`col-span-3 block`}>
            <h4 className={`mb-2 text-primary-100`}>Registrar Socio</h4>
            <p className={`text-primary-300`}>
              Por favor llene cuidadosamente los datos
            </p>
          </div>
          <div className={`h-full w-full col-span-3`}>
            <InputField
              className={`rounded-8 bg-primary-700 px-4 h-6`}
              name="username"
              maxLength={60}
              placeholder={"Username"}
              autoFocus
              autoComplete="off"
            />
            &nbsp;
            <InputField
              className={`rounded-8 bg-primary-700 px-4 h-6`}
              name="password"
              type="password"
              maxLength={60}
              placeholder={"Password"}
              autoFocus
              autoComplete="off"
            />
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
            &nbsp;
            <InputField
              className={`rounded-8 bg-primary-700 px-4 h-6`}
              name="second_last_name"
              maxLength={60}
              placeholder={"Segundo apellido"}
              autoFocus
              autoComplete="off"
            />
            &nbsp;
          </div>
          <div className={`h-full w-full col-span-3`}>
            <InputField
              className={`rounded-8 bg-primary-700 px-4 h-6`}
              name="phone"
              placeholder="Celular"
              maxLength={500}
              textarea
            />
            &nbsp;
            <InputField
              className={`rounded-8 bg-primary-700 px-4 h-6`}
              name="email"
              type="email"
              maxLength={60}
              placeholder={"Email"}
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className={`col-span-3 bg-primary-700 rounded-8`}>
            <InputField
              className={`px-3 h-11 col-span-3 w-full`}
              name="direccion"
              placeholder="Dirección"
              rows={3}
              maxLength={500}
              textarea
            />
          </div>

          <div className={`flex pt-2 space-x-3 col-span-full items-center`}>
            <Button type="submit" className={`mr-3`}>
              Registrar
            </Button>
            <ButtonLink type="button" onClick={onRequestClose}>
              Cancelar
            </ButtonLink>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};
