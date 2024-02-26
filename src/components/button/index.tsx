import { Children, MouseEventHandler, ReactNode } from "react";
import cls from "classnames";
import styles from "./index.module.scss";

interface ButtonProps {
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  block?: boolean;
}

export default function Button(
  props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { icon, children, className, onClick, block = false, ...rest } = props;
  const emptyChildren = children === null || children === undefined;
  return (
    <button
      type="button"
      className={cls(
        styles["lew-button"],
        block && styles["lew-button__block"],
        icon && emptyChildren && styles["lew-button__icon-only"],
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {icon && <span className={styles["lew-button-icon"]}>{icon}</span>}
      {children}
    </button>
  );
}
