import { VFile } from "vfile";
import { Parent, Node } from "unist";
import { visit } from "unist-util-visit";
import { remark } from "remark";
import { Heading } from "mdast";
import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";

const slugger = new GithubSlugger();

export type TocItem = {
  value: string;
  url: string;
  depth: number;
};

export type Toc = TocItem[];

/**
 * Extracts TOC headings from markdown file and adds it to the file's data object.
 */
export function remarkTocHeadings() {
  return (tree: Parent, file: VFile) => {
    const toc: Toc = [];
    visit(tree, "heading", (node: Heading) => {
      const textContent = toString(node);
      toc.push({
        value: textContent,
        url: "#" + slugger.slug(textContent),
        depth: node.depth,
      });
    });
    file.data.toc = toc;
  };
}

/**
 * Passes markdown file through remark to extract TOC headings
 *
 * @param {string} markdown
 * @return {*}  {Promise<Toc>}
 */
export async function extractTocHeadings(markdown: string): Promise<Toc> {
  slugger.reset();
  const vfile = await remark().use(remarkTocHeadings).process(markdown);
  // @ts-ignore
  return vfile.data.toc;
}

export function remarkTextContent() {
  return (tree: Parent, file: VFile) => {
    let content = "";
    visit(tree, (node) => {
      if (node.type !== "html") {
        // @ts-ignore
        content += node?.value || "";
      }
    });
    file.data.textContent = content;
  };
}

export async function getTextContent(markdown: string): Promise<string> {
  const vfile = await remark().use(remarkTextContent).process(markdown);
  // @ts-ignore
  return vfile.data.textContent;
}

interface CodeNode extends Node {
  lang?: string;
  meta?: string;
}

/**
 * Extracts code block's language and meta data and adds it to the code block's data object.
 */
export function remarkCodeMeta() {
  return (tree: Parent) => {
    visit(tree, "code", (node: CodeNode) => {
      const metaObj = (node.meta ?? "").split(" ").reduce((acc, cur) => {
        const [key, value] = cur.split("=");
        acc[`data-${key}`] = value;
        return acc;
      }, {} as Record<string, string>);
      node.data = Object.assign(node.data || {}, {
        hProperties: {
          ["data-lang"]: node.lang,
          ...metaObj,
        },
      });
    });
  };
}
