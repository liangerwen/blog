'use client';

import { allPosts } from "@/.contentlayer/generated";
import CoverBackground from "@/src/components/cover-background";
import Footer from "@/src/components/footer";
import MainContainer from "@/src/components/main-container";
import Pagination from "@/src/components/pagination";

import cls from "classnames";
import Link from "next/link";
import { titillium_web } from "../../fonts";
import config from "@/src/config";
import { notFound } from "next/navigation";

interface PageProps {
  params?: {
    current: string;
  };
}

export default function Page({ params }: PageProps) {
  let current = params === undefined ? "1" : params.current;
  // 参数不正确
  if (!/^[1-9]\d*$/.test(current)) {
    return notFound();
  }
  const currentPage = Number(current);
  const pageSize = config.post.pageSize || 10;
  const maxPageNumber = Math.ceil(allPosts.length / pageSize);
  // 超过数量
  if (currentPage > maxPageNumber) {
    return notFound();
  }

  const posts = allPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <CoverBackground element="header"></CoverBackground>
      <MainContainer rootClassName="fade-move-in">
        <div>
          {posts.map((post, idx) => (
            <div
              key={post._id}
              className={cls(
                "w-full flex card mb-[20px] h-[16.8em] cover-img-box",
                idx % 2 === 1 && "flex-row-reverse"
              )}
            >
              <Link
                className={cls("bg-[#49b1f5] w-[45%] overflow-hidden")}
                href={`/${post._raw.flattenedPath}`}
              >
                <img className="cover-img" src={post.cover} alt="页面未找到" />
              </Link>
              <div
                className={cls(
                  titillium_web.className,
                  "bg-[var(--card-bg)] flex justify-center flex-col w-[55%] px-[40px]"
                )}
              >
                <Link href={`/${post._raw.flattenedPath}`}>
                  <h1>{post.title}</h1>
                </Link>
                <span className="my-[6px]"></span>
                <p className="line-clamp-2">{post.textContent}</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination total={100} currentPage={2}>
          {({ children, className, nextPage }) => (
            <Link className={className} href={`/page/${nextPage}`}>
              {children}
            </Link>
          )}
        </Pagination>
      </MainContainer>
      <Footer className="fade-move-in" />
    </>
  );
}
