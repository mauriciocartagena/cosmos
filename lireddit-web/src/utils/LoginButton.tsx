import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { Button } from "../ui/Button";
import { LoginButtonProps } from "../modules/landing-page/LoginPage";

export const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  onClick,
  oauthUrl,
  dev,
}) => {
  const { query } = useRouter();
  const clickHandler = useCallback(() => {
    if (typeof query.next === "string" && query.next) {
      try {
        localStorage.setItem("ss", query.next);
      } catch {}
    }

    window.location.href = oauthUrl as string;
  }, [query, oauthUrl]);

  return (
    <Button
      className="justify-center text-base py-3"
      color={dev ? "primary" : "secondary"}
      onClick={oauthUrl ? clickHandler : onClick}
    >
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
        }}
      >
        {children[0]}
        {children[1]}
        <div />
      </div>
    </Button>
  );
};
