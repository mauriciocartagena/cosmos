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

interface NavBarProps {}

const body = (
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
);

export const NavBar: React.FC<NavBarProps> = ({}) => {
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
        <NextLink href="/">
          <Link>
            <Heading fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
              MentesMaestras
            </Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
