import React from "react";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { MainInnerGrid } from "../../ui/MainGrid";
import { LeftPanel, RightPanel } from "./GridPanels";
// import { TabletSidebar } from "./TabletSidebar";

interface MainLayoutProps {
  tabletSidebar?: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const DesktopLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel = <div />,
  rightPanel = <div />,
  // tabletSidebar = <TabletSidebar />,
}) => {
  const screenType = useScreenType();

  let middle = null;

  switch (screenType) {
    case "3-cols":
      middle = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "2-cols":
      middle = (
        <>
          <LeftPanel>{<div></div>}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "1-cols":
      middle = (
        <>
          <LeftPanel>{}</LeftPanel>
          {children}
        </>
      );
      break;
    case "fullscreen":
      middle = <>{children}</>;
  }

  return (
    <>
      <div
        className={
          // "default-desktop-layout flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700"
          "flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700"
        }
      >
        <MainInnerGrid>{middle}</MainInnerGrid>
      </div>
    </>
  );
};
