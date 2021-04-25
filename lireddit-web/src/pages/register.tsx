import { withUrqlClient } from "next-urql";
import React from "react";
import { NavBar } from "../components/NavBar";
import { HeaderController } from "../modules/display/HeaderController";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <>
      <HeaderController embed={{}} title="Dasboard" />
      <NavBar />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);
