import React from "react";
import { isServer } from "../../utils/isServer";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {}

export const WaitForWsAndAuth: React.FC<WaitForWsAndAuthProps> = ({
  children,
}) => {
  if (!useVerifyLoggedIn()) {
    return null;
  }

  if (!isServer) {
    return (
      <div className="flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700">
        loading...
      </div>
    );
  }

  return <>{children}</>;
};
