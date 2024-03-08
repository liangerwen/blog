"use client";

import { TocItem } from "@/plugins/remark-plugin";
import { getRootPageTop } from "@/src/utils/dom";
import cls from "classnames";
import { throttle } from "lodash-es";
import { useEffect, useState } from "react";
import Icon from "../icon";

export type DirectoryTreeItem = TocItem & {
  children?: DirectoryTreeItem[];
  parentId?: string;
};

const directoryTree = (directory: DirectoryTreeItem[]) => {
  const queue = [directory[0]];

  for (let i = 1; i < directory.length; i++) {
    const current = directory[i],
      prev = directory[i - 1];
    if (current.depth > prev.depth) {
      current.parentId = prev.url;
    } else {
      do {
        const last = queue[queue.length - 1];
        if (last.depth < current.depth) break;
        queue.pop();
      } while (queue.length);
      if (queue.length) {
        current.parentId = queue[queue.length - 1].url;
      }
    }
    queue.push(current);
  }
  return directory;
};

export interface DirectoryCardProps {
  toc?: DirectoryTreeItem[];
  className?: string;
}

export default function DirectoryCard({
  toc = [],
  className,
}: DirectoryCardProps) {
  const root = directoryTree(toc);
  const [active, setActive] = useState<string | undefined>();
  const renderDirectoryTree = (directory: DirectoryTreeItem[], prefix = "") => {
    return directory.map((d, idx) => {
      const children = root.filter((i) => i.parentId === d.url);
      const nextPrefix = `${prefix}${idx + 1}.`;
      return (
        <div key={d.url}>
          <a
            href={d.url}
            className={cls(
              "block no-underline px-[6px] my-[4px]",
              active === d.url &&
                "bg-[#00c4b6] text-[var(--button-color)] hover:text-[var(--button-color)] transition"
            )}
          >
            {nextPrefix}
            {d.value}
          </a>
          {children.length > 0 && (
            <div className="ml-[10px] pl-[10px] border-l border-solid">
              {renderDirectoryTree(children, nextPrefix)}
            </div>
          )}
        </div>
      );
    });
  };
  useEffect(() => {
    const reg = /^#/;
    const headings = toc.map((t) => {
      const dom = document.getElementById(t.url.replace(reg, ""))!;
      const top = getRootPageTop(dom);
      return {
        key: t.url,
        top,
      };
    });
    const listener = throttle(() => {
      const scrollTop = Math.ceil(window.scrollY);
      const currentHeading = headings.findLast((h) => scrollTop >= h.top);
      setActive(currentHeading?.key);
    }, 100);
    listener();
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  return (
    toc &&
    toc.length > 0 && (
      <div className={cls("card px-[24px] py-[20px]", className)}>
        <h3 className="mb-2">
          <Icon icon="noto-v1:carp-streamer" className="mr-2" />
          目录
        </h3>
        {renderDirectoryTree(root.filter((i) => !i.parentId))}
      </div>
    )
  );
}
