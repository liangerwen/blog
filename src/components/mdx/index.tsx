"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import {
  ComponentProps,
  ElementType,
  createElement,
  useEffect,
  useRef,
} from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Tabs, { TabItem } from "../tabs";
import Pre from "./pre";
import Icon from "../icon";
import Button from "../button";
import BlockCode from "../block-code";
import cls from "classnames";

import styles from "./index.module.scss";
import { fira_code, titillium_web } from "@/src/app/fonts";
import Code from "./code";
import Divider from "../divider";

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
  elements: (T | { element: T; className: string })[]
): { [K in T]?: MDXComponents[K] } => {
  const ret: { [K in T]?: MDXComponents[K] } = {};
  elements.forEach((e) => {
    if (typeof e === "string") {
      // @ts-ignore
      ret[e] = ({ className, ...props }: ComponentProps<T>) =>
        createElement(e, {
          className: cls(styles[`mdx-${e}`], className),
          ...props,
        });
    } else {
      // @ts-ignore
      ret[e.element] = ({ className, ...props }: ComponentProps<T>) =>
        createElement(e.element, {
          className: cls(styles[`mdx-${e.element}`], e.className, className),
          ...props,
        });
    }
  });
  return ret;
};

const components: MDXComponents = {
  ...createHeadings(),
  ...createMdxElement([
    "p",
    "a",
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
  ]),
  code: Code,
  pre: Pre,
  hr: Divider,
  img: ({ src, className, ...props }) => {
    return (
      <a data-fancybox="post" href={src}>
        <img
          src={src}
          className={cls(styles["mdx-img"], className)}
          {...props}
        />
      </a>
    );
  },
  Button,
  Tabs,
  Tab: TabItem,
  Icon,
  BlockCode,
};

interface MdxProps {
  code: string;
}

export default function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;

    NativeFancybox.bind(container, "[data-fancybox]");

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Component components={components} />
    </div>
  );
}
