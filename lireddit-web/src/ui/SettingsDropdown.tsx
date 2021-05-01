import React from "react";
import { SolidBug, SolidUser } from "../icons";
import { BaseOverlay } from "../ui/BaseOverlay";
import { SettingsIcon } from "../ui/SettingsIcon";
import SvgSolidSettings from "../icons/SolidSettings";
import router from "next/router";

export const SettingsDropdown: React.FC<{
  onCloseDropdown: () => void;
  onActionToFetch: () => void;
  onActionButtonClicked: () => void;
}> = ({ onActionToFetch, onCloseDropdown, onActionButtonClicked }) => {
  return (
    <>
      <div
        className="flex whitespace-nowrap overflow-ellipsis"
        style={{ width: 200 }}
      >
        <BaseOverlay
          onActionButtonClicked={onActionButtonClicked}
          actionButton={"Log out"}
        >
          <div className="flex flex-col">
            <div onClick={() => router.push("/account")}>
              <SettingsIcon
                onClick={onCloseDropdown}
                icon={<SolidUser />}
                label={"Cuenta"}
                transition
              />
            </div>
            <SettingsIcon
              icon={<SvgSolidSettings />}
              label={"Editar Pefil"}
              onClick={onActionToFetch}
              transition
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
                transition
              />
            </a>
          </div>
        </BaseOverlay>
      </div>
    </>
  );
};
