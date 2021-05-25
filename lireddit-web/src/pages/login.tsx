import { Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import router from "next/router";
import React from "react";
import { Button } from "../form-fields/Button";
import { InputField } from "../form-fields/InputField";
import { useLoginMutation } from "../generated/graphql";
import SvgSolidLogo from "../icons/SvgSolidLogo";
import { FooterController } from "../modules/display/FooterController";
import { HeaderController } from "../modules/display/HeaderController";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface LoginButtonProps {}

const Login: React.FC<LoginButtonProps> = ({}) => {
  const [login] = useLoginMutation();

  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateRows: "1fr auto 1fr",
      }}
    >
      <HeaderController embed={{}} title="Login" />
      <div className="hidden sm:flex" />
      <div className="justify-self-center self-center sm:hidden">
        <SvgSolidLogo />
      </div>
      <div className="m-auto flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 z-10 sm:w-400 w-full">
        <div className="gap-2 flex-col">
          <span className="text-3xl text-primary-100 font-bold">
            Bienvenido
          </span>
          <div className="flex-col gap-4">
            <Formik
              initialValues={{
                usernameOrEmail: "",
                password: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await login({ variables: values });
                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user) {
                  // worked
                  if (typeof router.query.next === "string") {
                    // router.replace( router.query.next )
                    router.push(`${router.query.next}`);
                  } else {
                    router.push("/dasboard");
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className={`flex-col w-full`}>
                  <InputField
                    className={`mb-4`}
                    name="usernameOrEmail"
                    placeholder="Usuario o email"
                    label="Usuario o email"
                  />
                  <InputField
                    className={`mb-4`}
                    name="password"
                    placeholder="Contraseña"
                    label="Contraseña"
                    type="password"
                  />
                  <Flex ml="auto" className="mb-2 text-primary-300">
                    <NextLink href="/forgot-password">
                      Olvidaste tu contraseña?
                    </NextLink>
                  </Flex>

                  <div className={`flex pt-2 items-center`}>
                    <Button
                      loading={isSubmitting}
                      type="submit"
                      className={`mr-3`}
                    >
                      Inicia sesión
                    </Button>
                  </div>
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
export default withApollo({ ssr: false })(Login);
