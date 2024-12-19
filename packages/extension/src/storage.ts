import fs from "fs-extra";

const emptyJson = {
  list: [
    {
      projectName: "react18.2-debugger",
      projectPath:
        "/Users/zhaowencong/Documents/FEWorkspace/zf-study/react18.2-debugger",
      projectTag: "默认",
    },
    {
      projectName: "react18_2301",
      projectPath:
        "/Users/zhaowencong/Documents/FEWorkspace/zf-study/react18_2301",
      projectTag: "默认",
    },
    {
      projectName: "mountain-cli_未完成",
      projectPath:
        "/Users/zhaowencong/Documents/FEWorkspace/zf-study/mountain-cli",
      projectTag: "默认",
    },
    {
      projectName: "cra-template",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/cra-template",
      projectTag: "默认",
    },
    {
      projectName: "鲁班",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/luban-fe-console",
      projectTag: "默认",
    },
    {
      projectName: "create-hexadb-fe",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/create-hexadb-fe",
      projectTag: "默认",
    },
    {
      projectName: "apex-docs_未完成",
      projectPath:
        "/Users/zhaowencong/Documents/FEWorkspace/zf-study/apex-docs",
      projectTag: "默认",
    },
    {
      projectName: "鲁班文档",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/luban-docs",
      projectTag: "默认",
    },
    {
      projectName: "鲁班 pdf 生成",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/luban-pdf-server",
      projectTag: "默认",
    },
    {
      projectName: "lottery",
      projectPath: "/Users/zhaowencong/Documents/SourceWorkspace/lottery",
      projectTag: "默认",
    },
    {
      projectName: "hexadb-official-website",
      projectPath:
        "/Users/zhaowencong/Documents/FEWorkspace/hexadb-official-website",
      projectTag: "默认",
    },
    {
      projectName: "vite源码",
      projectPath: "/Users/zhaowencong/Documents/SourceWorkspace/vite",
      projectTag: "默认",
    },
    {
      projectName: "poc-report",
      projectPath: "/Users/zhaowencong/Documents/JavaProject/Poc/poc-report",
      projectTag: "默认",
    },
    {
      projectName: "u-tool",
      projectPath: "/Users/zhaowencong/Documents/RustWorkspace/u-tool",
      projectTag: "默认",
    },
    {
      projectName: "docusaurus-pdf",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/docusaurus-pdf",
      projectTag: "默认",
    },
    {
      projectName: "司南",
      projectPath: "/Users/zhaowencong/Documents/FEWorkspace/compass-fe",
      projectTag: "默认",
    },
  ],
  tags: [
    {
      title: "默认",
      color: "rgb(67 56 202)",
    },
    {
      title: "鲁班",
      color: "rgb(126 34 206)",
    },
    {
      title: "司南",
      color: "rgb(190 18 60)",
    },
  ],
};

export const getProjectData = async (pathname: string) => {
  const isExist = fs.pathExists(pathname);
  if (!isExist) {
    await fs.ensureFile(pathname);
    await fs.writeJSON(pathname, emptyJson, { encoding: "utf8" });
  }

  try {
    const list = await fs.readJSON(pathname);
    return list;
  } catch (e) {
    await fs.writeJSON(pathname, emptyJson, { encoding: "utf8" });
    return emptyJson;
  }
};
