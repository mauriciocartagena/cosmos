import React from "react";
import { isServer } from "../../utils/isServer";
import { useMeQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/useIsAuth";

interface WaitForWsAndAuthProps {}

export const WaitForWsAndAuth: React.FC<WaitForWsAndAuthProps> = ({
  children,
}) => {
  useIsAuth();

  const { data } = useMeQuery({
    skip: isServer(),
  });

  if (!data) {
    return (
      <div className="flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700">
        loading...
      </div>
    );
  }

  return <>{children}</>;
};
