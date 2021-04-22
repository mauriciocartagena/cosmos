import {
  Menu,
  MenuButton,
  Wrap,
  WrapItem,
  Avatar,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Box,
  Flex,
  Link,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import SvgIcon from "../icons/LogoIcon";
import { Button } from "../form-fields/Button";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import SvgSolidBug from "../icons/SolidBug";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [_, logout] = useLogoutMutation();

  const [{ data, fetching }] = useMeQuery();

  let body = null;

  // data is loading
  if (fetching) {
    body = null;

    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/">
          <Link>
            <Heading fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
              <SvgIcon />
            </Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>
          <Flex align="center">
            {/* <NextLink href="/create-post">
      <Button as={Link} mr={4}>
        create post
      </Button>
    </NextLink> */}
            <Menu>
              <MenuButton justifyContent="center">
                <Wrap>
                  <WrapItem>
                    <Avatar
                      width={50}
                      height={50}
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    />
                  </WrapItem>
                </Wrap>
              </MenuButton>
              <MenuList>
                <MenuGroup color="white" title="Profile">
                  <MenuItem color="white">Mi Perfil</MenuItem>
                  <MenuItem color="white">Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem color="white">Docs</MenuItem>
                  <MenuItem color="white">Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
            {/* <Box mr={2}>Mauricio</Box> */}
          </Flex>
        </Box>
      </>
    );
    //user is logged in
  } else {
    body = (
      <Flex>
        <Box ml={"auto"}>{data.me.username}</Box>
        <Button
          type="submit"
          className={`mr-3`}
          onClick={() => {
            logout();
          }}
        >
          <SvgSolidBug width={20} height={20} /> &nbsp; &nbsp; Logout
        </Button>
      </Flex>
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
