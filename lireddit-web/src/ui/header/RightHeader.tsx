import React from "react";
import { SettingsDropdown } from "../SettingsDropdown";
import { DropdownController } from "../DropdownController";
import { SingleUser } from "../UserAvatar/SingleUser";
import { useLogoutMutation } from "../../generated/graphql";

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
          />
        )}
      >
        <SingleUser
          className={"focus:outline-no-chrome"}
          size="sm"
          src="https://avatars.githubusercontent.com/u/51917913?v=4"
        />
      </DropdownController>
    </div>
  );
};

export default RightHeader;
