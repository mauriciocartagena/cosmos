import React from "react";
import { NavBar } from "../NavBar";
import { HeaderController } from "../../modules/display/HeaderController";
import { withUrqlClient } from "next-urql";
import { useUsersQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const [{ data }] = useUsersQuery();

  return (
    <>
      <HeaderController embed={{}} title="Dasboard" />
      <NavBar />;
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.users.map((p) => <div key={p.id}>{p.name}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Dashboard);
