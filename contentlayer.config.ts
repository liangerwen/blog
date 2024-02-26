import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { extractTocHeadings } from "pliny/mdx-plugins/index.js";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getTextContent, getWordCount } from "./plugins/remark-plugin";
import fs from "fs";
import { join } from "path";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    cover: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    tags: { type: "list", of: { type: "string" }, default: [] },
    lastmod: { type: "date" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("posts/", ""),
    },
    toc: {
      type: "json",
      resolve: (doc) => extractTocHeadings(doc.body.raw),
    },
    wordCount: {
      type: "number",
      resolve: (doc) => getWordCount(doc.body.raw),
    },
    textContent: {
      type: "string",
      resolve: (doc) => getTextContent(doc.body.raw),
    },
    createTime: {
      type: "date",
      resolve: async (doc) =>
        fs.statSync(join("data", doc._raw.sourceFilePath)).birthtime,
    },
    modifyTime: {
      type: "date",
      resolve: async (doc) =>
        fs.statSync(join("data", doc._raw.sourceFilePath)).mtime,
    },
  },
}));

export const CustomPage = defineDocumentType(() => ({
  name: "CustomPage",
  filePathPattern: `custom/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    cover: {
      type: "string",
    },
    comment: {
      type: "boolean",
      default: false,
    },
    sidebar: {
      type: "list",
      of: {
        type: "enum",
        options: [
          "author",
          "notice",
          "latest-article",
          "latest-message",
          "categories",
          "tags",
          "archives",
          "information",
        ],
      },
      default: [],
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("custom/", ""),
    },
  },
}));

export const Config = defineDocumentType(() => ({
  name: "Config",
  filePathPattern: `config.json`,
  contentType: "data",
  fields: {
    name: {
      type: "string",
    },
    cover: {
      type: "string",
    },
    author: {
      type: "json",
    },
    post: {
      type: "json",
      default: {
        expendLine: 15,
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post, CustomPage, Config],
  mdx: {
    cwd: process.cwd(),
    // 配置MDX解析器的插件
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
});
