import React, { useState } from "react";
import { NextPage } from "next";
import { HeaderController } from "../../modules/display/HeaderController";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../../form-fields/InputField";
import { SvgSolidFacebook } from "../../icons";
import SvgSolidInstagram from "../../icons/SolidInstagram";
import SvgSolidLogo from "../../icons/SvgSolidLogo";
import { toErrorMap } from "../../utils/toErrorMap";
import { Button } from "../../form-fields/Button";
import { useChangePasswordMutation } from "../../generated/graphql";
import { Box, Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();

  const [tokenError, setTokenError] = useState("");

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
            Cambiar Contraseña
          </span>
          <div className="flex-col gap-4">
            <Formik
              initialValues={{
                newPassword: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await changePassword({
                  newPassword: values.newPassword,
                  token,
                });
                if (response.data?.changePassword.errors) {
                  const errorMap = toErrorMap(
                    response.data.changePassword.errors
                  );

                  if ("token" in errorMap) {
                    setTokenError(errorMap.token);
                  }

                  setErrors(errorMap);
                } else if (response.data?.changePassword.user) {
                  // worked
                  router.push("/dasboard");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className={`flex-col w-full`}>
                  <InputField
                    className={`mb-4`}
                    name="newPassword"
                    placeholder="Nueva contraseña"
                    label="Nueva Contraseña"
                    type="password"
                  />
                  {tokenError ? (
                    <>
                      <Flex>
                        <Box
                          mr={"auto"}
                          className={` text-primary-100 text-base font-bold border-b-2 border-primary-900 transition hover:border-accent focus:outline-no-chrome border-accent text-accent`}
                        >
                          {tokenError}
                        </Box>
                      </Flex>
                    </>
                  ) : null}

                  {tokenError ? (
                    <div className={`flex pt-2 items-center`}>
                      <Button
                        loading={isSubmitting}
                        onClick={() => router.push("/forgot-password")}
                        type="submit"
                        className={`mr-8`}
                      >
                        Volver a enviar
                      </Button>
                    </div>
                  ) : (
                    <div className={`flex pt-2 items-center`}>
                      <Button
                        loading={isSubmitting}
                        onClick={() => {}}
                        type="submit"
                        className={`mr-8`}
                      >
                        Cambiar contraseña
                      </Button>
                    </div>
                  )}
                </Form>
              )}
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

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  ChangePassword as any
);
