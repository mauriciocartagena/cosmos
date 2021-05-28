import router from "next/router";
import React from "react";
import SvgSolidBug from "../../icons/SolidBug";
import SvgSolidUser from "../../icons/SolidUser";
// import { LgLogo } from "../../icons";
import SvgSolidLogo from "../../icons/SvgSolidLogo";
import { LoginButton } from "../../utils/LoginButton";
import { FooterController } from "../display/FooterController";
import { HeaderController } from "../display/HeaderController";

/*
i know this code is kinda garbage but that's because the mockup is garbage and doesn't use the design system
 */

export interface LoginButtonProps {
  children: [React.ReactNode, React.ReactNode];
  dev?: true;
  onClick?: () => void;
  oauthUrl?: string; // React.FC didn't like & ({ onClick: () => void } | { oauthUrl: string }) so yeah
}

export const LoginPage: React.FC = () => {
  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateRows: "1fr auto 1fr",
      }}
    >
      <HeaderController embed={{}} title="Welcome" />
      <div className="hidden sm:flex" />
      <div className="flex justify-self-center self-center sm:hidden">
        {/* <LgLogo /> */}
        <SvgSolidLogo />
      </div>
      <div className="flex m-auto flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 z-10 sm:w-400 w-full">
        <div className="flex gap-2 flex-col">
          <span className="text-3xl text-primary-100 font-bold">
            Bienvenido
          </span>
          <div className="text-primary-100 flex-wrap">
            Eliga una forma de Iniciar sección&nbsp;
            <a
              href="/privacy-policy.html"
              className="text-accent hover:underline"
            >
              Privacy Policy
            </a>
            &nbsp;and&nbsp;
            <a href="/terms.html" className="text-accent hover:underline">
              Terms of Service
            </a>
            .
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <LoginButton
            onClick={() => {
              router.push("/login");
            }}
          >
            <SvgSolidUser width={20} height={20} />
            Login
          </LoginButton>
          <LoginButton
            dev
            onClick={() => {
              router.push("/info");
            }}
          >
            <SvgSolidBug width={20} height={20} />
            Login Invite
          </LoginButton>
        </div>
      </div>
      <FooterController />
    </div>
  );
};
