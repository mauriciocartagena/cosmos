import React, { useState } from "react";
import { SolidPlus } from "../../icons";
import { BoxedIcon } from "../../modules/layouts/BoxedIcon";
import ModalCreateUser from "../Account/ModalCreateUser";

interface LeftPanelProps {}

export const LeftPanel: React.FC<LeftPanelProps> = ({}) => {
  const [modalUser, setModalUser] = useState(false);
  return (
    <div
      className="pb-5 w-full flex flex-col flex-1 overflow-y-auto"
      data-testid="friends-online"
    >
      <div className="w-full rounded-lg overflow-y-auto flex flex-col">
        <div className="px-4 py-3 bg-primary-800 border-b border-primary-600 flex justify-between items-center">
          <h4 className="text-primary-100 font-bold">Crear usuario</h4>
          <BoxedIcon
            onClick={() => setModalUser(true)}
            style={{ height: "26px", width: "26px" }}
            transition
          >
            <SolidPlus width={12} height={12} />
          </BoxedIcon>
        </div>
        <div className="flex flex-col"></div>
      </div>
      {modalUser && (
        <ModalCreateUser onRequestClose={() => setModalUser(false)} />
      )}
    </div>
  );
};
