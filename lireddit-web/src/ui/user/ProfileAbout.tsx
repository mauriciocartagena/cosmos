import React from "react";
// import { kFormatter } from "../lib/kFormatter";
// import { TextParser } from "../modules/display/TextParser";
// import { ApiPreloadLink } from "../shared-components/ApiPreloadLink";
// import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
// import { UserBadgeLg, UserBadgeLgProps } from "./UserBadgeLg";
import SolidLink from "../../icons/SolidLink";
export interface ProfileAboutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  first_last_name: string;
  second_last_name: string;
  phone: string;
  direction: string;
}

export const ProfileAbout: React.FC<ProfileAboutProps> = ({
  name,
  first_last_name,
  second_last_name,
  phone,
  direction,
  className = "",
}) => {
  return (
    <div
      className={`mt-2 bg-primary-800 p-4 rounded-8 w-full leading-8 ${className}`}
      style={{ maxWidth: 640 }}
    >
      <div className="text-primary-100 font-bold text-xl pb-4 text-accent font-bold text-sm">
        Sobre {name}
      </div>
      <div className="flex mb-2">
        <div className="flex group mr-4">
          <span className="text-primary-100 font-bold">Primer Apellido: </span>
          <span className="text-primary-300 ml-1  ">{first_last_name}</span>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="flex group">
          <span className="text-primary-100 font-bold">Segundo Apellido: </span>
          <span className="text-primary-300 ml-1  ">{second_last_name}</span>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="flex group">
          <span className="text-primary-100 font-bold">Dirección: </span>
          <span className="text-primary-300 ml-1  ">{direction}</span>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="flex group">
          <span className="text-primary-100 font-bold">Celular: </span>
          <span className="text-primary-300 ml-1  ">{phone}</span>
        </div>
      </div>
    </div>
  );
};
