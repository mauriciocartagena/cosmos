import { useRouter } from "next/router";
import React, { useCallback } from "react";
// import { LgLogo } from "../../icons";

import SvgSolidLogo from "../../img/SvgSolidLogo";

import SvgSolidBug from "../../icons/SolidBug";
import SvgSolidFacebook from "../../icons/SolidFacebook";
import SvgSolidUser from "../../icons/SolidUser";
import SvgSolidInstagram from "../../icons/SolidInstagram";
import { Button } from "../../ui/Button";
import { HeaderController } from "../display/HeaderController";
import { baseUrl } from "../../lib/constants";

/*
i know this code is kinda garbage but that's because the mockup is garbage and doesn't use the design system
 */

interface LoginButtonProps {
  children: [React.ReactNode, React.ReactNode];
  dev?: true;
  onClick?: () => void;
  oauthUrl?: string; // React.FC didn't like & ({ onClick: () => void } | { oauthUrl: string }) so yeah
}

const LoginButton: React.FC<LoginButtonProps> = ({
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

console.log(baseUrl);

export const LoginPage: React.FC = () => {
  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateRows: "1fr auto 1fr",
      }}
    >
      <HeaderController embed={{}} title="Login" />
      <div className="hidden sm:flex" />
      <div className="justify-self-center self-center sm:hidden">
        {/* <LgLogo /> */}
        <SvgSolidLogo />
      </div>
      <div className="m-auto flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 z-10 sm:w-400 w-full">
        <div className="gap-2 flex-col">
          <span className="text-3xl text-primary-100 font-bold">Welcome</span>
          <p className="text-primary-100 flex-wrap">
            By logging in you accept our&nbsp;
            <a
              href="https://youtu.be/dQw4w9WgXcQ"
              className="text-accent hover:underline"
            >
              Privacy Policy
            </a>
            &nbsp;and&nbsp;
            <a
              href="https://youtu.be/dQw4w9WgXcQ"
              className="text-accent hover:underline"
            >
              Terms of Service
            </a>
            .
          </p>
        </div>
        <div className="flex-col gap-4">
          <LoginButton
          // oauthUrl={`${apiBaseUrl}/auth/github/web`}
          >
            <SvgSolidUser width={20} height={20} />
            Login
          </LoginButton>

          <LoginButton dev onClick={() => {}}>
            <SvgSolidBug width={20} height={20} />
            Login Invite
          </LoginButton>
        </div>
      </div>
      <div className="absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
        <div className="hidden sm:flex">
          <SvgSolidLogo />
        </div>
        <div className="gap-6 text-primary-300">
          <a
            href="https://youtu.be/dQw4w9WgXcQ"
            className="hover:text-primary-200"
          >
            Privacy policy
          </a>
          <a
            href="https://www.youtube.com/watch?v=Soa3gO7tL-c&list=RDSoa3gO7tL-c&start_radio=1"
            className="hover:text-primary-200"
          >
            Report a bug
          </a>
          <div className="gap-6 sm:gap-4">
            <a
              href="https://github.com/mauriciocartagena"
              target="_blank"
              rel="noreferrer"
            >
              <SvgSolidFacebook
                width={20}
                height={20}
                className="cursor-pointer hover:text-primary-200"
              />
            </a>
            <a
              href="https://github.com/mauriciocartagena"
              target="_blank"
              rel="noreferrer"
            >
              <SvgSolidInstagram
                width={20}
                height={20}
                className="hover:text-primary-200"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
