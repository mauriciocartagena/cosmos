import React from "react";
import { LeftPanel } from "../../components/Dashboard/LeftPanel";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { RightPanel } from "../../components/Dashboard/rightPanel";
import { MainLayout } from "./MainLayout";
interface DefaultDesktopLayoutProps {
  mobileHeader?: React.ReactNode;
}
export const DefaultDesktopLayout: React.FC<DefaultDesktopLayoutProps> = ({
  children,
  mobileHeader = undefined,
}) => {
  return (
    <WaitForWsAndAuth>
      <MainLayout
        leftPanel={<LeftPanel />}
        rightPanel={<RightPanel />}
        mobileHeader={mobileHeader}
      >
        {children}
      </MainLayout>
    </WaitForWsAndAuth>
  );
};
