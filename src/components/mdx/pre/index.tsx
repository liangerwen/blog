"use client";

import { ComponentProps, ReactNode, isValidElement } from "react";
import cls from "classnames";
import { MDXComponents } from "mdx/types";
import Code from "../code";
import BlockCode from "../../block-code";

import styles from "./index.module.scss";

const Pre: Required<MDXComponents>["pre"] = ({
  children,
  className,
  ...rest
}) => {
  const renderChildren = (children: ReactNode) => {
    if (
      isValidElement<
        ComponentProps<"code"> & {
          "data-lang": string;
          "data-title": string;
        }
      >(children) &&
      children.type === Code
    ) {
      const { className: codeCls, children: child, ...props } = children.props;
      if (typeof child === "string") {
        return (
          <BlockCode
            className="highlight-code"
            code={child}
            language={props["data-lang"]}
            title={props["data-title"]}
            {...props}
          />
        );
      }
    }
    return children;
  };
  return (
    <pre className={cls(styles["mdx-pre"], className)} {...rest}>
      {renderChildren(children)}
    </pre>
  );
};

export default Pre;
