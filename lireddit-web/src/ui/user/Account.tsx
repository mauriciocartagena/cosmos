import { withUrqlClient } from "next-urql";
import React from "react";
import SolidCompass from "../../icons/SolidCompass";
import { HeaderController } from "../../modules/display/HeaderController";
import { MiddlePanel } from "../../modules/GridPanels";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Button } from "../Button";
import { ProfileHeaderWrapper } from "../ProfileHeaderWrapper";
import { SingleUser } from "../UserAvatar/SingleUser";
import { useIsAuth } from "../../modules/auth/useIsAuth";
import { useState } from "react";

const Account: React.FC<{}> = () => {
  useIsAuth();

  const [data, setData] = useState(false);
  setTimeout(() => {
    setData(true);
  }, 1000);

  return (
    <>
      <HeaderController embed={{}} title="Account" />

      {data ? (
        <DefaultDesktopLayout>
          <MiddlePanel>
            <ProfileHeaderWrapper
              coverUrl={"https://source.unsplash.com/random"}
            >
              <div className="flex mr-4 ">
                <SingleUser
                  isOnline={true}
                  className="absolute flex-none -top-5.5 rounded-full shadow-outlineLg bg-primary-900"
                  src={"https://avatars.githubusercontent.com/u/51917913?v=4"}
                />
              </div>
              <div className="flex flex-col w-3/6 font-sans">
                <h4 className="text-primary-100 font-bold truncate">
                  Mauricio
                </h4>
                <div className="flex flex-row items-center">
                  <p
                    className="text-primary-300 mr-2"
                    data-testid="profile-info-username"
                  >{`@Mauricio`}</p>
                </div>
              </div>

              <div className="w-3/6 ">
                <div className="flex flex-row justify-end content-end gap-2">
                  <Button
                    size="small"
                    color="secondary"
                    icon={<SolidCompass />}
                  >
                    Editar cuenta
                  </Button>
                </div>
              </div>
            </ProfileHeaderWrapper>
          </MiddlePanel>
        </DefaultDesktopLayout>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Account as any);
