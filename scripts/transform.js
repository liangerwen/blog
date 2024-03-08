const fs = require("fs");
const { join } = require("path");

const renameFileSuffix = async (filePath, oldSuffix, newSuffix) => {
  const files = await fs.readdirSync(filePath);
  for (let file of files) {
    const path = join(filePath, file);
    const state = await fs.statSync(path);
    if (state.isFile()) {
      const reg = new RegExp(`.${oldSuffix}$`);
      if (reg.test(path)) {
        const newPathName = path.replace(reg, `.${newSuffix}`);
        await fs.renameSync(path, newPathName);
      }
    } else {
      await renameFileSuffix(path, oldSuffix, newSuffix);
    }
  }
};

renameFileSuffix("data", "md", "mdx");
