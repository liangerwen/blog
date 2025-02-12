import React from "react";
import CoverBackground from "@/src/components/cover-background";
import Footer from "@/src/components/footer";
import MainContainer from "@/src/components/main-container";
import config from "@/src/config";
import Link from "next/link";
import Image from "@/src/components/image";
import Waline from "@/src/components/waline";
import Divider from "@/src/components/divider";
import BlockCode from "@/src/components/block-code";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `友链 | ${config.name}`,
};

export default function Links() {
  return (
    <>
      <CoverBackground cover="/images/nezha.png" element="header" />
      <MainContainer className="card p-10 md:p-5" rootClassName="fade-move-up">
        <div className="grid grid-cols-3 moblie:grid-cols-1 pad:grid-cols-2 gap-2">
          {config.links.map((link, index) => (
            <Link
              className="rounded-xl p-1 border-[2px] border-transparent hover:border-[var(--primary-color)] no-underline hover:text-[unset]"
              key={index}
              href={link.url}
              target="_blank"
            >
              <div className="rounded-lg flex gap-2 bg-[var(--mask-bg-color)] p-2">
                <Image
                  src={link.avatar}
                  alt={link.name}
                  className="size-16 rounded-full"
                />
                <div className="flex flex-col gap-1 justify-center overflow-hidden">
                  <span className="text-lg font-bold truncate">
                    {link.name}
                  </span>
                  <span className="text-xs truncate">{link.desc}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Divider />
        <BlockCode
          title="申请友链格式如下（在下方评论）"
          code={[
            "name: liangerwen",
            "url: https://blog-nine-navy-52.vercel.app/",
            "avatar: https://blog-nine-navy-52.vercel.app/images/avatar.jpg",
            "desc: 这瓜娃子懒得很，什么都没有留哈",
          ].join("\n")}
        />
        <Divider />
        <Waline />
      </MainContainer>
      <Footer cover="/images/nezha.png" className="fade-move-up" />
    </>
  );
}
