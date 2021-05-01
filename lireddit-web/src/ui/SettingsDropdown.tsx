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
import SvgSolidSettings from "../icons/SolidSettings";

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
        actionButton={"Log out"}
      >
        <div className="flex flex-col">
          <SettingsIcon
            onClick={onCloseDropdown}
            icon={<SolidUser />}
            label={"Cuenta"}
          />

          <SettingsIcon
            icon={<SvgSolidSettings />}
            label={"Editar Pefil"}
            onClick={() => {}}
          />

          <a
            href="https://github.com/mauriciocartagena"
            target="_blank"
            rel="noreferrer"
          >
            <SettingsIcon
              onClick={onCloseDropdown}
              icon={<SolidBug />}
              label={"Report a bug"}
              // transition
            />
          </a>
        </div>
      </BaseOverlay>
    </div>
  );
};
