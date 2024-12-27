import fs from "fs-extra";
import { DefaultTagId } from "shared/constant";
import { ProjectManagerStore } from "shared/interface";

const emptyJson: ProjectManagerStore = {
  list: [],
  tags: [
    {
      id: DefaultTagId,
      title: "默认",
      color: "rgb(67 56 202)",
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
