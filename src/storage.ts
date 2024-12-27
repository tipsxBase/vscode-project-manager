import fs from "fs-extra";
import { DefaultTagId } from "shared/constant";
import { ProjectManagerStore } from "shared/interface";

const emptyJson: ProjectManagerStore = {
  list: [
    {
      projectName: "react18.2-debugger",
      projectPath:
        "/Users/zhaowencong/Documents/FEWorkspace/zf-study/react18.2-debugger",
      projectTag: DefaultTagId,
    },
    {
      projectName: "react18_2301",
      projectPath:
        "/Users/zhaowencong/Documents/FEWorkspace/zf-study/react18_2301",
      projectTag: DefaultTagId,
    },
    {
      projectName: "mountain-cli_未完成",
      projectPath:
        "/Users/zhaowencong/Documents/FEWorkspace/zf-study/mountain-cli",
      projectTag: DefaultTagId,
    },
    {
      projectName: "cra-template",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/cra-template",
      projectTag: DefaultTagId,
    },
    {
      projectName: "鲁班",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/luban-fe-console",
      projectTag: DefaultTagId,
    },
    {
      projectName: "create-hexadb-fe",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/create-hexadb-fe",
      projectTag: DefaultTagId,
    },
    {
      projectName: "apex-docs_未完成",
      projectPath:
        "/Users/zhaowencong/Documents/FEWorkspace/zf-study/apex-docs",
      projectTag: DefaultTagId,
    },
    {
      projectName: "鲁班文档",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/luban-docs",
      projectTag: DefaultTagId,
    },
    {
      projectName: "鲁班 pdf 生成",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/luban-pdf-server",
      projectTag: DefaultTagId,
    },
    {
      projectName: "lottery",
      projectPath: "/Users/zhaowencong/Documents/SourceWorkspace/lottery",
      projectTag: DefaultTagId,
    },
    {
      projectName: "hexadb-official-website",
      projectPath:
        "/Users/zhaowencong/Documents/FEWorkspace/hexadb-official-website",
      projectTag: DefaultTagId,
    },
    {
      projectName: "vite源码",
      projectPath: "/Users/zhaowencong/Documents/SourceWorkspace/vite",
      projectTag: DefaultTagId,
    },
    {
      projectName: "poc-report",
      projectPath: "/Users/zhaowencong/Documents/JavaProject/Poc/poc-report",
      projectTag: DefaultTagId,
    },
    {
      projectName: "u-tool",
      projectPath: "/Users/zhaowencong/Documents/RustWorkspace/u-tool",
      projectTag: DefaultTagId,
    },
    {
      projectName: "docusaurus-pdf",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/docusaurus-pdf",
      projectTag: DefaultTagId,
    },
    {
      projectName: "司南",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/compass-fe",
      projectTag: DefaultTagId,
    },
  ],
  tags: [
    {
      id: DefaultTagId,
      title: "默认",
      color: "rgb(67 56 202)",
    },
    {
      id: "TagLuban",
      title: "鲁班",
      color: "rgb(126 34 206)",
    },
    {
      id: "TagCompass",
      title: "司南",
      color: "rgb(190 18 60)",
    },
  ],
};

export const initStorage = (storageDir: string, pathname: string) => {
  fs.ensureDirSync(storageDir);
  const isExist = fs.pathExists(pathname);
  if (!isExist) {
    fs.ensureFileSync(pathname);
    fs.writeJSONSync(pathname, emptyJson, { encoding: "utf8" });
  }
};

export const getProjectStore = async (pathname: string) => {
  try {
    const list: ProjectManagerStore = await fs.readJSON(pathname);
    return list;
  } catch (e) {
    await fs.writeJSON(pathname, emptyJson, { encoding: "utf8" });
    return emptyJson;
  }
};

export const saveProjectStore = async (
  pathname: string,
  store: ProjectManagerStore
) => {
  await fs.ensureFile(pathname);
  await fs.writeJSON(pathname, store, { encoding: "utf8" });
};
