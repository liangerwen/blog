"use client";

import { ReactNode } from "react";
import cls from "classnames";
import { useMediaQuery } from "usehooks-ts";

export interface MainContainerProps {
  className?: string;
  rootClassName?: string;
  children?: ReactNode;
  showSideBar?: boolean;
}

export default function MainContainer({
  children,
  className,
  showSideBar = true,
  rootClassName,
}: MainContainerProps) {
  const matchs = useMediaQuery("(min-width: 768px)", {
    defaultValue: true,
    initializeWithValue: false,
  });
  return (
    <main
      className={cls(
        "mt-0 mx-auto max-w-[1200px] flex",
        matchs ? "py-[40px] px-[15px]" : "px-[5px] py-[20px]",
        rootClassName
      )}
    >
      <div className={cls("flex-1 max-w-full", className)}>{children}</div>
      {matchs && showSideBar && (
        <div className="w-[280px] flex-shrink-0 ml-[16px]">
          <div className="card px-[40px] py-[50px]"></div>
        </div>
      )}
    </main>
  );
}
