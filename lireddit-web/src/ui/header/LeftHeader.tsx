import Link from "next/link";
import React from "react";
import { LogoIcon } from "../../icons";
import { useScreenType } from "../../shared-hooks/useScreenType";
import SvgSolidLogo from "../../icons/SvgSolidLogo";

export interface LeftHeaderProps {}

const LeftHeader: React.FC<LeftHeaderProps> = ({}) => {
  const screenType = useScreenType();
  return (
    <Link href="/dasboard">
      <a data-testid="logo-link" className="w-full">
        {screenType === "3-cols" ? (
          <SvgSolidLogo />
        ) : (
          <div className="flex justify-center w-full">
            <LogoIcon width={40} height={40} color="#EFE7DC" />
          </div>
        )}
      </a>
    </Link>
  );
};

export default LeftHeader;
