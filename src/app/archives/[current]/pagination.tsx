"use client";

import {
  PaginationProps,
  PaginationWithHref,
} from "@/src/components/pagination";

const PaginationWithArchives = (props: PaginationProps) => (
  <PaginationWithHref generateHref={(page) => `/archives/${page}`} {...props} />
);

export default PaginationWithArchives;
