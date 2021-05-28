import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button } from "../../form-fields/Button";
import SvgSolidLogo from "../../icons/SvgSolidLogo";
import { CreatePartnerModal } from "../../modules/dashboard/CreatePartnerModal";
import { HeaderController } from "../../modules/display/HeaderController";
import { useScreenType } from "../../shared-hooks/useScreenType";

interface InfoProps {}

const Info: React.FC<InfoProps> = ({}) => {
  const [roomModal, setRoomModal] = useState(false);
  const screenType = useScreenType();

  return (
    <>
      <HeaderController embed={{}} title="Info" />
      <div className="w-full">
        <div className="grid grid-cols-2 justify-items-center gap-4 pt-5 ">
          <div>
            <SvgSolidLogo />
          </div>
          <div>
            {screenType === "3-cols" ? (
              <Button onClickCapture={() => setRoomModal(true)}>
                Volverse socio
              </Button>
            ) : (
              <div className="flex justify-center w-full">
                <Button onClickCapture={() => setRoomModal(true)}>
                  Volverse Socio
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="grid justify-items-center pt-8">
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
          <div className="flex flex-wrap ">
            <div className="w-full lg:w-6/12">
              <div
                className="w-full h-12 gad-8 text-sm text-grey-dark flex"
                style={{
                  padding: 4,
                }}
              >
                <div
                  className="w-full pt-2 pb-2 pl-2 pr-2"
                  style={{
                    backgroundColor: "var(--color-primary-800)",
                  }}
                >
                  <img
                    alt="avatar"
                    style={{
                      border: "2px solid #DDE2E3",
                      width: 350,
                      height: 350,
                    }}
                    className="rounded-full  w-full h-full object-cover"
                    src="../../img/woman.png"
                  />
                  <Text
                    style={{
                      width: 350,
                    }}
                    fontFamily="Muli,Helvetica Neue,sans-serif"
                    className="truncate whitespace-pre-wrap text-primary-300 p-4 pt-5"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum d
                  </Text>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <div
                className="w-full text-sm text-grey-dark flex justify-center"
                style={{
                  padding: 4,
                }}
              >
                <div
                  style={{
                    backgroundColor: "var(--color-primary-800)",
                  }}
                  className="w-full pt-2 pb-2 pl-2 pr-2"
                >
                  <img
                    alt="avatar"
                    style={{
                      border: "2px solid #DDE2E3",
                      width: 350,
                      height: 350,
                    }}
                    className="rounded-full  w-full h-full object-cover"
                    src={"../../img/men.png"}
                  />
                  <Text
                    style={{
                      width: 350,
                      fontFamily: "Muli,Helvetica Neue,sans-serif",
                    }}
                    className="truncate whitespace-pre-wrap text-primary-300 p-4 pt-5"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum d
                  </Text>
                </div>
              </div>
            </div>
          </div>
          {roomModal && (
            <CreatePartnerModal
              title={"Formulario de registro nuevo socio"}
              onRequestClose={() => setRoomModal(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Info;
