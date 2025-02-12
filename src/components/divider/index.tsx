import React, { ReactNode } from "react";
import Icon from "../icon";
import cls from "classnames";

import styles from "./index.module.scss";

export interface DividerProps {
  className?: string;
  icon?: ReactNode;
}

export default function Divider({
  className,
  icon = <Icon icon="mdi:dinosaur-pixel" />,
}: DividerProps) {
  return (
    <span className={cls(styles["lew-divider"], className)}>
      <hr className={styles["lew-divider-line"]} />
      <span className={styles["lew-divider-icon"]}>{icon}</span>
    </span>
  );
}
