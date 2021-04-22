import React from "react";
import { NavBar } from "../NavBar";
import { HeaderController } from "../../modules/display/HeaderController";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
  return (
    <>
      <HeaderController embed={{}} title="Dasboard" />
      <NavBar />;
    </>
  );
};
