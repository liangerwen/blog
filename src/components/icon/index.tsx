"use client";

import { Icon as _Icon, IconProps } from "@iconify/react";
import cls from "classnames";

import styles from "./index.module.scss";

export default function Icon(props: IconProps) {
  const { className, ...rest } = props;
  return (
    <span className={cls(styles["lew-icon"], className)} role="img">
      <_Icon {...rest} />
    </span>
  );
}
