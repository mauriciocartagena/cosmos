import React from "react";
import { WaitForWsAndAuth } from "../../modules/auth/WaitForWsAndAuth";
import { HeaderController } from "../../modules/display/HeaderController";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";
import { withApollo } from "../../utils/withApollo";
import { FeedController } from "./FeedController";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  return (
    <WaitForWsAndAuth>
      <HeaderController embed={{}} title="Post" />
      <DefaultDesktopLayout>
        <FeedController />
      </DefaultDesktopLayout>
    </WaitForWsAndAuth>
  );
};

export default withApollo({ ssr: true })(Post);
