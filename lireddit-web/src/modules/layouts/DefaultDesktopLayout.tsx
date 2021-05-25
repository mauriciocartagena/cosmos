import React from "react";
import { useFetchUserQuery, useMeQuery } from "../../generated/graphql";
import { SolidPlus } from "../../icons";
import { CardHeading } from "../../ui/CardHeading";
import { ProfileBlock } from "../../ui/ProfileBlock";
import { SingleUser } from "../../ui/UserAvatar/SingleUser";
import { isServer } from "../../utils/isServer";
import { BoxedIcon } from "./BoxedIcon";
import { DesktopLayout } from "./DesktopLayout";
import { useState } from "react";
import ModalCreateUser from "../../components/Account/ModalCreateUser";

interface DefaultDesktopLayoutProps {}
export const DefaultDesktopLayout: React.FC<DefaultDesktopLayoutProps> = ({
  children,
}) => {
  const { data: user } = useMeQuery({
    skip: isServer(),
    notifyOnNetworkStatusChange: true,
  });
  const { data, loading, fetchMore } = useFetchUserQuery({
    variables: {
      id: user?.me ? user.me.peopleId.toString() : "",
    },
  });

  const [modalUser, setModalUser] = useState(false);

  return (
    <DesktopLayout
      leftPanel={
        <div
          className="pb-5 w-full flex flex-col flex-1 overflow-y-auto"
          data-testid="friends-online"
        >
          <div className="w-full rounded-lg overflow-y-auto flex flex-col">
            <div className="px-4 py-3 bg-primary-800 border-b border-primary-600 flex justify-between items-center">
              <h4 className="text-primary-100 font-bold">Crear usuario</h4>
              <BoxedIcon
                onClick={() => setModalUser(true)}
                style={{ height: "26px", width: "26px" }}
                transition
              >
                <SolidPlus width={12} height={12} />
              </BoxedIcon>
            </div>
            <div className="flex flex-col"></div>
          </div>
          {modalUser && (
            <ModalCreateUser onRequestClose={() => setModalUser(false)} />
          )}
        </div>
      }
      rightPanel={
        !data && loading ? (
          <div>cargando ...</div>
        ) : (
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
                      username={user?.me?.username}
                      src={user?.me?.url!}
                    />
                  </div>
                  <div className="flex mt-2">
                    <div className="flex flex-col ml-3">
                      <span className="text-primary-100 font-bold overflow-hidden break-all text-left">
                        {data?.fetchUser.creator.name}
                      </span>
                      <span className="text-primary-300 text-left break-all">
                        {data?.fetchUser.username}
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
                      {data?.fetchUser.email}
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
                  <CardHeading
                    text={`${data?.fetchUser.creator.first_last_name}`}
                  />

                  <div className="flex font-bold text-primary-100  text-sm uppercase">
                    Segundo Apellido
                  </div>
                  <CardHeading
                    text={`${data?.fetchUser.creator.second_last_name}`}
                  />

                  <div className="flex font-bold text-primary-100 text-sm uppercase">
                    Celular
                  </div>
                  <CardHeading text={`${data?.fetchUser.creator.phone}`} />
                  <div className="flex font-bold text-primary-100 text-sm uppercase">
                    Dirección
                  </div>
                  <CardHeading text={`${data?.fetchUser.creator.direction}`} />
                </button>
              </div>
            }
          />
        )
      }
    >
      {children}
    </DesktopLayout>
  );
};
