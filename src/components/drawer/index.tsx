import { default as RcDrawer, DrawerProps } from "rc-drawer";
import cls from "classnames";

import "rc-drawer/assets/index.css";
import "./rc-drawer.scss";

const Drawer = (
  props: Omit<DrawerProps, "classNames" | "className"> & {
    className?: string;
  }
) => {
  return (
    <RcDrawer
      {...props}
      classNames={{
        mask: "!bg-[var(--mask-bg-color)]",
        section: cls("!bg-[var(--modal-bg)] size-full", props.className),
      }}
      maskMotion={{
        motionAppear: true,
        motionName: "mask-motion",
      }}
      motion={(placement) => ({
        motionAppear: true,
        motionName: `panel-motion-${placement}`,
      })}
      rootStyle={{ pointerEvents: props.open ? "auto" : "none" }}
    />
  );
};

export default Drawer;
