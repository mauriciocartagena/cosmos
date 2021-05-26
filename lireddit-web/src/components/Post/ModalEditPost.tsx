import { Center, Image } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { Button } from "../../form-fields/Button";
import { InputField } from "../../form-fields/InputField";
import {
  useSingleUploadMutation,
  useUpdatePostMutation,
} from "../../generated/graphql";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { NativeSelect } from "../../ui/NativeSelect";
import { withApollo } from "../../utils/withApollo";
interface ModalEditPost {
  onRequestClose: () => void;
  id: number;
  title: string;
  subtitle: string;
  description: string;
  type: string;
  urlImage: string;
}

const ModalEditPost: React.FC<ModalEditPost> = ({
  onRequestClose,
  id,
  title,
  subtitle,
  description,
  type,
  urlImage,
}) => {
  const [dataFile, setDataFile] = useState<any>();

  const [updatedPost] = useUpdatePostMutation();

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
          title: title,
          subtitle: subtitle,
          description: description,
          type: type,
          url: urlImage,
        }}
        onSubmit={async (values) => {
          setLoading(true);

          if (dataFile) {
            const result = await fileUpload({
              variables: {
                file: dataFile,
              },
            });
            await updatedPost({
              variables: {
                id: id,
                title: values.title,
                description: values.description,
                subtitle: values.subtitle,
                type: values.type,
                url: result.data?.singleUpload.url!,
              },
              update: (cache) => {
                cache.evict({ id: "Post:" + id });
              },
            });
            onRequestClose();
            setLoading(false);
          } else {
            await updatedPost({
              variables: {
                id: id,
                title: values.title,
                description: values.description,
                subtitle: values.subtitle,
                type: values.type,
                url: urlImage,
              },
              update: (cache) => {
                cache.evict({ id: "Post:" + id });
              },
            });
            onRequestClose();
            setLoading(false);
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className={`grid grid-cols-3 gap-4 focus:outline-none w-full`}>
            <div className={`col-span-3 block`}>
              <h4 className={`mb-2 text-primary-100`}>Editar Post</h4>
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
              <NativeSelect
                value={values.type}
                onChange={(e) => {
                  setFieldValue("type", e.target.value);
                }}
              >
                <option value="imagen" className={`hover:bg-primary-900`}>
                  Imagen
                </option>
                <option value="video" className={`hover:bg-primary-900`}>
                  video
                </option>
              </NativeSelect>
            </div>

            <div className={`h-11 w-full col-span-3`}>
              <InputField
                className={`w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none`}
                name="subtitle"
                maxLength={60}
                placeholder={"Subtitulo"}
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className={`h-full w-full col-span-3 rounded-8`}>
              <Center>
                {type === "video" ? (
                  <div className="player-wrapper-edit">
                    <ReactPlayer
                      className="react-player-edit"
                      url={urlImage}
                      controls
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : (
                  <Image
                    fallbackSrc={IMAGE_DEFAULT}
                    style={{ height: 240 }}
                    className={`rounded-8`}
                    src={urlImage}
                  />
                )}
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

export default withApollo({ ssr: false })(ModalEditPost);
