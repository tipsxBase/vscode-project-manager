export enum WebviewResponseMethod {
  ExtensionInitialized = "EXTENSION_INITIALIZED",
  FetchStore = "FETCH_STORE",
  UpdateProject = "UPDATE_PROJECT",
  OpenProject = "OPEN_PROJECT",
  OpenProjectInCurrentWindow = "OPEN_PROJECT_IN_CURRENT_WINDOW",
  UpdateTag = "UPDATE_TAG",
  DeleteTag = "DELETE_TAG",
}

export enum WebviewServerPushEvent {
  StoreUpdated = "STORE_UPDATED",
  TriggerNewTagAction = "TRIGGER_NEW_TAG_ACTION",
}

export const DefaultTagId = "__TagDefault__";
