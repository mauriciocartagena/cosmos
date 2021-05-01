import { withUrqlClient } from "next-urql";
import React from "react";
import { NavBar } from "../../components/NavBar";
import { HeaderController } from "../../modules/display/HeaderController";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { ProfileHeaderWrapper } from "../ProfileHeaderWrapper";
import { SingleUser } from "../UserAvatar/SingleUser";
import { Button } from "../Button";
import SolidCompass from "../../icons/SolidCompass";
import { MiddleHeader } from "../header/MiddleHeader";
import LeftHeader from "../header/LeftHeader";
import RightHeader from "../header/RightHeader";
import { query } from "@urql/exchange-graphcache";
import { MiddlePanel } from "../../modules/GridPanels";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";

// export const onlineIndicatorStyleMap = {
//   default: {
//     width: "15px",
//     height: "15px",
//     right: "2px",
//     bottom: "-4px",
//     borderWidth: "4px",
//   },
//   lg: {
//     width: "12px",
//     height: "12px",
//     right: "2px",
//     bottom: "-2px",
//     borderWidth: "2px",
//   },
//   md: {
//     width: "10px",
//     height: "10px",
//     right: "2px",
//     bottom: "-2px",
//     borderWidth: "2px",
//   },
//   sm: {
//     width: "8px",
//     height: "8px",
//     right: "2px",
//     bottom: "-2px",
//     borderWidth: "2px",
//   },
//   xs: {
//     width: "4px",
//     height: "4px",
//     right: "0px",
//     bottom: "-1px",
//     borderWidth: "1px",
//   },
//   xxs: {
//     width: "6px",
//     height: "6px",
//     right: "1px",
//     bottom: "-1px",
//     borderWidth: "1px",
//   },
// };

export interface AccountProps {}
const Account: React.FC<AccountProps> = () => {
  return (
    <>
      <HeaderController embed={{}} title="Account" />

      <DefaultDesktopLayout>
        <MiddlePanel></MiddlePanel>
      </DefaultDesktopLayout>
      {/* <ProfileHeaderWrapper coverUrl={"https://source.unsplash.com/random"}>
        <div className="flex mr-4 ">
          <SingleUser
            isOnline={true}
            className="absolute flex-none -top-5.5 rounded-full shadow-outlineLg bg-primary-900"
            src={"https://avatars.githubusercontent.com/u/51917913?v=4"}
          />
        </div>
        <div className="flex flex-col w-3/6 font-sans">
          <h4 className="text-primary-100 font-bold truncate">Mauricio</h4>
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
              onClick={() => true}
              icon={<SolidCompass />}
            >
              Editar cuenta
            </Button>
          </div>
        </div>
      </ProfileHeaderWrapper>
    </> */}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Account as any);
