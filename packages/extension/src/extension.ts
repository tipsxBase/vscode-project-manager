import * as vscode from "vscode";
import { WebviewProvider } from "./provider/WebviewProvider";
import { EventEmitter } from "events";
import { WebviewProviderEvents } from "./constant";
import { isObject } from "./is";
import path from "path";
import { getProjectStore, saveProjectStore } from "./storage";
import { createVsCodeSuccessResponse } from "./response";
import { WebviewResponseMethod } from "shared/constant";
import { Project } from "shared/interface";
export function activate(context: vscode.ExtensionContext) {
  const storageUrl = path.join(context.globalStorageUri.path, "project.json");

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
      if (isExisted) {
        // 已经存在则不处理
      } else {
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

  try {
    const globalEvent = new EventEmitter();

    globalEvent.on(
      WebviewProviderEvents.WebviewProviderRegistered,
      async (webviewView: vscode.WebviewView) => {
        vscode.workspace.onDidChangeConfiguration(async () => {});

        webviewView.webview.onDidReceiveMessage(async (e) => {
          if (e && isObject(e)) {
            const { method, type, payload } = e;
            if (method === WebviewResponseMethod.FetchStore) {
              await fetchStore(webviewView);
            } else if (method === WebviewResponseMethod.SaveProject) {
              // 保存项目
              await saveProject(webviewView);
            }
          }
        });
      }
    );

    const webviewProvider = new WebviewProvider(context, globalEvent);
    console.log("activate");
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider(
        "project-manager",
        webviewProvider
      )
    );
  } catch (error) {}
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log("close");
}
