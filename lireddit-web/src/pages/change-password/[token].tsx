import { Box, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "../../form-fields/Button";
import { InputField } from "../../form-fields/InputField";
import { useChangePasswordMutation } from "../../generated/graphql";
import SvgSolidLogo from "../../icons/SvgSolidLogo";
import { FooterController } from "../../modules/display/FooterController";
import { HeaderController } from "../../modules/display/HeaderController";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();

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
                  variables: {
                    newPassword: values.newPassword,
                    token:
                      typeof router.query.token === "string"
                        ? router.query.token
                        : "",
                  },
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
      <FooterController />
    </div>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
