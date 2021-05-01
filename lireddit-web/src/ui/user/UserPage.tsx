import React from "react";
import { MiddlePanel } from "../../modules/GridPanels";
import { PageComponent } from "../../types/PageComponent";

interface UserPageProps {}

export const UserPage: PageComponent<UserPageProps> = ({}) => {
  return <MiddlePanel></MiddlePanel>;
};

UserPage.ws = true;
