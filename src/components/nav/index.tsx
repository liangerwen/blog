"use client";

import config from "@/src/config";
import useScroll from "@/src/hooks/use-scroll";
import cls from "classnames";
import Link from "next/link";
import Search from "../search";
import Icon from "../icon";

const menuItemClassName =
  "relative inline-flex gap-1 cursor-pointer after:content-[''] after:hover:w-full after:block after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[3px] after:bg-[var(--primary-color)] after:transition-all after:duration-300 after:opacity-80";

export default function Nav() {
  const { up, noDirection, y } = useScroll();
  return (
    <div
      className={cls(
        "w-full h-[60px] left-0 z-50 transition top-0 px-4 flex justify-between items-center",
        (up || noDirection) && y > 0
          ? "fixed bg-[var(--header-bg)] fade-move-down text-[var(--header-color)]"
          : "absolute text-[var(--button-color)]"
      )}
    >
      <Link
        href="/"
        title={config.name}
        className="no-underline font-bold text-[1.3em] opacity-90 hover:text-inherit hover:opacity-100"
      >
        {config.name}
      </Link>
      <ul className=" list-none flex gap-4">
        <Search
          trigger={
            <li className={menuItemClassName}>
              <Icon icon="mdi:magnify" width={20} />
              搜索
            </li>
          }
        />
        <li className={menuItemClassName}>
          <Link
            className="inline-flex gap-1 cursor-pointer no-underline hover:text-inherit"
            href="/archives"
          >
            <Icon icon="mi:archive" width={18} />
            归档
          </Link>
        </li>
        <li className={menuItemClassName}>
          <Link
            className="inline-flex gap-1 cursor-pointer no-underline hover:text-inherit"
            href="/about"
          >
            <Icon icon="lucide:user-round" width={18} />
            关于
          </Link>
        </li>
        <li className={menuItemClassName}>
          <Link
            className="inline-flex gap-1 cursor-pointer no-underline hover:text-inherit"
            href="/links"
          >
            <Icon icon="mingcute:link-line" width={18} />
            友链
          </Link>
        </li>
      </ul>
    </div>
  );
}
