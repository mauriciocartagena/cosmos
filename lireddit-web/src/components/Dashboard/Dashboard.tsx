import { withUrqlClient } from "next-urql";
import React from "react";
import { HeaderController } from "../../modules/display/HeaderController";
import { MiddlePanel } from "../../modules/GridPanels";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { FeedHeader } from "../../ui/FeedHeader";
import { CreatePartnerModal } from "../../modules/dashboard/CreatePartnerModal";
import { useState } from "react";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const [roomModal, setRoomModal] = useState(false);
  return (
    <>
      <HeaderController embed={{}} title="Dasboard" />
      <DefaultDesktopLayout>
        <MiddlePanel>
          <FeedHeader
            actionTitle={"Nuevo socio"}
            onActionClicked={() => setRoomModal(true)}
            title={"Socios"}
          />
        </MiddlePanel>
      </DefaultDesktopLayout>
      {roomModal && (
        <CreatePartnerModal onRequestClose={() => setRoomModal(false)} />
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Dashboard);
