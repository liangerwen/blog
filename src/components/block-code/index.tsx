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
  language: string;
};

export default function BlockCode({
  className,
  code,
  language,
  ...props
}: BlockCodeProps) {
  const [expend, setExpend] = useState(false);
  const [showCode, setShowCode] = useState(true);

  const innerHtml = (
    language
      ? hljs.highlight(code, { language, ignoreIllegals: true })
      : hljs.highlightAuto(code)
  ).value;
  const lines = innerHtml.split(/\n/).slice(0, -1);
  const html = `<ol class="${styles["code-list"]}">${(expend
    ? lines
    : lines.slice(0, expendLine)
  )
    .map(
      (item, index) =>
        `<li><i class=${styles["code-line"]} style="width: ${
          lines.length.toString().length * 8 + 20
        }px">${index + 1}</i>${item}</li>`
    )
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
          <span className={styles["code-lang"]}>{language.toUpperCase()}</span>
        </div>
        <Copy content={code} />
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
