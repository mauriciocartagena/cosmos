import { Center } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Image } from "@chakra-ui/react";
import { Button } from "../../form-fields/Button";
import { InputField } from "../../form-fields/InputField";
import {
  useUpdatedUserAccountMutation,
  useSingleUploadMutation,
} from "../../generated/graphql";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { withApollo } from "../../utils/withApollo";
import { useState } from "react";

interface ModalEditUser {
  onRequestClose: () => void;
  id: number;
  username: string;
  email: string;
  urlImage: string;
}

const ModalEditUser: React.FC<ModalEditUser> = ({
  onRequestClose,
  id,
  username,
  email,
  urlImage,
}) => {
  const [dataFile, setDataFile] = useState<any>();

  const [updatedUser] = useUpdatedUserAccountMutation();

  const [loading, setLoading] = useState(false);

  const [fileUpload] = useSingleUploadMutation();

  const onChange = async ({
    target: {
      validity,
      files: [file],
    },
  }: any) => validity.valid && setDataFile(file);
  const IMAGE_DEFAULT =
    "https://fotos.perfil.com//2019/11/22/900/0/tesla-cybertruck-807820.jpg";

  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Formik
        initialValues={{
          username: username,
          url: urlImage,
          email: email,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          if (dataFile) {
            const result = await fileUpload({
              variables: {
                file: dataFile,
              },
            });
            await updatedUser({
              variables: {
                id: id,
                username: values.username,
                email: values.email,
                url: result.data?.singleUpload.url!,
              },
              update: (cache) => {
                cache.evict({
                  id: "ROOT_QUERY",
                  fieldName: "fetchUser",
                });
                cache.evict({
                  id: "ROOT_QUERY",
                  fieldName: "me",
                });
              },
            });
            onRequestClose();
            setLoading(false);
          } else {
            await updatedUser({
              variables: {
                id: id,
                username: values.username,
                email: values.email,
                url: values.url,
              },
              update: (cache) => {
                cache.evict({
                  id: "ROOT_QUERY",
                  fieldName: "fetchUser",
                });
                cache.evict({
                  id: "ROOT_QUERY",
                  fieldName: "me",
                });
              },
            });
            onRequestClose();
            setLoading(false);
          }
        }}
      >
        <Form className={`grid grid-cols-3 gap-4 focus:outline-none w-full`}>
          <div className={`col-span-3 block`}>
            <h4 className={`mb-2 text-primary-100`}>Editar usuario</h4>
            <div className={`text-primary-300`}>
              Por favor usar información verdadera
            </div>
          </div>

          <div className={`h-11 w-full col-span-3`}>
            <InputField
              className={`w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none`}
              name="username"
              maxLength={60}
              placeholder={"Usuario"}
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className={`h-11 w-full col-span-3`}>
            <InputField
              className={`w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none`}
              name="email"
              maxLength={60}
              placeholder={"Email"}
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className={`h-full w-full col-span-3 rounded-8`}>
            <Center>
              <Image
                fallbackSrc={IMAGE_DEFAULT}
                style={{ height: 240 }}
                className={`rounded-8`}
                src={urlImage}
              />
            </Center>
          </div>
          <div className={`h-full w-full col-span-3`}>
            <InputField
              className={`w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none`}
              name="urlImage"
              onChangeCapture={onChange}
              type="file"
            />
          </div>

          <div className={`flex pt-2 space-x-3 col-span-full items-center`}>
            <Button type="submit" className={`mr-3`} loading={loading}>
              Editar
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

export default withApollo({ ssr: false })(ModalEditUser);
