import React, { useCallback, useEffect } from "react";
import { useSpring, a, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import { createPortal } from "react-dom";

import { SolidBug, SolidUser, OutlineGlobe, SolidLogOut } from "../../icons";
import router from "next/router";
import { useAccountOverlay } from "../global-stores/useAccountOverlay";
import { useLogoutMutation } from "../../generated/graphql";
import { SettingsIcon } from "../SettingsIcon";
import { withApollo } from "../../utils/withApollo";

export interface AccountOverlyProps {}

const height = 380 + 40;

const AccountOverlay: React.FC<AccountOverlyProps> = ({}) => {
  const { isOpen, set: setOpen } = useAccountOverlay((s) => s);
  const [{ y }, set] = useSpring(() => ({ y: height }));
  const [logout] = useLogoutMutation();
  const open = useCallback(() => {
    set({
      y: 0,
      immediate: false,
      config: { mass: 1, tension: 200, friction: 25 },
    });
  }, [set]);

  const close = (velocity = 0) => {
    set({ y: height, immediate: false, config: { ...config.stiff, velocity } });
    setOpen({ isOpen: false });
  };

  const bind = useDrag(
    ({ last, vxvy: [, vy], movement: [, my], cancel }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || vy > 0.5) close(vy);
        else open();
      } else {
        set({ y: my, immediate: true });
      }
    },
    {
      initial: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  const display = y.to((py) => (py < height ? "block" : "none"));

  const bgStyle = {
    opacity: y.to([0, height], [0.8, 0], "clamp"),
  };

  useEffect(() => {
    if (isOpen) {
      open();
    }
  }, [isOpen, open]);

  return createPortal(
    <a.div className="absolute w-screen h-full" style={{ display }}>
      <a.div
        className="w-screen h-screen absolute left-0 bg-black z-10 opacity-100"
        onClick={() => close()}
        style={bgStyle}
      ></a.div>
      <a.div
        className="bg-primary-800 w-full h-full rounded-t-20 relative pt-5"
        {...bind()}
        style={{
          bottom: `calc(-100% + ${height - 100}px)`,
          y,
          zIndex: 11,
          touchAction: "none",
        }}
      >
        <div className="bg-primary-600 rounded-full w-6 h-1 absolute top-3 left-2/4 transform -translate-x-1/2"></div>
        <div>
          <SettingsIcon
            icon={
              <SolidUser className="text-primary-100" width="20" height="20" />
            }
            label={"Cuenta"}
            onClick={() => {
              close();
              router.push("/account");
            }}
          />
          <SettingsIcon
            icon={
              <OutlineGlobe
                className="text-primary-100"
                width="20"
                height="20"
              />
            }
            label={"Administracion de post"}
            transition
            onClick={() => {
              close();
              router.push("/post");
            }}
          />
          <a
            href="https://github.com/mauriciocartagena"
            target="_blank"
            rel="noreferrer"
          >
            <SettingsIcon
              icon={
                <SolidBug className="text-primary-100" width="20" height="20" />
              }
              label={"Reportar un problema"}
              transition
            />
          </a>
          <SettingsIcon
            label={"Cerrar Sessión"}
            last
            icon={
              <SolidLogOut
                width="20"
                height="20"
                className="text-primary-100"
              />
            }
            onClick={() => {
              logout();
              setOpen({ isOpen: false });
              router.push("/");
            }}
          />
        </div>
      </a.div>
    </a.div>,
    document.querySelector("#__next")!
  );
};
export default withApollo({ ssr: false })(AccountOverlay);
