import { allPosts as _allPosts } from "@/.contentlayer/generated";
import { allCustomPages } from "@/.contentlayer/generated";
import dayjs from "dayjs";

export const allPosts = _allPosts.sort(
  (a, b) => dayjs(b.modifyTime).valueOf() - dayjs(a.modifyTime).valueOf()
);

export const about = allCustomPages.find((p) => p.slug === "about");

export const links = allCustomPages.find((p) => p.slug === "links");
