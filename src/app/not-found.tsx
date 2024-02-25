"use client";

import { useMediaQuery } from "usehooks-ts";
import MainContainer from "../components/main-container";
import { titillium_web } from "./fonts";
import cls from "classnames";

export default function notFound() {
  const matchs = useMediaQuery("(max-width: 768px)", {
    initializeWithValue: false,
  });
  return (
    <MainContainer
      showSideBar={false}
      rootClassName="h-screen"
      className={cls("flex justify-center items-center")}
    >
      <div
        className={cls(
          "max-w-[920px] w-full flex card",
          matchs ? "flex-col h-[500px]" : "h-[360px]"
        )}
      >
        <div
          className={cls(
            "bg-[#49b1f5] cover-img-box",
            matchs ? "h-[45%]" : "w-1/2"
          )}
        >
          <img className="cover-img" src="/images/404.png" alt="页面未找到" />
        </div>
        <div
          className={cls(
            titillium_web.className,
            "bg-[var(--card-bg)] flex justify-center flex-col text-center",
            matchs ? "h-[55%]" : "w-1/2"
          )}
        >
          <h1 className="text-[9em] font-[700] my-[0.5em]">404</h1>
          <p className="text-[1.6em]">页面未找到</p>
        </div>
      </div>
    </MainContainer>
  );
}
