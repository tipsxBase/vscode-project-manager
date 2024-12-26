export enum WebviewResponseMethod {
  ExtensionInitialized = "EXTENSION_INITIALIZED",
  FetchStore = "FETCH_STORE",
  SaveProject = "SAVE_PROJECT",
  UpdateProject = "UPDATE_PROJECT",
  OpenProject = "OPEN_PROJECT",
  OpenProjectInCurrentWindow = "OPEN_PROJECT_IN_CURRENT_WINDOW",
  UpdateTag = "UPDATE_TAG",
  DeleteTag = "DELETE_TAG",
}

export enum WebviewServerPushEvent {
  TAG_UPDATED = "TAG_UPDATED",
}

export const DefaultTagId = "__TagDefault__";
