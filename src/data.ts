import { allPosts as _allPosts } from "@/.contentlayer/generated";

export const allPosts = _allPosts.sort((a, b) => a.modifyTime - b.modifyTime);
