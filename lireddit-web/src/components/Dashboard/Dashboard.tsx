import React from "react";
import { WaitForWsAndAuth } from "../../modules/auth/WaitForWsAndAuth";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";
import { withApollo } from "../../utils/withApollo";
import { FeedController } from "./FeedController";
import { HeaderController } from "../../modules/display/HeaderController";

interface DasboardProps {}

const Dashboard: React.FC<DasboardProps> = () => {
  return (
    <WaitForWsAndAuth>
      <HeaderController embed={{}} title={"Dashboard"} />
      <DefaultDesktopLayout>
        <FeedController />
      </DefaultDesktopLayout>
    </WaitForWsAndAuth>
  );
};

export default withApollo({ ssr: true })(Dashboard);
