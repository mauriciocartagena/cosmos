import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

interface WaitForWsAndAuthProps {}

export const WaitForWsAndAuth: React.FC<WaitForWsAndAuthProps> = ({
  children,
}) => {
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });

  // if (!useVerifyLoggedIn()) {
  //   return null;
  // }

  if (!data) {
    return <div className="flex">loading...</div>;
  }

  return <>{children}</>;
};
