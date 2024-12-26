import { WebviewResponseMethod, WebviewServerPushEvent } from "./constant";

export interface Project {
  projectName: string;
  projectPath: string;
  projectTag: string;
}

export interface Tag {
  title: string;
  color: string;
  id: string;
}

export interface ProjectManagerStore {
  list: Project[];
  tags: Tag[];
}

export interface VsCodeMessage<T = unknown> {
  method: WebviewResponseMethod;
  payload?: T;
}

export type VsCodeResponse<T = unknown> =
  | {
      method: WebviewResponseMethod;
      type: "response";
      payload: {
        code: number;
        message: string;
        data: T;
      };
    }
  | {
      method: WebviewServerPushEvent;
      type: "push";
      payload: {
        code: number;
        message: string;
        data: T;
      };
    };
