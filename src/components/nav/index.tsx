"use client";

import config from "@/src/config";
import useScroll from "@/src/hooks/use-scroll";
import cls from "classnames";
import Link from "next/link";

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
      <div></div>
    </div>
  );
}
