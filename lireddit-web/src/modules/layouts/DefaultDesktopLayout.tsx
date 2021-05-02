import React from "react";
import { DesktopLayout } from "./DesktopLayout";

interface DefaultDesktopLayoutProps {}

export const DefaultDesktopLayout: React.FC<DefaultDesktopLayoutProps> = ({
  children,
}) => {
  return <DesktopLayout>{children}</DesktopLayout>;
};
