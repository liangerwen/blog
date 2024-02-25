"use client";
import React, { useEffect, useRef } from "react";
import {
  type WalineInstance,
  type WalineInitOptions,
  init,
} from "@waline/client";
import { useTheme } from "../theme";
import { ThemeType } from "@/src/constants/theme";

export type WalineOptions = Omit<WalineInitOptions, "el"> & { path: string };

const Waline = () => {
  const walineInstanceRef = useRef<WalineInstance | null>(null);
  const containerRef = React.createRef<HTMLDivElement>();
  const { theme } = useTheme();

  useEffect(() => {
    walineInstanceRef.current = init({
      comment: true,
      pageview: true,
      serverURL:
        "https://blog-waline-git-main-liangerwens-projects.vercel.app/",
      el: containerRef.current,
      login: "force",
      locale: {
        placeholder:
          "大侠请留步，留下评论再走也不迟 (￣︶￣*))\n\n要求登录是为了防止机器人滥用评论，并保证回复通知的送达 ヾ(≧▽≦*)o\n感谢理解！（＞人＜；）",
      },
    });

    return () => walineInstanceRef.current?.destroy();
  }, []);

  useEffect(() => {
    walineInstanceRef.current?.update({
      dark: theme === ThemeType.DARK,
    });
  }, [theme]);

  return <div ref={containerRef} />;
};

export default Waline;
