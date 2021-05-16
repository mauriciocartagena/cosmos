import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../../form-fields/InputField";
import { useUpdatedPartnerMutation } from "../../generated/graphql";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { toErrorMapParnert } from "../../utils/toErrorMapParnert";
import PhoneInput from "react-phone-input-2";
import { withApollo } from "../../utils/withApollo";
import { useIsAuth } from "../../utils/useIsAuth";

interface EditPartnerModal {
  onRequestClose: () => void;
  id: number;
  name: string;
  first_last_name: string;
  second_last_name: string;
  phone: string;
  direction: string;
}
const EditPartnerModal: React.FC<EditPartnerModal> = ({
  onRequestClose,
  id,
  name,
  first_last_name,
  second_last_name,
  phone,
  direction,
}) => {
  useIsAuth();
  const [updatedPartner] = useUpdatedPartnerMutation();
  const [changePhone, setChangePhone] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Formik
        initialValues={{
          name: name,
          first_last_name: first_last_name,
          second_last_name: second_last_name,
          phone: phone,
          direction: direction,
        }}
        onSubmit={async (values, { setErrors }) => {
          setLoading(true);
          const response = await updatedPartner({
            variables: { id: id, input: values },
            update: (cache) => {
              // cache.evict({ id: "People:" + id });
              cache.evict({ fieldName: "partners:{}" });
            },
          });
          response.data?.updatedPartner.errors;
          if (response.data?.updatedPartner.errors) {
            setErrors(toErrorMapParnert(response.data?.updatedPartner.errors));
            setLoading(false);
          } else if (response.data?.updatedPartner.people) {
            // worked;
            onRequestClose();
            setLoading(false);
          }
        }}
      >
        {(props) => (
          <Form
            className={`grid grid-cols-2 gap-4 focus:outline-none w-full`}
            onSubmit={props.handleSubmit}
            onChange={() => {
              props.values.phone = changePhone;
            }}
          >
            <div className={`col-span-3 block`}>
              <h4 className={`mb-2 text-primary-100`}>Editar Socio</h4>
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
                onChange={(e) => {
                  setChangePhone(`+ ${e}`);
                }}
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
                value={phone}
                country="bo"
                specialLabel=""
                inputProps={{
                  FocusEvent: "outline-none",
                }}
              />
            </div>
            <div className={`flex col-span-3 bg-primary-700 rounded-8`}>
              <InputField
                className={`h-11 col-span-3 w-full`}
                name="direction"
                placeholder="Dirección"
                rows={3}
                autoComplete="off"
                maxLength={500}
                textarea
              />
            </div>

            <div className={`flex pt-2 space-x-3 col-span-full items-center`}>
              <Button loading={loading} type="submit" className={`mr-3`}>
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
export default withApollo({ ssr: false })(EditPartnerModal);
