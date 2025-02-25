"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import React, { ComponentProps, createElement, useEffect, useRef } from "react";
import Tabs, { TabItem } from "../tabs";
import Pre from "./pre";
import Icon from "../icon";
import Button from "../button";
import BlockCode from "../block-code";
import cls from "classnames";
import { titillium_web } from "@/src/app/fonts";
import Code from "./code";
import Divider from "../divider";
import YouTube from "../youtube";
import Bilibili from "../bilibili";
import StackBlitz from "../stackblitz";
import CodeSandbox from "../codesandbox";
import CodePen from "../codepen";
import { Fancybox } from "@fancyapps/ui";

import styles from "./index.module.scss";

import "@fancyapps/ui/dist/fancybox/fancybox.css";

type H = `h${1 | 2 | 3 | 4 | 5 | 6}`;

const createHeadings = () => {
  const ret: Partial<Record<H, MDXComponents[H]>> = {};
  for (let i = 1; i <= 6; i++) {
    ret[`h${i}` as H] = ({ className, ...props }: ComponentProps<H>) =>
      createElement(`h${i}`, {
        className: cls(
          styles["mdx-heading"],
          styles[`mdx-heading-${i}`],
          className
        ),
        ...props,
      });
  }
  return ret;
};

const createMdxElement = <T extends keyof JSX.IntrinsicElements>(
  elements: (T | { element: T; className?: string })[]
): { [K in T]?: MDXComponents[K] } => {
  const ret: { [K in T]?: MDXComponents[K] } = {};
  elements.forEach((e) => {
    const opt: { element: T; className?: string } =
      typeof e === "string" ? { element: e } : e;
    const Component = ({ className, ...props }: ComponentProps<T>) =>
      createElement(opt.element, {
        className: cls(styles[`mdx-${opt.element}`], opt.className, className),
        ...props,
      });
    ret[opt.element] = Component as MDXComponents[T];
  });
  return ret;
};

const components: MDXComponents = {
  ...createHeadings(),
  ...createMdxElement([
    "p",
    "span",
    { element: "blockquote", className: titillium_web.className },
    "table",
    "thead",
    "th",
    "td",
    "ul",
    "ol",
    "li",
    "input",
    "img",
  ]),
  a: ({ className, target, ...props }) => {
    return (
      <a
        className={cls(styles["mdx-a"], className)}
        target={target ?? "_blank"}
        {...props}
      />
    );
  },
  table: ({ className, ...props }) => {
    return (
      <div className="w-full overflow-x-auto">
        <table className={cls(styles["mdx-table"], className)} {...props} />
      </div>
    );
  },
  code: Code,
  pre: Pre,
  hr: Divider,
  Button,
  Tabs,
  Tab: TabItem,
  Icon,
  BlockCode,
  YouTube,
  Bilibili,
  StackBlitz,
  CodeSandbox,
  CodePen,
};

interface MdxProps {
  code: string;
}

export default function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    Fancybox.bind(container, "img", { groupAll: true });
    return () => {
      Fancybox.unbind(container);
      Fancybox.close();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles["mdx"]}>
      <Component components={components} />
    </div>
  );
}
