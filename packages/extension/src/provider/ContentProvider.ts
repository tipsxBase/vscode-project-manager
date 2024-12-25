import * as vscode from "vscode";
import { join } from "path";
import { readFileSync } from "fs";
import { WebViewType } from "../constant";

export default class ContentProvider {
  constructor(public view: WebViewType) {}

  getDevServerContent(
    context: vscode.ExtensionContext,
    webviewView: vscode.WebviewView
  ) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body data-view="${webviewView.viewType}">
      <div id="root"></div>
      <script type="module">
        import RefreshRuntime from "http://localhost:5173/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
      </script>
      <script type="module" src="http://localhost:5173/@vite/client"></script>
      ${
        this.view === WebViewType.ProjectManager
          ? '<script type="module" src="http://localhost:5173/src/main.tsx"></script>'
          : '<script type="module" src="http://localhost:5173/src/tagMain.tsx"></script>'
      }
      
    </body>
    </html>
      `;
  }

  getProductionContent(
    context: vscode.ExtensionContext,
    webviewView: vscode.WebviewView
  ) {
    const uiPath = join(context.extensionPath, "out", "ui");
    const manifestPath = join(uiPath, ".vite", "manifest.json");
    const manifestContent = readFileSync(manifestPath);
    const manifest = JSON.parse(manifestContent.toString());

    const indexJS = vscode.Uri.file(
      join(context.extensionPath, "out", "ui", manifest["index.html"].file)
    );
    const indexCSS = vscode.Uri.file(
      join(context.extensionPath, "out", "ui", manifest["index.html"].css[0])
    );

    const index = webviewView.webview.asWebviewUri(indexJS);
    const css = webviewView.webview.asWebviewUri(indexCSS);
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link href="${css}" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <div id="app"></div>
      <script type="module" src="${index}"></script>
    </body>
    </html>
      `;
  }

  getContent(
    context: vscode.ExtensionContext,
    webviewView: vscode.WebviewView
  ) {
    if (process.env.NODE_ENV === "production") {
      return this.getProductionContent(context, webviewView);
    }
    return this.getDevServerContent(context, webviewView);
  }
}
