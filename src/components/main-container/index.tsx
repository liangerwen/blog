"use client";

import { ReactNode } from "react";
import cls from "classnames";
import AuthorCard from "../author-card";
import DirectoryCard, { DirectoryTreeItem } from "../directory-card";

export interface MainContainerProps {
  className?: string;
  rootClassName?: string;
  children?: ReactNode;
  showSideBar?: boolean;
  toc?: DirectoryTreeItem[];
}

export default function MainContainer({
  children,
  className,
  showSideBar = true,
  rootClassName,
  toc,
}: MainContainerProps) {
  return (
    <main
      className={cls(
        "mt-0 mx-auto max-w-[1200px] flex lg:flex-col px-[15px] py-[40px] md:px-[5px] md:py-[20px] relative",
        rootClassName
      )}
    >
      <div className={cls("flex-1 max-w-full", className)}>{children}</div>
      {showSideBar && (
        <div className="w-[280px] flex-shrink-0 ml-[16px] lg:ml-0 lg:mt-[20px] lg:w-full sticky top-[20px] h-fit">
          <AuthorCard />
          <DirectoryCard toc={toc} className="mt-[16px]" />
        </div>
      )}
    </main>
  );
}
