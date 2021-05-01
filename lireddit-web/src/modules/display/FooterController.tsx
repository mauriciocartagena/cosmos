import React from "react";
import { SvgSolidFacebook } from "../../icons";
import SvgSolidInstagram from "../../icons/SolidInstagram";
import SvgSolidLogo from "../../icons/SvgSolidLogo";

interface FooterControllerProps {}

export const FooterController: React.FC<FooterControllerProps> = ({}) => {
  return (
    <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
      <div className="hidden sm:flex">
        <SvgSolidLogo />
      </div>
      <div className="flex flex-row gap-6 text-primary-300">
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
        <div className="flex flex-row gap-6 sm:gap-4">
          <a
            href="https://github.com/mauriciocartagena"
            target="_blank"
            rel="noreferrer"
          >
            <SvgSolidFacebook
              width={20}
              height={20}
              className="ml-2 cursor-pointer hover:text-primary-200"
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
              className="ml-2 hover:text-primary-200"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
