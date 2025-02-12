"use client";

import { fira_code } from "@/src/app/fonts";
import hljs from "highlight.js";
import { ComponentProps, useState } from "react";
import Copy from "../copy";
import Icon from "../icon";
import config from "@/src/config";
import cls from "classnames";

import styles from "./index.module.scss";

const expendLine = config.post.expendLine;

type BlockCodeProps = Omit<
  ComponentProps<"code">,
  "dangerouslySetInnerHTML" | "children"
> & {
  code: string;
  language?: string;
  title?: string;
};

export default function BlockCode({
  className,
  code,
  language,
  title,
  ...props
}: BlockCodeProps) {
  const [expend, setExpend] = useState(false);
  const [showCode, setShowCode] = useState(true);

  let innerHtml = code;

  try {
    innerHtml = (
      language
        ? hljs.highlight(code, { language, ignoreIllegals: true })
        : hljs.highlightAuto(code)
    ).value;
  } catch {}

  const lines = innerHtml.split(/\n/);
  // 去除空白尾行
  if (!lines[lines.length - 1]) {
    lines.pop();
  }
  const html = `<ol class="${styles["code-list"]}">${(expend
    ? lines
    : lines.slice(0, expendLine)
  )
    .map((item, index) => {
      const delLine = item.startsWith("[-]");
      const addLine = item.startsWith("[+]");
      if (delLine) {
        item = `<span style="color:rgb(239, 68, 68)">- </span>${item
          .split("[-]")[1]
          .trim()}`;
      } else if (addLine) {
        item = `<span style="color:rgb(34, 197, 94)">+ </span>${item
          .split("[+]")[1]
          .trim()}`;
      }
      return `<li class="${cls(styles["code-line"], {
        [styles["code-line__del"]]: delLine,
        [styles["code-line__add"]]: addLine,
      })}"><i class="${styles["code-line-idx"]}" style="width: ${
        lines.length.toString().length * 8 + 20
      }px">${index + 1}</i>${item}</li>`;
    })
    .join("")}</ol>`;

  return (
    <>
      <div className={styles["code-tools"]}>
        <div className={styles["code-tools-start"]}>
          <Icon
            icon="pepicons-pop:angle-down"
            className={cls(
              styles["code-collapse"],
              !showCode && styles["code-collapse__hide"]
            )}
            onClick={() => setShowCode((show) => !show)}
          />
          <span className={styles["code-lang"]}>
            {(language || "code").toUpperCase()}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <span>{title}</span>
          <Copy content={code} />
        </div>
      </div>
      {showCode && (
        <div
          className={cls(
            styles["code-body"],
            expend && lines.length > expendLine && styles["code-body__expend"],
            className
          )}
        >
          <code
            {...props}
            className={cls(fira_code.className, styles["code-content"])}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {lines.length > expendLine && (
            <div
              className={styles["code-expend"]}
              onClick={() => {
                setExpend((e) => !e);
              }}
            >
              <Icon
                icon="ic:round-double-arrow"
                className={cls(
                  styles["code-expend-icon"],
                  expend && styles["code-expend-icon__expend"]
                )}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
