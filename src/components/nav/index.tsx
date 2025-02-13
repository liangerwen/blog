"use client";

import config from "@/src/config";
import useScroll from "@/src/hooks/use-scroll";
import cls from "classnames";
import Link from "next/link";
import Search from "../search";
import Icon from "../icon";
import { useMedia } from "react-use";
import { useState } from "react";
import Drawer from "../drawer";
import Image from "../image";

const menuItemClassName =
  "relative inline-flex gap-1 cursor-pointer after:content-[''] after:hover:w-full after:block after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[3px] after:bg-[var(--primary-color)] after:transition-all after:duration-300 after:opacity-80";

const menus = [
  {
    icon: <Icon icon="mi:archive" width={18} />,
    url: "/archives",
    title: "归档",
  },
  {
    icon: <Icon icon="lucide:user-round" width={18} />,
    url: "/about",
    title: "关于",
  },
  {
    icon: <Icon icon="mingcute:link-line" width={18} />,
    url: "/links",
    title: "友链",
  },
];

export default function Nav() {
  const { up, noDirection, y } = useScroll();
  const isMobile = useMedia("(max-width: 640px)");
  const [open, setOpen] = useState(false);
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
      {isMobile ? (
        <ul className="flex gap-4">
          <Search
            trigger={
              <li className={menuItemClassName}>
                <Icon icon="cuida:search-outline" width={20} />
              </li>
            }
          />
          <li className={menuItemClassName}>
            <Icon
              icon="material-symbols:menu-rounded"
              fontSize={24}
              cursor={"pointer"}
              className="hidden moblie:block"
              onClick={() => setOpen(true)}
            />
          </li>
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            width="50%"
            placement="right"
            className="p-4"
          >
            <Image
              src={config.avatar}
              alt={config.name}
              className="mx-auto rounded-full w-[110px] h-[110px] object-cover transition duration-300 hover:rotate-[360deg] mb-4"
            />
            <ul className="flex flex-col gap-2 w-full p-3 rounded-xl border border-[var(--post-copyright-border-color)]">
              {menus.map((menu) => (
                <li key={menu.url}>
                  <Link
                    className="inline-flex gap-1 cursor-pointer no-underline size-full text-[var(--card-color)] hover:text-[var(--button-color)] px-4 py-2 hover:bg-[var(--primary-color)] rounded-lg"
                    href={menu.url}
                    onClick={() => setOpen(false)}
                  >
                    {menu.icon}
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Drawer>
        </ul>
      ) : (
        <ul className="flex gap-4">
          <Search
            trigger={
              <li className={menuItemClassName}>
                <Icon icon="cuida:search-outline" width={20} />
                搜索
              </li>
            }
          />
          {menus.map((menu) => (
            <li className={menuItemClassName} key={menu.url}>
              <Link
                className="inline-flex gap-1 cursor-pointer no-underline hover:text-inherit"
                href={menu.url}
              >
                {menu.icon}
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
