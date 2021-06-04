import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

export const useVerifyLoggedIn = () => {
  const { replace, asPath } = useRouter();
  const { data, loading } = useMeQuery({
    skip: isServer(),
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!data?.me && !loading) {
      replace(`/login/?next=${asPath}`);
    }
  }, [data, asPath, replace]);

  return data;
};
