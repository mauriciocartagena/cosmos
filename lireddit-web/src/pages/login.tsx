import React from "react";
import { Form, Formik } from "formik";
import { InputField } from "../form-fields/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { Button } from "../form-fields/Button";
import SvgSolidInstagram from "../icons/SolidInstagram";
import { SvgSolidFacebook } from "../icons";
import SvgSolidLogo from "../icons/SvgSolidLogo";
import { HeaderController } from "../modules/display/HeaderController";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { Flex } from "@chakra-ui/react";

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  const [, login] = useLoginMutation();

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
                const response = await login(values);

                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user) {
                  // worked
                  router.push("/dasboard");
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

export default withUrqlClient(createUrqlClient)(Login);
