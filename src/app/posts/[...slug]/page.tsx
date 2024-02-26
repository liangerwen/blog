import { allPosts } from "contentlayer/generated";
import { headers } from "next/headers";
import styles from "./index.module.scss";
import { notFound } from "next/navigation";
import { TocItem } from "pliny/mdx-plugins/remark-toc-headings.js";
import cls from "classnames";
import Mdx from "@/src/components/mdx";
import { Metadata } from "next";
import formatNumber from "@/src/utils/format-number";
import Icon from "@/src/components/icon";
import QRCode from "@/src/components/qrcode";
import Button from "@/src/components/button";
import Waline from "@/src/components/waline";
import config from "@/src/config";
import CoverBackground from "@/src/components/cover-background";
import Divider from "@/src/components/divider";
import Footer from "@/src/components/footer";
import MainContainer from "@/src/components/main-container";
import dayjs from "dayjs";

export const generateStaticParams = async () => {
  const paths = allPosts.map((p) => ({ slug: p.slug.split("/") }));
  return paths;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join("/"));
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) {
    return;
  }

  return {
    title: post.title,
    description: post.description,
    applicationName: "liangerwen's blog",
    authors: [{ name: config.author.name, url: config.author.github }],
    keywords: [post.title],
  };
}

interface IProps {
  params: { slug: string[] };
}

type DirectoryTreeItem = TocItem & {
  children?: DirectoryTreeItem[];
  parentId?: string;
};

const directoryTree = (directory: DirectoryTreeItem[]) => {
  const queue = [directory[0]];

  for (let i = 1; i < directory.length; i++) {
    const current = directory[i],
      prev = directory[i - 1];
    if (current.depth > prev.depth) {
      current.parentId = prev.url;
    } else {
      do {
        const last = queue[queue.length - 1];
        if (last.depth < current.depth) break;
        queue.pop();
      } while (queue.length);
      if (queue.length) {
        current.parentId = queue[queue.length - 1].url;
      }
    }
    queue.push(current);
  }

  return directory;
};

export default function Post({ params }: IProps) {
  const slug = decodeURI(params.slug.join("/"));
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return notFound();
  const currentUrl = headers().get("x-request-url")!;
  const toc = directoryTree(post.toc);

  const renderDirectoryTree = (directory: DirectoryTreeItem[], prefix = "") => {
    return directory.map((d, idx) => {
      const children = toc.filter((i) => i.parentId === d.url);
      const nextPrefix = `${prefix}${idx + 1}.`;
      return (
        <div key={d.url} className="pl-2">
          {nextPrefix}
          {d.url}
          {children.length > 0 && renderDirectoryTree(children, nextPrefix)}
        </div>
      );
    });
  };

  // return renderDirectoryTree(toc.filter((i) => !i.parentId));
  return (
    <>
      <CoverBackground cover={post.cover} element="header">
        <div className="px-[8%] text-white">
          <h1 className="mb-[8px]">{post.title}</h1>
          <div>
            <span className="text-sm">{post.date}</span>
          </div>
          <div>
            <span className="text-sm">
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
            |<span>{dayjs(post.createTime).format("YYYY-MM-DD HH:mm:ss")}</span>
            |<span>{dayjs(post.modifyTime).format("YYYY-MM-DD HH:mm:ss")}</span>
          </div>
        </div>
      </CoverBackground>
      <MainContainer
        className="card px-[40px] py-[50px] md:px-[14px] md:py-[36px]"
        rootClassName="fade-move-up"
      >
        <div className={styles.post}>
          <Mdx code={post.body.code} />
        </div>
        <div className={styles["copyright"]}>
          <Icon
            icon="fa6-solid:copyright"
            className="absolute right-[12px] top-[8px] text-[#49b1f5] text-xl"
          />
          <div className={styles["post-copyright"]}>
            <span className={styles["post-copyright-meta"]}>
              <Icon icon="heroicons:user-circle-16-solid" className="mr-2" />
              文章作者:
            </span>
            <span className={styles["post-copyright-info"]}>
              <a href="mailto:1354383179@qq.com">{config.author.name}</a>
            </span>
          </div>
          <div className={styles["post-copyright"]}>
            <span className={styles["post-copyright-meta"]}>
              <Icon icon="icon-park-solid:copy-link" className="mr-2" />
              文章链接:
            </span>
            <span className={styles["post-copyright-info"]}>
              <a href={currentUrl}>{currentUrl}</a>
            </span>
          </div>
          <div className={styles["post-copyright"]}>
            <span className={styles["post-copyright-meta"]}>
              <Icon icon="ep:warning-filled" className="mr-2" />
              版权声明:
            </span>
            <span className={styles["post-copyright-info"]}>
              本博客所有文章除特别声明外，均采用{" "}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noreferrer"
              >
                CC BY-NC-SA 4.0
              </a>{" "}
              许可协议。转载请注明来自{" "}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noreferrer"
              >
                liangerwen&apos;s☻Blog
              </a>{" "}
              ！
            </span>
          </div>
        </div>
        <div className={styles["share"]}>
          <div className={styles["tags-share"]}></div>
          <div className={styles["post-share"]}>
            <a
              className={cls(
                styles["icon"],
                "border-[#365899] text-[#365899] hover:text-[#fff] hover:bg-[#365899]"
              )}
              target="_blank"
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
              rel="noreferrer"
            >
              <Icon icon="fa:facebook" />
            </a>
            <a
              className={cls(
                styles["icon"],
                "border-[#56b6e7] text-[#56b6e7] hover:text-[#fff] hover:bg-[#56b6e7]"
              )}
              target="_blank"
              href={`https://twitter.com/intent/tweet?text=${post.title} by ${config.author.name}&url=${currentUrl}&via=https://yumozhi.com`}
              rel="noreferrer"
            >
              <Icon icon="mdi:twitter" />
            </a>
            <a
              className={cls(
                styles["icon"],
                styles["link"],
                "border-[#7bc549] text-[#7bc549] hover:text-[#fff] hover:bg-[#7bc549]"
              )}
              target="_blank"
              href={currentUrl}
              rel="noreferrer"
            >
              <Icon icon="fa6-brands:weixin" />

              <div className={styles["wechat-share"]}>
                <p className={styles["wechat-share__title"]}>微信扫一扫分享</p>
                <QRCode
                  value={currentUrl}
                  size={96}
                  className="my-[10px] ml-[52px]"
                />
                <p>微信里点“发现”，扫一下，二维码便可将本文分享至朋友圈。</p>
              </div>
            </a>
            <a
              className={cls(
                styles["icon"],
                "border-[#ff763b] text-[#ff763b] hover:text-[#fff] hover:bg-[#ff763b]"
              )}
              target="_blank"
              href={`https://service.weibo.com/share/share.php?url=${currentUrl}&title=${post.title}&pic=${post.cover}`}
              rel="noreferrer"
            >
              <Icon icon="ri:weibo-fill" />
            </a>
            <a
              className={cls(
                styles["icon"],
                "border-[#56b6e7] text-[#56b6e7] hover:text-[#fff] hover:bg-[#56b6e7]"
              )}
              target="_blank"
              href={`https://connect.qq.com/widget/shareqq/index.html?url=${currentUrl}`}
              rel="noreferrer"
            >
              <Icon icon="ri:qq-fill" />
            </a>
          </div>
        </div>
        <div className={styles["exceptional"]}>
          <Button
            icon={
              <Icon icon="material-symbols:featured-seasonal-and-gifts-rounded" />
            }
            className={styles["exceptional-btn"]}
          >
            打赏
          </Button>
          <div className={styles["exceptional-qrcode"]}>
            <div className="mx-[5px]">
              <img
                src={"https://yumozhi.com/img/wechat.jpg"}
                className={cls(styles["pay-qrcode"], styles["wechat-pay"])}
              />
              <p>微信</p>
            </div>
            <div className="mx-[5px]">
              <img
                src={"https://yumozhi.com/img/wechat.jpg"}
                className={cls(styles["pay-qrcode"], styles["ali-pay"])}
              />
              <p>支付宝</p>
            </div>
          </div>
        </div>
        <Divider />
        <Waline />
      </MainContainer>
      <Footer cover={post.cover} className="fade-move-up" />
    </>
  );
}
