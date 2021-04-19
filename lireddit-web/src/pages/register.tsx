import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useCreateUserMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  const [, register] = useCreateUserMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          username: "",
          password: "",
          name: "",
          first_last_name: "",
          second_last_name: "",
          phone: 87,
          direction: "",
          email: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);

          if (response.data?.createUser.errors) {
            setErrors(toErrorMap(response.data.createUser.errors));
          } else if (response.data?.createUser.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="password"
                type="password"
              />
              <InputField name="name" placeholder="name" label="name" />
              <InputField
                name="first_last_name"
                placeholder="first_last_name"
                label="first_last_name"
              />
              <InputField
                name="second_last_name"
                placeholder="second_last_name"
                label="second_last_name"
              />
              <InputField name="phone" placeholder="phone" label="phone" />
              <InputField
                name="direction"
                placeholder="direction"
                label="direction"
              />
              <InputField
                name="email"
                placeholder="email"
                label="email"
                type="email"
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              colorScheme="blue"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
