"use client";

import classNames from "classnames";
import React, { ReactNode, memo, useMemo } from "react";

import styles from "./index.module.scss";
import Icon from "../icon";
import Link from "next/link";

export type PaginationProps = {
  currentPage?: number;
  total: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  children?: ({
    children,
    className,
    nextPage,
  }: {
    children?: ReactNode;
    className?: string;
    nextPage: number;
  }) => ReactNode;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  total,
  limit = 10,
  onPageChange,
  children,
  className,
}) => {
  const pageSize = useMemo(() => {
    const _total = Math.floor(total);
    const remainder = _total % limit;
    return remainder === 0 ? _total / limit : Math.floor(_total / limit) + 1;
  }, [total, limit]);

  const defaultRenderItem: PaginationProps["children"] = ({
    children,
    className,
    nextPage,
  }) => (
    <span
      className={className}
      onClick={() => {
        onPageChange?.(nextPage);
      }}
    >
      {children}
    </span>
  );

  const renderPage = children || defaultRenderItem;

  return (
    pageSize > 0 && (
      <div className={classNames(styles["lew-pagination"], className)}>
        {/* 上一页 与 第一页*/}
        {currentPage > 1 && (
          <>
            {renderPage({
              children: <Icon icon="ant-design:left" />,
              nextPage: currentPage - 1,
              className: styles["lew-page"],
            })}
            {renderPage({
              children: "1",
              nextPage: 1,
              className: styles["lew-page"],
            })}
          </>
        )}
        {/* 第一页与当前页前一页的省略号 */}
        {currentPage > 3 &&
          renderPage({
            // children: <Icon icon="clarity:ellipsis-horizontal-line" />,
            children: <Icon icon="ant-design:double-left" />,
            className: styles["lew-page"],
            nextPage: currentPage - 5 > 1 ? currentPage - 5 : 1,
          })}
        {/* 当前页前一页 */}
        {currentPage > 2 &&
          renderPage({
            children: currentPage - 1,
            className: styles["lew-page"],
            nextPage: currentPage - 1,
          })}
        {/* 当前页 */}
        {renderPage({
          children: currentPage,
          className: classNames(styles["lew-page"], styles["lew-page__active"]),
          nextPage: currentPage,
        })}
        {/* 当前页后一页 */}
        {currentPage < pageSize - 1 &&
          renderPage({
            children: currentPage + 1,
            className: styles["lew-page"],
            nextPage: currentPage + 1,
          })}
        {/* 第一页与当前页前一页的省略号 */}
        {currentPage < pageSize - 2 &&
          renderPage({
            // children: <Icon icon="clarity:ellipsis-horizontal-line" />,
            children: <Icon icon="ant-design:double-right" />,
            className: styles["lew-page"],
            nextPage: currentPage + 5 < pageSize ? currentPage + 5 : pageSize,
          })}
        {/* 下一页 */}
        {currentPage < pageSize && (
          <>
            {renderPage({
              children: pageSize,
              className: styles["lew-page"],
              nextPage: pageSize,
            })}
            {renderPage({
              children: <Icon icon="ant-design:right" />,
              className: styles["lew-page"],
              nextPage: currentPage + 1,
            })}
          </>
        )}
      </div>
    )
  );
};

export const PaginationWithHref = ({
  total,
  currentPage,
  generateHref,
  ...rest
}: Omit<PaginationProps, "children"> & {
  generateHref: (page: number) => string;
}) => (
  <Pagination total={total} currentPage={currentPage} {...rest}>
    {({ children, className, nextPage }) => {
      const Element = nextPage === currentPage ? "span" : Link;
      return (
        <Element className={className} href={generateHref(nextPage)}>
          {children}
        </Element>
      );
    }}
  </Pagination>
);

export default memo(Pagination);
