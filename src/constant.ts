export enum WebviewProviderEvents {
  WebviewProviderOfManagerRegistered = "WEBVIEW_PROVIDER_OF_MANAGER_REGISTERED",
  WebviewProviderOfTagRegistered = "WEBVIEW_PROVIDER_OF_TAG_REGISTERED",
}

export enum WebViewType {
  ProjectManager = "project-manager",
  ProjectManagerTag = "project-manager-tag",
}

export const getWebViewProviderEvent = (view: WebViewType) => {
  switch (view) {
    case WebViewType.ProjectManager:
      return WebviewProviderEvents.WebviewProviderOfManagerRegistered;
    case WebViewType.ProjectManagerTag:
      return WebviewProviderEvents.WebviewProviderOfTagRegistered;
    default:
      return "";
  }
};

export enum Command {
  openFolder = "PROJECT_OPEN_FOLDER",
  openFolderInCurrentWindow = "PROJECT_OPEN_FOLDER_IN_CURRENT_WINDOW",
  saveProject = "VSCODE_PROJECT_MANAGER_SAVE_PROJECT",
}
