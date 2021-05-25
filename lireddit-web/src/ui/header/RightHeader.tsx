import React, { useState } from "react";
import { SettingsDropdown } from "../SettingsDropdown";
import { DropdownController } from "../DropdownController";
import { SingleUser } from "../UserAvatar/SingleUser";
import {
  useFetchUserQuery,
  useLogoutMutation,
  useMeQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { EditAccountModal } from "../user/EditAccountModal";
import router from "next/router";

export interface RightHeaderProps {
  onAnnouncementsClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => null;
  onMessagesClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => null;
  onNotificationsClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => null;
  actionButton?: React.ReactNode;
}

const RightHeader: React.FC<RightHeaderProps> = ({}) => {
  const [logout] = useLogoutMutation();
  const [editModal, setEditModal] = useState(false);

  const { data } = useMeQuery({
    skip: isServer(),
  });

  const { data: user, fetchMore } = useFetchUserQuery({
    variables: {
      id: data?.me ? data?.me?.peopleId.toString() : "",
    },
  });

  return (
    <div className="flex space-x-4 items-center justify-end focus:outline-no-chrome w-full">
      <DropdownController
        zIndex={20}
        portal={false}
        className="top-9 right-3 md:right-0 fixed"
        innerClassName="fixed  transform -translate-x-full"
        overlay={(close) => (
          <SettingsDropdown
            onActionButtonClicked={() => {
              logout();
              return router.push("/login");
            }}
            onCloseDropdown={close}
            onActionToFetch={async () => {
              await fetchMore({
                variables: {
                  id: !data?.me ? "" : data.me.peopleId.toString(),
                },
              }),
                setEditModal(true);
            }}
          />
        )}
      >
        <SingleUser
          className={"focus:outline-no-chrome"}
          size="sm"
          username={user?.fetchUser.username}
          src={data?.me?.url!}
        />
      </DropdownController>
      {editModal && (
        <EditAccountModal
          id={!data?.me ? 0 : data.me.peopleId}
          direction={!user ? "" : user.fetchUser.creator.direction}
          email={!user ? "" : user.fetchUser.email}
          first_last_name={!user ? "" : user.fetchUser.creator.first_last_name}
          name={!user ? "" : user.fetchUser.creator.name}
          phone={!user ? "" : user.fetchUser.creator.phone}
          second_last_name={
            !user ? "" : user.fetchUser.creator.second_last_name
          }
          onRequestClose={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

export default RightHeader;
