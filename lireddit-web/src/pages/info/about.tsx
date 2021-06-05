import React from "react";
import { Text } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
interface AboutProps {
  className?: string;
}

export const About: React.FC<AboutProps> = ({ className }) => {
  return (
    <div className={`grid justify-items-center pt-8 pb-2 ${className} `}>
      <h1
        style={{
          fontWeight: 900,
          textAlign: "center",
        }}
        className="text-primary-100"
      >
        Mentes Maestras
      </h1>
      <h2
        style={{
          fontStyle: "normal",
        }}
        className="text-primary-300"
      >
        Elizabet & Raul
      </h2>
      <div className="flex  flex-wrap justify-center">
        <div className="w-full sm:w-1/2 md:w-1/3 px-2">
          <Center>
            <img
              style={{
                border: "2px solid #553C9A",
                width: 350,
                height: 350,
                backgroundColor: "#E9D8FD",
              }}
              src="../../img/woman.png"
              alt="description"
              className=" px-2 grid justify-items-center rounded-full  w-full h-full object-cover"
            />
          </Center>
          <div className="px-6 py-4">
            <Text
              style={{
                lineHeight: "1.875rem",
              }}
              fontFamily="Muli,Helvetica Neue,sans-serif"
              className="truncate whitespace-pre-wrap text-primary-300 p-4 pt-5"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum d
            </Text>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-2">
          <Center>
            <img
              style={{
                border: "2px solid #4299E1",
                width: 350,
                height: 350,
                backgroundColor: "#BEE3F8",
              }}
              src={"../../img/men.png"}
              alt="description"
              className=" px-2 grid justify-items-center rounded-full  w-full h-full object-cover"
            />
          </Center>
          <div className="px-6 py-4">
            <Text
              style={{
                lineHeight: "1.875rem",
              }}
              fontFamily="Muli,Helvetica Neue,sans-serif"
              className="truncate whitespace-pre-wrap text-primary-300 p-4 pt-5"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum d
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
