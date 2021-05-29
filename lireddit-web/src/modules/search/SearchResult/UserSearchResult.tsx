import React from "react";
import { SingleUser } from "../../../ui/UserAvatar/SingleUser";

export interface UserSearchResultProps {
  user: {
    name: string;
    first_last_name: string;
    second_last_name: string;
    avatar: string;
  };
  className?: string;
  onClick?: () => void;
}

export const UserSearchResult: React.FC<UserSearchResultProps> = ({
  user,
  className = "",
  onClick = () => undefined,
}) => {
  return (
    <div
      className={`flex cursor-pointer hover:bg-primary-700 px-4 py-3 w-full rounded-8 ${className}`}
      onClick={onClick}
    >
      <div className="flex mr-3">
        <SingleUser
          isOnline={true}
          src={user.avatar}
          username={user.avatar}
          size="md"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-primary-100 font-bold">{user.name}</span>
        <span className="text-primary-300">{user.first_last_name}</span>{" "}
        <span className="text-primary-300">{user.second_last_name}</span>
      </div>
    </div>
  );
};
