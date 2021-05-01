import React from "react";
import { SettingsDropdown } from "../SettingsDropdown";
import { DropdownController } from "../DropdownController";
import { SingleUser } from "../UserAvatar/SingleUser";

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
              // modalConfirm(
              //   t("components.settingsDropdown.logOut.modalSubtitle"),
              //   () => {
              //     conn.close();
              //     closeVoiceConnections(null);
              //     useCurrentRoomIdStore.getState().setCurrentRoomId(null);
              //     useTokenStore
              //       .getState()
              //       .setTokens({ accessToken: "", refreshToken: "" });
              //     push("/logout");
              //   }
              // );
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
