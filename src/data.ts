import { allPosts as _allPosts } from "@/.contentlayer/generated";
import dayjs from "dayjs";

export const allPosts = _allPosts.sort(
  (a, b) => dayjs(b.modifyTime).valueOf() - dayjs(a.modifyTime).valueOf()
);
