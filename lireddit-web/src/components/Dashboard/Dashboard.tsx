import React from "react";
import { WaitForWsAndAuth } from "../../modules/auth/WaitForWsAndAuth";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";
import { withApollo } from "../../utils/withApollo";
import { FeedController } from "./FeedController";

interface DasboardProps {}

const Dashboard: React.FC<DasboardProps> = () => {
  return (
    <WaitForWsAndAuth>
      <DefaultDesktopLayout>
        <FeedController />
      </DefaultDesktopLayout>
    </WaitForWsAndAuth>
  );
};

export default withApollo({ ssr: true })(Dashboard);
