import React from "react";
import { Story } from "@storybook/react";

import LeftHeader, { LeftHeaderProps } from "../header/LeftHeader";

export default {
  title: "LeftHeader",
  component: LeftHeader,
};

export const Main: Story<LeftHeaderProps> = () => <LeftHeader />;

Main.bind({});
