import React from "react";
import SvgSolidLogo from "../../icons/SvgSolidLogo";
import { HeaderController } from "../../modules/display/HeaderController";
import { ProfileTabs } from "../../ui/ProfileTabs";
import { withApollo } from "../../utils/withApollo";
import { useScreenType } from "../../shared-hooks/useScreenType";
import router from "next/router";
import { Button } from "../../form-fields/Button";

interface InfoProps {}

const Info: React.FC<InfoProps> = ({}) => {
  const screenType = useScreenType();
  return (
    <>
      <HeaderController embed={{}} title="Informatión" />
      <div className="">
        <div className="grid grid-cols-2 justify-items-center gap-4 pt-5 pl-2">
          <div>
            <SvgSolidLogo />
          </div>
          <div>
            {screenType === "3-cols" ? (
              <Button onClickCapture={() => router.push("/")}>Regresar</Button>
            ) : (
              <div className="flex justify-center w-full">
                <Button onClickCapture={() => router.push("/")}>
                  Regresar
                </Button>
              </div>
            )}
          </div>
        </div>
        <ProfileTabs />
      </div>
    </>
  );
};

export default withApollo({ ssr: true })(Info);
