import { fira_code } from "@/src/app/fonts";
import cls from "classnames";
import { MDXComponents } from "mdx/types";
import styles from './index.module.scss'

const Code: Required<MDXComponents>["code"] = ({ className, ...props }) => {
  return (
    <code
      {...props}
      className={cls(styles["mdx-code"], fira_code.className, className)}
    />
  );
};

export default Code;
