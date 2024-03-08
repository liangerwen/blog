import type { Metadata } from "next";
import cls from "classnames";
import { space_mono } from "./fonts";
import Nav from "../components/nav";
import Toolbar from "../components/toolbar";
import { ThemeProvider } from "../components/theme";
import config from "../config";
import { cookies } from "next/headers";
import { parse } from "../hooks/json";
import { THEME_KEY, ThemeType } from "../constants/theme";
import Script from "next/script";

import "./styles/index.scss";

export const metadata: Metadata = {
  title: config.name,
  description: config.name,
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().get(THEME_KEY);
  const theme = cookie ? parse(cookie.value) : ThemeType.LIGHT;
  return (
    <html lang="zh-CN" data-theme={theme}>
      <Script src="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js" />
      <body className={cls(space_mono.className, "relative")}>
        <ThemeProvider>
          <Nav />
          {children}
          <Toolbar />
        </ThemeProvider>
        {/* @ts-ignore */}
        <meting-js
          server="netease"
          type="playlist"
          id="2312165875"
          fixed
          mini
        />
      </body>
    </html>
  );
}
