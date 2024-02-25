import { allPosts } from "@/.contentlayer/generated";
import Pagination from "@/src/components/pagination";
import CoverBackground from "../components/cover-background";
import Footer from "../components/footer";
import MainContainer from "../components/main-container";

import cls from "classnames";
import { titillium_web } from "./fonts";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <CoverBackground element="header"></CoverBackground>
      <MainContainer rootClassName="fade-move-in">
        <div>
          {allPosts.map((post, idx) => (
            <div
              key={post._id}
              className={cls(
                "w-full flex card mb-[20px] h-[16.8em] cover-img-box",
                idx % 2 === 1 && "flex-row-reverse"
              )}
            >
              <Link
                className={cls("bg-[#49b1f5] w-[45%] overflow-hidden")}
                href={post._raw.flattenedPath}
              >
                <img className="cover-img" src={post.cover} alt="页面未找到" />
              </Link>
              <div
                className={cls(
                  titillium_web.className,
                  "bg-[var(--card-bg)] flex justify-center flex-col w-[55%] px-[40px]"
                )}
              >
                <Link href={post._raw.flattenedPath}>
                  <h1>{post.title}</h1>
                </Link>
                <span className="my-[6px]"></span>
                <p className="line-clamp-2">{post.textContent}</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination total={allPosts.length} />
      </MainContainer>
      <Footer className="fade-move-in" />
    </>
  );
}
