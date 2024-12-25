import * as vscode from "vscode";
import { WebviewProvider } from "./provider/WebviewProvider";
import { EventEmitter } from "events";
import { Command, WebviewProviderEvents, WebViewType } from "./constant";
import { isObject } from "./is";
import path from "path";
import { getProjectStore, saveProjectStore } from "./storage";
import { createVsCodeSuccessResponse } from "./response";
import { WebviewResponseMethod } from "shared/constant";
import { Project } from "shared/interface";
export function activate(context: vscode.ExtensionContext) {
  const storageUrl = path.join(context.globalStorageUri.path, "project.json");

  vscode.commands.registerCommand(
    Command.openFolder,
    async (project: Project) => {
      const uri = vscode.Uri.file(project.projectPath);
      vscode.commands
        .executeCommand("vscode.openFolder", uri, {
          forceNewWindow: true,
        })
        .then(
          (value) => ({}), // done
          (value) =>
            vscode.window.showInformationMessage(vscode.l10n.t("打开项目失败"))
        );
    }
  );
  vscode.commands.registerCommand(
    Command.openFolderInCurrentWindow,
    (project: Project) => {
      const uri = vscode.Uri.file(project.projectPath);
      vscode.commands
        .executeCommand("vscode.openFolder", uri, {
          forceNewWindow: false,
        })
        .then(
          (value) => ({}), // done
          (value) =>
            vscode.window.showInformationMessage(vscode.l10n.t("打开项目失败"))
        );
    }
  );

  const fetchStore = async (webviewView: vscode.WebviewView) => {
    const store = await getProjectStore(storageUrl);
    await webviewView.webview.postMessage(
      createVsCodeSuccessResponse(WebviewResponseMethod.FetchStore, store)
    );
  };

  const saveProject = async (webviewView: vscode.WebviewView) => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    const store = await getProjectStore(storageUrl);
    let updated = false;
    workspaceFolders?.forEach((workspaceFolder) => {
      const { name, uri } = workspaceFolder;
      const isExisted =
        store.list.findIndex((p) => p.projectPath === uri.path) > -1;
      if (!isExisted) {
        const project: Project = {
          projectName: name,
          projectPath: uri.path,
          projectTag: "默认",
        };
        store.list.push(project);
        updated = true;
      }
    });

    if (updated) {
      await saveProjectStore(storageUrl, store);
    }
    await webviewView.webview.postMessage(
      createVsCodeSuccessResponse(WebviewResponseMethod.SaveProject, store)
    );
  };

  const updateProject = async (
    webviewView: vscode.WebviewView,
    list: Project[]
  ) => {
    const store = await getProjectStore(storageUrl);
    store.list = list;
    await saveProjectStore(storageUrl, store);
    await webviewView.webview.postMessage(
      createVsCodeSuccessResponse(WebviewResponseMethod.UpdateProject, store)
    );
  };

  const openProject = async (project: Project) => {
    vscode.commands.executeCommand(Command.openFolder, project);
  };

  const openProjectInCurrentWindow = async (project: Project) => {
    vscode.commands.executeCommand(Command.openFolderInCurrentWindow, project);
  };

  const onExtensionInitialed = async (webviewView: vscode.WebviewView) => {
    const currentPaths = vscode.workspace.workspaceFolders?.map(
      (workspaceFolder) => {
        const { uri } = workspaceFolder;
        return uri.path;
      }
    );
    webviewView.webview.postMessage(
      createVsCodeSuccessResponse(
        WebviewResponseMethod.ExtensionInitialized,
        currentPaths
      )
    );
  };

  const handleWebviewMessage = async (
    webviewView: vscode.WebviewView,
    e: any
  ) => {
    const { method, payload } = e;
    switch (method) {
      case WebviewResponseMethod.FetchStore:
        await fetchStore(webviewView);
        break;
      case WebviewResponseMethod.SaveProject:
        await saveProject(webviewView);
        break;
      case WebviewResponseMethod.UpdateProject:
        await updateProject(webviewView, payload);
        break;
      case WebviewResponseMethod.OpenProject:
        await openProject(payload);
        break;
      case WebviewResponseMethod.OpenProjectInCurrentWindow:
        await openProjectInCurrentWindow(payload);
        break;
      case WebviewResponseMethod.ExtensionInitialized:
        await onExtensionInitialed(webviewView);
        break;
      default:
        console.warn(`Unknown method: ${method}`);
    }
  };

  try {
    const globalEvent = new EventEmitter();

    globalEvent.on(
      WebviewProviderEvents.WebviewProviderOfManagerRegistered,
      async (webviewView: vscode.WebviewView) => {
        vscode.workspace.onDidChangeConfiguration(async () => {});
        webviewView.webview.onDidReceiveMessage(async (e) => {
          if (e && isObject(e)) {
            handleWebviewMessage(webviewView, e);
          }
        });
      }
    );

    globalEvent.on(
      WebviewProviderEvents.WebviewProviderOfTagRegistered,
      async (webviewView: vscode.WebviewView) => {
        vscode.workspace.onDidChangeConfiguration(async () => {});
        webviewView.webview.onDidReceiveMessage(async (e) => {
          if (e && isObject(e)) {
            handleWebviewMessage(webviewView, e);
          }
        });
      }
    );

    const projectManagerWebviewProvider = new WebviewProvider(
      context,
      globalEvent,
      WebViewType.ProjectManager
    );

    const projectManagerTagWebviewProvider = new WebviewProvider(
      context,
      globalEvent,
      WebViewType.ProjectManagerTag
    );

    console.log("activate");
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider(
        "project-manager",
        projectManagerWebviewProvider
      )
    );

    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider(
        "project-manager-tag",
        projectManagerTagWebviewProvider
      )
    );
  } catch (error) {}
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log("close");
}
