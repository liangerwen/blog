import React from "react";
import CoverBackground from "@/src/components/cover-background";
import Footer from "@/src/components/footer";
import MainContainer from "@/src/components/main-container";
import BlockCode from "@/src/components/block-code";
import Waline from "@/src/components/waline";
import Divider from "@/src/components/divider";
import { Metadata } from "next";
import config from "@/src/config";

export const metadata: Metadata = {
  title: `关于 | ${config.name}`,
};

export default function About() {
  return (
    <>
      <CoverBackground cover="/images/maomi.png" element="header" />
      <MainContainer className="card p-10 md:p-5" rootClassName="fade-move-up">
        <BlockCode
          title="liangerwen"
          code={[
            `console.log("我是一名前端，爱吃小熊饼干。");`,
            `printf("为了养家糊口，每天忙着搬砖。");`,
            `System.out.println("虽然二十来岁，感觉快要报废。");`,
            `fmt.Println("希望处个对象，只要不是gay gay。")`,
          ].join("\n")}
        />
        <Divider />
        <Waline />
      </MainContainer>
      <Footer cover="/images/maomi.png" className="fade-move-up" />
    </>
  );
}
