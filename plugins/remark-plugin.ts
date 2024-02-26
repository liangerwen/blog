import { VFile } from "vfile";
import { Parent } from "unist";
import { visit } from "unist-util-visit";
import { remark } from "remark";

export function remarkWordCount() {
  return (tree: Parent, file: VFile) => {
    let count = 0;
    visit(tree, (node) => {
      // @ts-ignore
      count += (node?.value || "").replace(/\\n/, "").length;
    });
    file.data.wordCount = count;
  };
}

export function remarkTextContent() {
  return (tree: Parent, file: VFile) => {
    let content = "";
    visit(tree, (node) => {
      if(node.type!=="html"){
        // @ts-ignore
        content += node?.value || "";
      }
    });
    file.data.textContent = content;
  };
}

export async function getWordCount(markdown: string): Promise<number> {
  const vfile = await remark().use(remarkWordCount).process(markdown);
  // @ts-ignore
  return vfile.data.wordCount;
}

export async function getTextContent(markdown: string): Promise<number> {
  const vfile = await remark().use(remarkTextContent).process(markdown);
  // @ts-ignore
  return vfile.data.textContent;
}
