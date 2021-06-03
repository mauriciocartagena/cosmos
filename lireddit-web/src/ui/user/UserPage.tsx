import React from "react";
import { MiddlePanel } from "../../modules/layouts/GridPanels";
import { PageComponent } from "../../types/PageComponent";
import { UserProfileController } from "./UserProfileController";
import { HeaderController } from "../../modules/display/HeaderController";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";
import { WaitForWsAndAuth } from "../../modules/auth/WaitForWsAndAuth";
import { withApollo } from "../../utils/withApollo";
interface UserPageProps {}

const UserPage: PageComponent<UserPageProps> = () => {
  return (
    <WaitForWsAndAuth>
      <HeaderController embed={{}} title="Account" />
      <DefaultDesktopLayout>
        <MiddlePanel>
          <UserProfileController />
        </MiddlePanel>
      </DefaultDesktopLayout>
    </WaitForWsAndAuth>
  );
};
export default withApollo({ ssr: false })(UserPage);
