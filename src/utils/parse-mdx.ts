import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { remarkCodeMeta } from "@/plugins/remark-plugin";

export const parseMDX = (content: string) =>
  bundleMDX({
    source: content,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkCodeMeta,
        remarkGfm,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
      ];
      return options;
    },
    esbuildOptions: (opts) => {
      opts.target = "es2020";
      return opts;
    },
  }).then((res) => ({
    meta: res.frontmatter,
    code: res.code,
  }));
