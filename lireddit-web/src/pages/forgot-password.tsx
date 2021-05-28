import { Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React, { useState } from "react";
import { Button } from "../form-fields/Button";
import { InputField } from "../form-fields/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import SvgSolidLogo from "../icons/SvgSolidLogo";
import { FooterController } from "../modules/display/FooterController";
import { HeaderController } from "../modules/display/HeaderController";
import { withApollo } from "../utils/withApollo";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [sendEmail] = useForgotPasswordMutation();
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
                await sendEmail({ variables: values });
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
      <FooterController />
    </div>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
