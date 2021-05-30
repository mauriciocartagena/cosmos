import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "./isServer";

const useIsAuth = () => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      router.push("/login?next=" + router.pathname);
    }
  }, [loading, data, router]);
};
export default useIsAuth;
