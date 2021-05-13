import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../../form-fields/InputField";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { useCreatePartnerMutation } from "../../generated/graphql";
import { useState } from "react";
import { toErrorMapParnert } from "../../utils/toErrorMapParnert";

interface CreatePartnerModal {
  onRequestClose: () => void;
}

export const CreatePartnerModal: React.FC<CreatePartnerModal> = ({
  onRequestClose,
}) => {
  const [register] = useCreatePartnerMutation();
  const [loading, setLoading] = useState(false);
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
          setLoading(true);

          const response = await register({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "parnets:{}" });
            },
          });
          // response.data.createPartner.errors
          if (response.data?.createPartner.errors) {
            setErrors(toErrorMapParnert(response.data.createPartner.errors));
            setLoading(false);
          } else if (response.data?.createPartner.people) {
            // worked
            onRequestClose();
            setLoading(false);
          }
        }}
      >
        {(props) => (
          <Form
            className={`grid grid-cols-2 gap-4 focus:outline-none w-full`}
            onSubmit={props.handleSubmit}
          >
            <div className={`col-span-3 block`}>
              <h4 className={`mb-2 text-primary-100`}>Registrar Socio</h4>
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
              <InputField
                className={`rounded-8 bg-primary-700 px-4 h-6`}
                name="phone"
                placeholder={"Celular"}
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className={`flex col-span-3 bg-primary-700 rounded-8`}>
              <InputField
                className={`h-11 col-span-3 w-full`}
                name="direction"
                placeholder="Dirección"
                rows={3}
                maxLength={500}
                textarea
              />
            </div>
            <div className={`flex pt-2 space-x-3 col-span-full items-center`}>
              <Button loading={loading} type="submit" className={`mr-3`}>
                Registrar
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
