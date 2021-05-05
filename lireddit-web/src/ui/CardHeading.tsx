import React, { ReactElement } from "react";

export interface CardHeadingProps {
  icon?: ReactElement;
  text: string;
}

export const CardHeading: React.FC<CardHeadingProps> = ({ icon, text }) => {
  return (
    <div className="flex text-primary-300  leading-5 truncate w-full">
      {icon ? <span className="mr-2 align-middle">{icon}</span> : null}
      <span className="inline truncate">{text}</span>
    </div>
  );
};
