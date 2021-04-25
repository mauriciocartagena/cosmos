import {
  Menu,
  MenuButton,
  Wrap,
  WrapItem,
  MenuList,
  Flex,
  Link,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import SvgIcon from "../icons/LogoIcon";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { SettingsIcon } from "../ui/SettingsIcon";
import { SingleUser } from "../ui/UserAvatar/SingleUser";
import { SolidBug, SolidUser } from "../icons";
import { isServer } from "../utils/isServer";
import { LoginButton } from "../utils/LoginButton";
import SvgSolidNew from "../icons/SolidNew";
import router from "next/router";
import { CreatePartnerModal } from "../modules/dashboard/CreatePartnerModal";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [_, logout] = useLogoutMutation();
  const [roomModal, setRoomModal] = useState(false);

  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  // data is loading
  if (fetching) {
    body = null;

    // user not logged in
  } else if (!data?.me) {
    <div>Loading...</div>;
    //user is logged in
  } else {
    body = (
      <>
        <NextLink href="/">
          <Link>
            <Heading fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
              <SvgIcon />
            </Heading>
          </Link>
        </NextLink>
        <div className="flex-1 justify-center w-full">
          <div className="ml-4">
            <div
              className={`w-full bg-primary-700 text-primary-300 focus-within:text-primary-100 rounded-lg `}
            >
              {/* <div className="h-full mx-4 flex items-center pointer-events-none"> */}
              <LoginButton
                onClick={() => {
                  setRoomModal(true);
                }}
              >
                <SvgSolidNew width={20} height={20} />
                Crear nuevo socio
              </LoginButton>
            </div>
          </div>
        </div>
        <Flex ml={"auto"}>
          <Menu>
            <MenuButton justifyContent="center">
              <Wrap>
                <WrapItem>
                  <SingleUser
                    src={"https://i.redd.it/q9cov32d2bq51.jpg"}
                    size="md"
                  />
                </WrapItem>
              </Wrap>
            </MenuButton>
            <MenuList className="flex flex-col" style={{ width: 200 }}>
              <div
                className="flex flex-col w-full text-primary-100 rounded-8 bg-primary-800 border border-primary-700 overflow-hidden relative"
                data-testid="base-overlay"
              >
                <a
                  href="https://www.youtube.com/watch?v=FGBhQbmPwH8"
                  rel="noreferrer"
                >
                  <SettingsIcon icon={<SolidUser />} label={"Perfil"} />
                </a>
                <a
                  href="https://github.com/mauriciocartagena"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SettingsIcon icon={<SolidBug />} label={"Report a bug"} />
                </a>

                <button
                  className="px-4 bg-primary-700 text-primary-100 outline-none font-bold"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 12,
                    borderRadius: "0 0 8px 8px",
                  }}
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              </div>
            </MenuList>
          </Menu>
        </Flex>

        {roomModal && (
          <CreatePartnerModal onRequestClose={() => setRoomModal(false)} />
        )}
      </>
    );
  }

  return (
    <Flex
      zIndex={1}
      position="sticky"
      w={[300, 400, 560]}
      top={0}
      bg="tan"
      p={4}
    >
      <Flex flex={1} m="auto" align="center" maxW={800}>
        {body}
      </Flex>
    </Flex>
  );
};
