import React, {
  useState,
  ReactElement,
  cloneElement,
  Suspense,
  useDeferredValue,
  useMemo,
} from "react";
import { allPosts } from "@/src/data";
import Link from "next/link";
import Modal from "../modal";
import Icon from "../icon";
import cls from "classnames";
import Divider from "../divider";

import styles from "./index.module.scss";

const Search = ({
  title = "文章搜索",
  trigger = <Icon icon="mdi:search" width={24} cursor="pointer" />,
}: {
  title?: string;
  trigger?: ReactElement<Record<string, any> & { onClick: () => void }>;
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const deferredSearch = useDeferredValue(search);

  const result = useMemo(
    () =>
      allPosts.filter((i) =>
        [i.title, i.description, i.textContent].find((j = "") =>
          j.includes(deferredSearch)
        )
      ),
    [deferredSearch]
  );

  const resultTextRender = (name: string) => {
    const res = name.split(deferredSearch);
    return (
      <>
        {res.map((i, idx) => {
          return idx === res.length - 1 ? (
            i
          ) : (
            <>
              {idx === 0 ? i.slice(-2) : i}
              <span className={styles.searchActive}>{deferredSearch}</span>
            </>
          );
        })}
      </>
    );
  };

  const resultListRender = () => {
    if (!deferredSearch) {
      return <p>请输入想要搜索的内容...</p>;
    }
    if (result.length > 0) {
      return (
        <>
          <div className={styles.searchResult}>
            {result.map((i) => (
              <Link
                className={cls(styles.resultItem, "no-underline")}
                key={i.title}
                href={`/${i._raw.flattenedPath}`}
                onClick={() => setOpen(false)}
              >
                <p className={styles.resultItemTitle}>
                  {resultTextRender(i.title)}
                </p>
                <p className={styles.resultItemContent}>
                  {resultTextRender(i.textContent)}
                </p>
              </Link>
            ))}
          </div>
          <Divider className="!my-6" />
          <p>共找到 {result.length} 篇文章</p>
        </>
      );
    }
    return <p>找不到符合条件的文章：{deferredSearch}</p>;
  };

  return (
    <>
      {cloneElement(trigger, { onClick: () => setOpen(true) })}
      <Modal
        className="w-[600px] md:w-screen max-h-[80vh] md:max-h-screen md:h-screen absolute top-12 md:relative md:top-0"
        title={title}
        visible={open}
        onCancel={() => setOpen(false)}
        footer={false}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={styles.modalContent}>
          <input
            type="text"
            className={styles.searchInput}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="请输入搜索内容"
          />
          <Divider className="!my-6" />
          <Suspense fallback={<h2>Loading...</h2>}>
            {resultListRender()}
          </Suspense>
        </div>
      </Modal>
    </>
  );
};

export default Search;
