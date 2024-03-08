"use client";

import CoverBackground from "@/src/components/cover-background";
import Footer from "@/src/components/footer";
import MainContainer from "@/src/components/main-container";
import Pagination from "@/src/components/pagination";
import cls from "classnames";
import Link from "next/link";
import config from "@/src/config";
import { notFound } from "next/navigation";
import { titillium_web } from "@/src/app/fonts";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { allPosts } from "@/src/data";

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
        <div>
          {posts.map((post, idx) => (
            <div
              key={post._id}
              className={cls(
                "w-full flex card mb-[20px] h-[16.8em] md:h-auto cover-img-box md:flex-col",
                idx % 2 === 1 && "flex-row-reverse"
              )}
            >
              <Link
                className={cls(
                  "bg-[#49b1f5] overflow-hidden w-[45%] h-full md:w-full md:h-[230px]"
                )}
                href={`/${post._raw.flattenedPath}`}
              >
                <img className="cover-img" src={post.cover} alt="页面未找到" />
              </Link>
              <div
                className={cls(
                  titillium_web.className,
                  "bg-[var(--card-bg)] flex justify-center flex-col px-[40px] w-[55%] md:w-full md:p-[20px] md:pb-[30px]"
                )}
              >
                <Link href={`/${post._raw.flattenedPath}`}>
                  <h2>{post.title}</h2>
                </Link>
                <span className="my-[6px]"></span>
                <p className="line-clamp-2">{post.textContent}</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination total={allPosts.length} currentPage={current}>
          {({ children, className, nextPage }) => {
            const Element = nextPage === current ? "span" : Link;
            return (
              <Element className={className} href={`/page/${nextPage}`}>
                {children}
              </Element>
            );
          }}
        </Pagination>
      </MainContainer>
      <Footer cover={config.cover} className="fade-move-up" />
    </>
  );
}
