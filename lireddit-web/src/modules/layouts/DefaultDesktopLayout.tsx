import React from "react";
import { DesktopLayout } from "./DesktopLayout";
import { ProfileBlock } from "../../ui/ProfileBlock";
import { SingleUser } from "../../ui/UserAvatar/SingleUser";
import { CardHeading } from "../../ui/CardHeading";

interface DefaultDesktopLayoutProps {}

export const DefaultDesktopLayout: React.FC<DefaultDesktopLayoutProps> = ({
  children,
}) => {
  return (
    <DesktopLayout
      leftPanel={
        <div
          className="pb-5 w-full flex flex-col flex-1 overflow-y-auto"
          data-testid="friends-online"
        >
          <h4 className="text-primary-100">Hello World</h4>
          <h6 className="text-primary-300 mt-3 text-sm font-bold uppercase">
            Nice to meet you to.
          </h6>
          <div className=" font-bold text-primary-300 flex flex-col mt-3 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700 overflow-x-hidden">
            yes
          </div>
        </div>
      }
      rightPanel={
        <ProfileBlock
          top={
            <div className="flex flex-col rounded-8 bg-primary-800 p-4 w-full">
              <button
                data-testid="edit-profile-widget"
                className="flex"
                // onClick={onClick}
              >
                <div className="flex">
                  <SingleUser
                    size="default"
                    isOnline={true}
                    src={
                      "https://cdn.mos.cms.futurecdn.net/qDXDXaCpoLf4uy9EJM6e3n.jpg"
                    }
                  />
                </div>
                <div className="flex mt-2">
                  <div className="flex flex-col ml-3">
                    <span className="text-primary-100 font-bold overflow-hidden break-all text-left">
                      Name
                    </span>
                    <span className="text-primary-300 text-left break-all">
                      Username
                    </span>
                  </div>
                </div>
              </button>
              <div className="flex mt-4">
                <div className="flex">
                  <span className="text-primary-100 font-bold">Email :</span>
                </div>
                <div className="flex ml-4">
                  <span className="font-bold text-primary-300 ml-1.5 lowercase">
                    Tu email
                  </span>
                </div>
              </div>
            </div>
          }
          bottom={
            <div className="w-full rounded-lg overflow-y-auto flex flex-col">
              <div className="px-4 py-3 bg-primary-800 border-b border-primary-600 flex justify-between items-center">
                <h4 className="text-primary-100 font-bold text-accent">
                  Tu Información
                </h4>
              </div>
              <div className="flex flex-col"></div>

              <button
                onClick={() => {}}
                className={`px-4 py-2 w-full bg-primary-800 flex flex-col gap-2 border-b border-primary-600 cursor-pointer last:border-b-0 `}
              >
                <div className="flex font-bold text-primary-100 text-sm uppercase">
                  Primer Apellido
                </div>
                <CardHeading text={"Morata"} />

                <div className="flex font-bold text-primary-100  text-sm uppercase">
                  Segundo Apellido
                </div>
                <CardHeading text={"Ticacolque"} />

                <div className="flex font-bold text-primary-100 text-sm uppercase">
                  Celular
                </div>
                <CardHeading text={"778787444"} />
                <div className="flex font-bold text-primary-100 text-sm uppercase">
                  Dirección
                </div>
                <CardHeading text={"Cochabamba"} />
              </button>
            </div>
          }
        ></ProfileBlock>
      }
    >
      {children}
    </DesktopLayout>
  );
};
