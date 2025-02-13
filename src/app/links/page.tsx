import React from "react";
import CoverBackground from "@/src/components/cover-background";
import Footer from "@/src/components/footer";
import MainContainer from "@/src/components/main-container";
import config from "@/src/config";
import Link from "next/link";
import Image from "@/src/components/image";
import Waline from "@/src/components/waline";
import { Metadata } from "next";
import Mdx from "@/src/components/mdx";
import { links } from "@/src/data";
import Divider from "@/src/components/divider";

export const metadata: Metadata = {
  title: `友链 | ${config.name}`,
};

export default function Links() {
  return (
    <>
      <CoverBackground
        cover={links?.cover}
        element="header"
        className="flex items-center justify-center"
      >
        <h1 className="text-white opacity-90 font-bold text-6xl">友链</h1>
      </CoverBackground>
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
        <Mdx code={links?.body?.code!} />
        {links?.comment && (
          <>
            <Divider />
            <Waline />
          </>
        )}
      </MainContainer>
      <Footer cover={links?.cover} className="fade-move-up" />
    </>
  );
}
