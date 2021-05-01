import React, { useState } from "react";
import { SettingsDropdown } from "../SettingsDropdown";
import { DropdownController } from "../DropdownController";
import { SingleUser } from "../UserAvatar/SingleUser";
import {
  useFetchUserMutation,
  useLogoutMutation,
  useMeQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { EditAccountModal } from "../user/EditAccountModal";

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
  const [_, logout] = useLogoutMutation();
  const [editModal, setEditModal] = useState(false);

  const [{ data }] = useMeQuery({
    pause: isServer(),
  });
  const [{ data: user }, fetchUser] = useFetchUserMutation();
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
            }}
            onCloseDropdown={close}
            onActionToFetch={async () => {
              await fetchUser({
                id: !data?.me ? "" : data.me.id.toString(),
              }),
                setEditModal(true);
            }}
          />
        )}
      >
        <SingleUser
          className={"focus:outline-no-chrome"}
          size="sm"
          src="https://avatars.githubusercontent.com/u/51917913?v=4"
        />
      </DropdownController>
      {editModal && (
        <EditAccountModal
          id={!data?.me ? 0 : data.me.id}
          direction={!user ? "" : user.fetchUser.direction}
          email={!user ? "" : user.fetchUser.email}
          first_last_name={!user ? "" : user.fetchUser.first_last_name}
          name={!user ? "" : user.fetchUser.name}
          phone={!user ? 0 : user.fetchUser.phone}
          second_last_name={!user ? "" : user.fetchUser.second_last_name}
          onRequestClose={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

export default RightHeader;
