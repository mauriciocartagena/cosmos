import React from "react";
import {
  OutlineGlobe,
  SolidBug,
  SolidCaretRight,
  SolidUser,
  SolidVolume,
} from "../icons";
import SvgSolidDiscord from "../icons/SolidDiscord";
import { BaseOverlay } from "../ui/BaseOverlay";
import { SettingsIcon } from "../ui/SettingsIcon";

export const SettingsDropdown: React.FC<{
  onCloseDropdown: () => void;
  onActionButtonClicked: () => void;
}> = ({ onCloseDropdown, onActionButtonClicked }) => {
  console.log(onCloseDropdown, onActionButtonClicked);
  return (
    <div
      className="flex whitespace-nowrap overflow-ellipsis"
      style={{ width: 200 }}
    >
      <BaseOverlay
        onActionButtonClicked={onActionButtonClicked}
        actionButton={"components.settingsDropdown.logOut.button"}
      >
        <div className="flex flex-col">
          <SettingsIcon
            onClick={onCloseDropdown}
            icon={<SolidUser />}
            label={"components.settingsDropdown.profile"}
          />

          {/* <SettingsIcon icon={<SolidSettings />} label={"Settings"} />
        <SettingsIcon icon={<SolidDogenitro />} label={"Wallet"} /> */}
          <SettingsIcon
            icon={<OutlineGlobe />}
            label={"components.settingsDropdown.language"}
            trailingIcon={<SolidCaretRight />}
            onClick={() => {}}
          />
          {/* <SettingsIcon icon={<SolidHelp />} label={"Help"} /> */}
          <a
            href="https://github.com/benawad/dogehouse/issues"
            target="_blank"
            rel="noreferrer"
          >
            <SettingsIcon
              onClick={onCloseDropdown}
              icon={<SolidBug />}
              label={"components.settingsDropdown.reportABug"}
              // transition
            />
          </a>
          <SettingsIcon
            label={
              // !debugAudio
              "components.settingsDropdown.debugAudio.debugAudio"
              // : "components.settingsDropdown.debugAudio.stopDebugger"
            }
            icon={<SolidVolume />}
            // transition
            onClick={() => {}}
          />
          <a
            href="https://discord.gg/wCbKBZF9cV"
            target="_blank"
            rel="noreferrer"
          >
            <SettingsIcon
              onClick={onCloseDropdown}
              icon={<SvgSolidDiscord />}
              label={"Discord"}
              // transition
            />
          </a>
        </div>
      </BaseOverlay>
    </div>
  );
};
