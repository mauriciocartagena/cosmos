import { Form, Formik } from "formik";
import React from "react";
import { Button } from "../../form-fields/Button";
import { InputField } from "../../form-fields/InputField";
import { useSingleUploadMutation } from "../../generated/graphql";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { withApollo } from "../../utils/withApollo";
import { useState } from "react";
import { useCreateUserMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

interface ModalCreatePost {
  onRequestClose: () => void;
}

const ModalCreateUser: React.FC<ModalCreatePost> = ({ onRequestClose }) => {
  const [dataFile, setDataFile] = useState<any>();

  const [createUser] = useCreateUserMutation();

  const [loading, setLoading] = useState(false);

  const [fileUpload] = useSingleUploadMutation();

  const onChange = async ({
    target: {
      validity,
      files: [file],
    },
  }: any) => validity.valid && setDataFile(file);

  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
          url: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          setLoading(true);

          if (dataFile) {
            const result = await fileUpload({
              variables: {
                file: dataFile,
              },
            });
            const { errors } = await createUser({
              variables: {
                options: {
                  name: "tu nombre",
                  first_last_name: "tu primer apellido",
                  second_last_name: "Tu segundo apellido",
                  phone: "7897897",
                  direction: "tu direccion",
                  username: values.username,
                  password: values.password,
                  email: values.email,
                  url: result.data?.singleUpload.url!,
                },
              },
            });
            if (!errors) {
              setLoading(true);
              onRequestClose();
            }
          } else {
            const response = await createUser({
              variables: {
                options: {
                  name: "tu nombre",
                  first_last_name: "tu primer apellido",
                  second_last_name: "Tu segundo apellido",
                  phone: "7897897",
                  direction: "tu direccion",
                  username: values.username,
                  password: values.password,
                  email: values.email,
                  url: "",
                },
              },
            });
            if (response.data?.createUser.errors) {
              setErrors(toErrorMap(response.data.createUser.errors));
              setLoading(false);
            } else if (response.data?.createUser.user) {
              // worked
              onRequestClose();
              setLoading(false);
            }
          }
        }}
      >
        <Form className={`grid grid-cols-3 gap-4 focus:outline-none w-full`}>
          <div className={`col-span-3 block`}>
            <h4 className={`mb-2 text-primary-100`}>Crear nuevo usuario</h4>
            <div className={`text-primary-300`}>
              Por favor usar información verdadera
            </div>
          </div>
          <div className={`flex h-full w-full col-span-3`}>
            <InputField
              className={`w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none`}
              name="username"
              maxLength={60}
              placeholder={"Username"}
              autoFocus
              autoComplete="off"
            />
          </div>

          <div className={`h-full w-full col-span-3`}>
            <InputField
              className={`w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none`}
              name="password"
              type="password"
              maxLength={60}
              placeholder={"Contraseña"}
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className={`h-full w-full col-span-3`}>
            <InputField
              className={`w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none`}
              name="email"
              type="email"
              maxLength={60}
              placeholder={"Email"}
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className={`h-full w-full col-span-3`}>
            <InputField
              className={`w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none`}
              name="url"
              onChangeCapture={onChange}
              type="file"
            />
          </div>
          <div className={`flex pt-2 space-x-3 col-span-full items-center`}>
            <Button type="submit" className={`mr-3`} loading={loading}>
              Crear
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

export default withApollo({ ssr: false })(ModalCreateUser);
