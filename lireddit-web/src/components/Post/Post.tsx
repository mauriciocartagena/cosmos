import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import { useScreenType } from "../../shared-hooks/useScreenType";

interface PostProps {}

export const Post: React.FC<PostProps> = ({}) => {
  const screenType = useScreenType();

  return (
    <>
      <div className="flex flex-1 justify-center w-full">
        {screenType === "fullscreen" ? (
          <Grid templateRows="repeat(, 1fr)" templateColumns="repeat(2, 1fr)">
            <Box w={[300, 400, 560]} bg="blue.500">
              <div className="container mx-auto px-4 flex sticky top-0 w-full flex-col z-10 bg-primary-900 pt-5">
                <img
                  style={{ width: "100%" }}
                  src="https://pyxis.nymag.com/v1/imgs/a37/d4f/0ce40e4ebb623bc3d06f7985ad05b11f18-the-mandalorian.rsquare.w700.jpg"
                ></img>
              </div>
            </Box>
            <Box w={[300, 400, 560]} bg="blue.500">
              <div className="container mx-auto px-4 flex sticky top-0 w-full flex-col z-10 bg-primary-900 pt-5">
                <img
                  style={{ width: "100%" }}
                  src="https://pyxis.nymag.com/v1/imgs/a37/d4f/0ce40e4ebb623bc3d06f7985ad05b11f18-the-mandalorian.rsquare.w700.jpg"
                ></img>
              </div>
            </Box>
            <Box w={[300, 400, 560]} bg="blue.500">
              <div className="container mx-auto px-4 flex sticky top-0 w-full flex-col z-10 bg-primary-900 pt-5">
                <img
                  style={{ width: "100%" }}
                  src="https://pyxis.nymag.com/v1/imgs/a37/d4f/0ce40e4ebb623bc3d06f7985ad05b11f18-the-mandalorian.rsquare.w700.jpg"
                ></img>
              </div>
            </Box>
            <Box w={[300, 400, 560]} bg="blue.500">
              <div className="container mx-auto px-4 flex sticky top-0 w-full flex-col z-10 bg-primary-900 pt-5">
                <img
                  style={{ width: "100%" }}
                  src="https://pyxis.nymag.com/v1/imgs/a37/d4f/0ce40e4ebb623bc3d06f7985ad05b11f18-the-mandalorian.rsquare.w700.jpg"
                ></img>
              </div>
            </Box>
            <Box w={[300, 400, 560]} bg="blue.500">
              <div className="container mx-auto px-4  sticky top-0 w-full flex-col z-10 bg-primary-900 pt-5">
                <img src="https://pyxis.nymag.com/v1/imgs/a37/d4f/0ce40e4ebb623bc3d06f7985ad05b11f18-the-mandalorian.rsquare.w700.jpg"></img>
              </div>
            </Box>
          </Grid>
        ) : (
          <Grid templateRows="repeat(, 1fr)" templateColumns="repeat(3, 1fr)">
            <Box w={[300, 400, 560]} bg="blue.500">
              <div className="container mx-auto px-4 flex sticky top-0 w-full flex-col z-10 bg-primary-900 pt-5">
                <img
                  style={{ width: "100%" }}
                  src="https://pyxis.nymag.com/v1/imgs/a37/d4f/0ce40e4ebb623bc3d06f7985ad05b11f18-the-mandalorian.rsquare.w700.jpg"
                ></img>
              </div>
            </Box>
            <Box w={[300, 400, 560]} bg="blue.500">
              <div className="container mx-auto px-4 flex sticky top-0 w-full flex-col z-10 bg-primary-900 pt-5">
                <img
                  style={{ width: "100%" }}
                  src="https://pyxis.nymag.com/v1/imgs/a37/d4f/0ce40e4ebb623bc3d06f7985ad05b11f18-the-mandalorian.rsquare.w700.jpg"
                ></img>
              </div>
            </Box>
            <Box w={[300, 400, 560]} bg="blue.500">
              <div className="container mx-auto px-4 flex sticky top-0 w-full flex-col z-10 bg-primary-900 pt-5">
                <img
                  style={{ width: "100%" }}
                  src="https://pyxis.nymag.com/v1/imgs/a37/d4f/0ce40e4ebb623bc3d06f7985ad05b11f18-the-mandalorian.rsquare.w700.jpg"
                ></img>
              </div>
            </Box>
            <Box w={[300, 400, 560]} bg="blue.500">
              <div className="container mx-auto px-4 flex sticky top-0 w-full flex-col z-10 bg-primary-900 pt-5">
                <img
                  style={{ width: "100%" }}
                  src="https://pyxis.nymag.com/v1/imgs/a37/d4f/0ce40e4ebb623bc3d06f7985ad05b11f18-the-mandalorian.rsquare.w700.jpg"
                ></img>
              </div>
            </Box>
            <Box w={[300, 400, 560]} bg="blue.500">
              <div className="container mx-auto px-4  sticky top-0 w-full flex-col z-10 bg-primary-900 pt-5">
                <img src="https://pyxis.nymag.com/v1/imgs/a37/d4f/0ce40e4ebb623bc3d06f7985ad05b11f18-the-mandalorian.rsquare.w700.jpg"></img>
              </div>
            </Box>
          </Grid>
        )}
      </div>
    </>
  );
};
