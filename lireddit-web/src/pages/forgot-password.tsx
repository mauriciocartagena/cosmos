import { Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../form-fields/InputField";
import { Button } from "../form-fields/Button";
import { SvgSolidFacebook } from "../icons";
import SvgSolidInstagram from "../icons/SolidInstagram";
import SvgSolidLogo from "../icons/SvgSolidLogo";
import { HeaderController } from "../modules/display/HeaderController";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useForgotPasswordMutation } from "../generated/graphql";
import router from "next/router";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateRows: "1fr auto 1fr",
      }}
    >
      <HeaderController embed={{}} title="Change password" />
      <div className="hidden sm:flex" />
      <div className="justify-self-center self-center sm:hidden">
        <SvgSolidLogo />
      </div>
      <div className="m-auto flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 z-10 sm:w-400 w-full">
        <div className="gap-2 flex-col">
          <span className="text-3xl text-primary-100 font-bold">
            {!complete ? "Cambiar contraseña" : null}
          </span>
          <div className="flex-col gap-4">
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={async (values) => {
                await forgotPassword(values);
                setComplete(true);
              }}
            >
              {({ isSubmitting }) =>
                complete ? (
                  <>
                    <Box className="mb-2 text-primary-300">
                      Si existe una cuenta con ese correo electrónico, le
                      enviamos un correo electrónico
                    </Box>
                    <div className={`flex pt-2 items-center`}>
                      <Button
                        onClick={() => router.push("/")}
                        loading={isSubmitting}
                        type="submit"
                        className={`mr-3`}
                      >
                        Volver
                      </Button>
                    </div>
                  </>
                ) : (
                  <Form className={`flex-col w-full`}>
                    <InputField
                      className={`mb-4`}
                      name="email"
                      placeholder="email"
                      type="email"
                      label="Email"
                    />

                    <div className={`flex pt-2 items-center`}>
                      <Button
                        loading={isSubmitting}
                        type="submit"
                        className={`mr-3`}
                      >
                        Enviar a mi email
                      </Button>
                    </div>
                  </Form>
                )
              }
            </Formik>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
        <div className="hidden sm:flex">
          <SvgSolidLogo />
        </div>
        <div className="gap-6 text-primary-300">
          <a
            href="https://youtu.be/dQw4w9WgXcQ"
            className="hover:text-primary-200"
          >
            Privacy policy
          </a>
          <a
            href="https://www.youtube.com/watch?v=Soa3gO7tL-c&list=RDSoa3gO7tL-c&start_radio=1"
            className="hover:text-primary-200"
          >
            Report a bug
          </a>
          <div className="gap-6 sm:gap-4">
            <a
              href="https://github.com/mauriciocartagena"
              target="_blank"
              rel="noreferrer"
            >
              <SvgSolidFacebook
                width={20}
                height={20}
                className="cursor-pointer hover:text-primary-200"
              />
            </a>
            <a
              href="https://github.com/mauriciocartagena"
              target="_blank"
              rel="noreferrer"
            >
              <SvgSolidInstagram
                width={20}
                height={20}
                className="hover:text-primary-200"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
