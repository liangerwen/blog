import React from "react";
import CoverBackground from "@/src/components/cover-background";
import Footer from "@/src/components/footer";
import MainContainer from "@/src/components/main-container";
import Waline from "@/src/components/waline";
import { Metadata } from "next";
import config from "@/src/config";
import Mdx from "@/src/components/mdx";
import { about } from "@/src/data";
import Divider from "@/src/components/divider";

export const metadata: Metadata = {
  title: `关于 | ${config.name}`,
};

export default function About() {
  return (
    <>
      <CoverBackground
        cover={about?.cover}
        element="header"
        className="flex items-center justify-center"
      >
        <h1 className="text-white opacity-90 font-bold text-6xl">关于</h1>
      </CoverBackground>
      <MainContainer className="card p-10 md:p-5" rootClassName="fade-move-up">
        <Mdx code={about?.body?.code!} />
        {about?.comment && (
          <>
            <Divider />
            <Waline />
          </>
        )}
      </MainContainer>
      <Footer cover={about?.cover} className="fade-move-up" />
    </>
  );
}
