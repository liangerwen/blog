"use client";

import React from "react";
import CoverBackground from "@/src/components/cover-background";
import Footer from "@/src/components/footer";
import MainContainer from "@/src/components/main-container";
import { PaginationWithHref } from "@/src/components/pagination";
import cls from "classnames";
import Link from "next/link";
import config from "@/src/config";
import { notFound } from "next/navigation";
import { titillium_web } from "@/src/app/fonts";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { allPosts } from "@/src/data";
import formatNumber from "@/src/utils/format-number";
import { estimateReadTimeMinutes } from "@/src/utils/read-time";
import dayjs from "dayjs";
import Icon from "../icon";
import Image from "../image";

interface PageProps {
  current?: number;
}

export default function Page({ current = 1 }: PageProps) {
  const pageSize = config.post.pageSize || 10;
  const maxPageNumber = Math.max(Math.ceil(allPosts.length / pageSize), 1);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (config.quote && config.quote.length) {
      const typed = new Typed(ref.current, {
        strings: config.quote,
        typeSpeed: 120,
        backSpeed: 60,
        loop: true,
      });
      return () => typed.destroy();
    }
  }, []);
  // 超过数量
  if (current > maxPageNumber) {
    return notFound();
  }

  const posts = allPosts.slice((current - 1) * pageSize, current * pageSize);

  return (
    <>
      <CoverBackground
        cover={config.cover}
        height="fullScreen"
        element="header"
        className="text-[var(--button-color)]"
      >
        <h1 className="text-5xl">{config.name}</h1>
        <p className="text-[var(--button-color)] my-6 text-3xl">
          <span ref={ref} />
        </p>
      </CoverBackground>
      <MainContainer rootClassName="fade-move-up">
        {posts.map((post, idx) => (
          <div
            key={post._id}
            className={cls(
              "w-full flex card mb-[1.25rem] h-[16.8em] md:h-auto cover-img-box md:flex-col",
              idx % 2 === 1 && "flex-row-reverse"
            )}
          >
            <Link
              className={cls(
                "bg-[#49b1f5] overflow-hidden w-[45%] h-full md:w-full md:h-[14.375rem]"
              )}
              href={`/${post._raw.flattenedPath}`}
            >
              <Image className="cover-img" src={post.cover} alt="页面未找到" />
            </Link>
            <div
              className={cls(
                titillium_web.className,
                "bg-[var(--card-bg)] flex justify-center flex-col px-[2.5rem] w-[55%] md:w-full md:p-[1.25rem] md:pb-[1.875rem]"
              )}
            >
              <Link href={`/${post._raw.flattenedPath}`}>
                <h2 className="line-clamp-1 break-all">{post.title}</h2>
              </Link>
              <div className="my-[0.375rem] text-[#858585]">
                <Icon icon="icon-park-solid:word" className="mr-1" />
                <span className="text-sm">
                  字数统计：
                  {formatNumber(post.wordCount, [
                    {
                      unit: "w",
                      step: 10000,
                    },
                    {
                      unit: "k",
                      step: 1000,
                    },
                  ])}
                </span>
                <span className="mx-1">|</span>
                <Icon icon="humbleicons:clock" className="mr-1" />
                <span className="text-sm">
                  阅读时长：
                  {estimateReadTimeMinutes({
                    text: post.textContent,
                    wpm: 180,
                  })}
                  分钟
                </span>
                <span className="mx-1">|</span>
                <Icon icon="solar:calendar-bold-duotone" className="mr-1" />
                <span className="text-sm">
                  发表于：
                  {dayjs(post.createTime).format("YYYY-MM-DD")}
                </span>
              </div>
              <p className="line-clamp-2 break-all">{post.textContent}</p>
            </div>
          </div>
        ))}
        <PaginationWithHref
          generateHref={(page) => `/pages/${page}`}
          total={allPosts.length}
          currentPage={current}
        />
      </MainContainer>
      <Footer cover={config.cover} className="fade-move-up" />
    </>
  );
}
