const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { globSync } = require("glob");
const { cwd } = require("process");

const addDateFrontmatter = (dir) => {
  // 查找所有目标文件
  const files = globSync([dir], {
    cwd: cwd(),
    absolute: true,
  });
  files.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const parsed = matter(content);
      if (!parsed.data.date) {
        const updatedContent = matter.stringify(parsed.content, {
          ...parsed.data,
          date: new Date().toLocaleDateString("zh-CN"),
        });
        fs.writeFileSync(filePath, updatedContent);
        console.log(`✅ [date]已更新: ${filePath}`);
      }
    } catch (e) {
      console.error(`❌ [date]处理失败: ${filePath}`, e.message);
    }
  });
};

const renameFileSuffix = (filePath, oldSuffix, newSuffix) => {
  const dir = path.join(filePath, "**", `*.${oldSuffix}`);
  const files = globSync([dir], {
    cwd: cwd(),
    absolute: true,
  });
  files.forEach((filePath) => {
    try {
      const newFilePath = filePath.replace(`.${oldSuffix}`, `.${newSuffix}`);
      fs.renameSync(filePath, newFilePath);
      console.log(`✅ [suffix]已更新: ${filePath}`);
    } catch (e) {
      console.error(`❌ [suffix]处理失败: ${filePath}`, e.message);
    }
  });
};

const main = () => {
  renameFileSuffix("data", "md", "mdx");
  addDateFrontmatter("data/posts/**/*.{md,mdx}");
};

main();
