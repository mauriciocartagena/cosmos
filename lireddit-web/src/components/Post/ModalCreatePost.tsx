import { Form, Formik } from "formik";
import React from "react";
import { Button } from "../../form-fields/Button";
import { InputField } from "../../form-fields/InputField";
import {
  useCreatePostMutation,
  useSingleUploadMutation,
} from "../../generated/graphql";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { NativeSelect } from "../../ui/NativeSelect";
import { withApollo } from "../../utils/withApollo";
import { useState } from "react";

interface ModalCreatePost {
  onRequestClose: () => void;
}

const ModalCreatePost: React.FC<ModalCreatePost> = ({ onRequestClose }) => {
  const [dataFile, setDataFile] = useState<any>();

  const [createPost] = useCreatePostMutation();

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
          title: "",
          subtitle: "",
          description: "",
          type: "image",
          url: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          const result = await fileUpload({
            variables: {
              file: dataFile,
            },
          });
          const { errors } = await createPost({
            variables: {
              input: {
                title: values.title,
                description: values.description,
                subtitle: values.subtitle,
                type: values.type,
                url: result.data?.singleUpload.url!,
              },
            },
            update: (cache) => {
              cache.evict({ fieldName: "posts:{}" });
            },
          });
          if (!errors) {
            setLoading(true);
            onRequestClose();
          }
        }}
      >
        <Form className={`grid grid-cols-3 gap-4 focus:outline-none w-full`}>
          <div className={`col-span-3 block`}>
            <h4 className={`mb-2 text-primary-100`}>Crear nuevo post</h4>
            <div className={`text-primary-300`}>
              Por favor usar información verdadera
            </div>
          </div>
          <div className={`flex h-full w-full col-span-2`}>
            <InputField
              className={`w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none`}
              name="title"
              maxLength={60}
              placeholder={"Titulo"}
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className={`grid items-start grid-cols-1 h-6`}>
            <NativeSelect value={"Hola"} name="type">
              <option
                value="public"
                id="image"
                className={`hover:bg-primary-900`}
              >
                Imagen
              </option>
              <option
                value="private"
                id="video"
                className={`hover:bg-primary-900`}
              >
                Video
              </option>
            </NativeSelect>
          </div>

          <div className={`h-full w-full col-span-3`}>
            <InputField
              className={`w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none`}
              name="subtitle"
              maxLength={60}
              placeholder={"Subtitulo"}
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
          <div className={`flex col-span-3 bg-primary-700 rounded-8`}>
            <InputField
              className={`h-11 col-span-3 w-full`}
              name="description"
              rows={3}
              maxLength={600}
              placeholder={"Descripción"}
              textarea
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

export default withApollo({ ssr: false })(ModalCreatePost);
