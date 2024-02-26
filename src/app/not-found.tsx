"use client";

import MainContainer from "../components/main-container";
import { titillium_web } from "./fonts";
import cls from "classnames";

export default function NotFound() {
  return (
    <MainContainer
      showSideBar={false}
      rootClassName="h-screen"
      className={cls("flex justify-center items-center")}
    >
      <div className="max-w-[920px] h-[360px] w-full flex card md:flex-col md:h-[500px]">
        <div className="bg-[#49b1f5] cover-img-box w-1/2 h-full md:w-full md:h-[45%]">
          <img className="cover-img" src="/images/404.png" alt="页面未找到" />
        </div>
        <div
          className={cls(
            titillium_web.className,
            "bg-[var(--card-bg)] flex justify-center flex-col text-center w-1/2 h-full md:w-full md:h-[55%]"
          )}
        >
          <h1 className="text-[9em] font-[700] my-[0.5em]">404</h1>
          <p className="text-[1.6em]">页面未找到</p>
        </div>
      </div>
    </MainContainer>
  );
}
