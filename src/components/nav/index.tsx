"use client";

import useScroll from "@/src/hooks/use-scroll";
import cls from "classnames";

export default function Nav() {
  const { up, y } = useScroll();
  return (
    <div
      className={cls(
        "w-full h-[60px] left-0 z-50 transition top-0 text-[var(--header-color)]",
        up && y > 0 ? "fixed bg-[var(--header-bg)]" : "absolute"
      )}
    >
      hahahhh
    </div>
  );
}
