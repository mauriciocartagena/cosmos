import router from "next/router";
import React from "react";
import { SolidHome, SolidNew, SolidPlus, SolidUser } from "../../icons";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { MainInnerGrid } from "../../ui/MainGrid";
import AccountOverlay from "../../ui/mobile/AccountOverlay";
import { ProfileHeader } from "../../ui/mobile/MobileHeader";
import { MobileNav } from "../../ui/mobile/MobileNav";
import { LeftPanel, RightPanel } from "./GridPanels";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
interface MainLayoutProps {
  leftPanel?: React.ReactNode;
  tabletSidebar?: React.ReactNode;
  rightPanel?: React.ReactNode;
  plusButtonURL?: string;
  mobileHeader?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel = <div />,
  rightPanel = <div />,
  plusButtonURL,
  mobileHeader,
}) => {
  const screenType = useScreenType();

  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  const mHeader = mobileHeader || (
    <ProfileHeader
      avatar={
        loading! && data
          ? data?.me?.url!
          : "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f47d4de7637290765bce495%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1398%26cropX2%3D3908%26cropY1%3D594%26cropY2%3D3102"
      }
      onSearchClick={() => router.push("/search")}
    />
  );

  const items = [
    { icon: <SolidHome />, targetPath: `/dasboard` },
    { icon: <SolidNew />, targetPath: "/post" },
    { icon: <SolidUser />, targetPath: `/account` },
  ];

  if (plusButtonURL) {
    items.push({ icon: <SolidPlus />, targetPath: plusButtonURL });
  }

  let middle = null;
  let prepend = null;

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
          <LeftPanel>{}</LeftPanel>
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
      prepend = (
        <>
          {mHeader}
          <MobileNav items={items}></MobileNav>
        </>
      );
      middle = (
        <>
          {children}
          {!loading ? <AccountOverlay /> : null}
        </>
      );
      break;
  }

  return (
    <>
      <div className={`fixed left-0 w-full z-10`} style={{ top: 0 }}>
        {prepend}
      </div>
      <div
        className={`flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700 ${
          prepend ? "mt-8 mb-7" : ""
        }`}
      >
        <MainInnerGrid>{middle}</MainInnerGrid>
      </div>
    </>
  );
};
