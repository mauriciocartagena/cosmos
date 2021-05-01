import React from "react";
import { DesktopLayout } from "./DesktopLayout";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";

interface DefaultDesktopLayoutProps {}

export const DefaultDesktopLayout: React.FC<DefaultDesktopLayoutProps> = ({
  children,
}) => {
  return (
    <WaitForWsAndAuth>
      <DesktopLayout>{children}</DesktopLayout>
    </WaitForWsAndAuth>
  );
};
