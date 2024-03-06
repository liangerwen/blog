"use client";

import { ComponentProps, ReactNode, isValidElement } from "react";
import cls from "classnames";
import { MDXComponents } from "mdx/types";
import Code from "../code";
import BlockCode from "../../block-code";

import styles from "./index.module.scss";

const getLanguageByClassName = (className?: string) => {
  const start = "language-";
  return className
    ?.split(" ")
    .find((c) => c.startsWith(start))
    ?.split(start)?.[1];
};

const Pre: Required<MDXComponents>["pre"] = ({
  children,
  className,
  ...props
}) => {
  const renderChildren = (children: ReactNode) => {
    if (
      isValidElement<ComponentProps<"code">>(children) &&
      children.type === Code
    ) {
      const { className: codeCls, children: child, ...props } = children.props;
      if (typeof child === "string") {
        const language = getLanguageByClassName(codeCls);
        return (
          <BlockCode
            className="highlight-code"
            code={child}
            language={language}
            {...props}
          />
        );
      }
    }
    return children;
  };
  return (
    <pre className={cls(styles["mdx-pre"], className)} {...props}>
      {renderChildren(children)}
    </pre>
  );
};

export default Pre;
