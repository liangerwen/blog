import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import {
  extractTocHeadings,
  getTextContent,
  remarkCodeMeta,
} from "./plugins/remark-plugin";
import fs from "fs";
import { join } from "path";
import getRandomImageUrl from "./random.config";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      default: "",
    },
    description: {
      type: "string",
    },
    cover: {
      type: "string",
    },
    date: {
      type: "date",
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
      resolve: (doc) =>
        getTextContent(doc.body.raw).then(
          (res) => res.replace(/[ \n]+/g, "").length
        ),
    },
    textContent: {
      type: "string",
      resolve: (doc) => getTextContent(doc.body.raw),
    },
    createTime: {
      type: "date",
      resolve: (doc) => {
        return (
          doc.date ??
          fs.statSync(join("data", doc._raw.sourceFilePath)).birthtime
        );
      },
    },
    modifyTime: {
      type: "date",
      resolve: (doc) =>
        doc.lastmod ??
        doc.date ??
        fs.statSync(join("data", doc._raw.sourceFilePath)).mtime,
    },
    title: {
      type: "string",
      resolve: (doc) => doc.title || doc._raw.sourceFileName.split(".mdx")?.[0],
    },
    cover: {
      type: "string",
      resolve: (doc) => doc.cover || getRandomImageUrl("pc"),
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
    cover: {
      type: "string",
      resolve: (doc) => doc.cover || getRandomImageUrl("pc"),
    },
  },
}));

export const Config = defineDocumentType(() => ({
  name: "Config",
  filePathPattern: `config.json`,
  contentType: "data",
  fields: {
    title: {
      type: "string",
    },
    cover: {
      type: "string",
    },
    quote: {
      type: "list",
      of: { type: "string" },
    },
    name: {
      type: "string",
    },
    avatar: {
      type: "string",
    },
    description: {
      type: "string",
    },
    github: {
      type: "string",
    },
    gitee: {
      type: "string",
    },
    juejin: {
      type: "string",
    },
    links: {
      type: "list",
      of: { type: "json" },
      default: [],
    },
    post: {
      type: "json",
      default: {
        expendLine: 15,
      },
    },
  },
  computedFields: {
    cover: {
      type: "string",
      resolve: (doc) => doc.cover || getRandomImageUrl("pc"),
    },
    avatar: {
      type: "string",
      resolve: (doc) => doc.avatar || getRandomImageUrl("avatar"),
    },
  },
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post, CustomPage, Config],
  mdx: {
    cwd: process.cwd(),
    // 配置MDX解析器的插件
    remarkPlugins: [remarkCodeMeta, remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
});
