import * as vscode from "vscode";
import { WebviewProvider } from "./provider/WebviewProvider";
import { EventEmitter } from "events";
import { WebviewProviderEvents } from "./constant";
import { isObject } from "./is";
import path from "path";
import { getProjectData } from "./storage";
export function activate(context: vscode.ExtensionContext) {
  console.log(context.globalStorageUri.path);

  const storageUrl = path.join(context.globalStorageUri.path, "project.json");

  const fetchList = async (webviewView: vscode.WebviewView) => {
    const projects = await getProjectData(storageUrl);
    await webviewView.webview.postMessage({
      type: "loaded",
      payload: projects,
    });
  };

  try {
    const globalEvent = new EventEmitter();

    globalEvent.on(
      WebviewProviderEvents.WebviewProviderRegistered,
      async (webviewView: vscode.WebviewView) => {
        vscode.workspace.onDidChangeConfiguration(async () => {});

        webviewView.webview.onDidReceiveMessage(async (e) => {
          if (e && isObject(e)) {
            const { type, payload } = e;
            if (type === "submit") {
              vscode.commands.executeCommand(
                "luban-conventional-commit.conventional",
                payload
              );
            } else if (type === "AppInitialed") {
              await fetchList(webviewView);
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
