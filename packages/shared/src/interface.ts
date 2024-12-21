import { WebviewResponseMethod } from "./constant";

export interface Project {
  projectName: string;
  projectPath: string;
  projectTag: string;
}

export interface Tag {
  title: string;
  color: string;
}

export interface ProjectManagerStore {
  list: Project[];
  tags: Tag[];
}

export interface VsCodeMessage<T = unknown> {
  method: WebviewResponseMethod;
  payload?: T;
}

export interface VsCodeResponse<T = unknown> {
  method: WebviewResponseMethod;
  type: "response";
  payload: {
    code: number;
    message: string;
    data: T;
  };
}
