import { Form, Formik } from "formik";
import React from "react";
import { Button } from "../../form-fields/Button";
import { InputField } from "../../form-fields/InputField";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";

interface ModalCreatePost {
  onRequestClose: () => void;
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tipo: number;
  url: string;
}

export const ModalCreatePost: React.FC<ModalCreatePost> = ({
  onRequestClose,
  id,
  title,
  subtitle,
  description,
  tipo,
  url,
}) => {
  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Formik
        initialValues={{
          title: title,
          subtitle: subtitle,
          description: description,
          tipo: tipo,
          url: url,
        }}
        onSubmit={() => {}}
      >
        <Form className={`grid grid-cols-1 gap-4 focus:outline-none w-full`}>
          <div className={`col-span-3 block`}>
            <h4 className={`mb-2 text-primary-100`}>Crear nuevo post</h4>
            <div className={`text-primary-300`}>
              Por favor usar información verdadera
            </div>
          </div>
          <div className={`h-full w-full col-span-3`}>
            <InputField
              className={`rounded-8 bg-primary-700 px-4 h-6`}
              name="title"
              maxLength={60}
              placeholder={"Titulo"}
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className={`h-full w-full col-span-3`}>
            <InputField
              className={`rounded-8 bg-primary-700 px-4 h-6`}
              name="subtitle"
              maxLength={60}
              placeholder={"Subtitulo"}
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className={`h-full w-full col-span-3`}>
            <InputField
              className={`rounded-8 bg-primary-700 px-4 h-6`}
              name="description"
              maxLength={60}
              placeholder={"Descripción"}
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className={`h-full w-full col-span-3`}>
            <InputField
              className={`rounded-8 bg-primary-700 px-4 h-6`}
              name="url"
              placeholder="URL de la Imagen"
              maxLength={60}
            />
          </div>
          <div className={`flex pt-2 space-x-3 col-span-full items-center`}>
            <Button type="submit" className={`mr-3`}>
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
