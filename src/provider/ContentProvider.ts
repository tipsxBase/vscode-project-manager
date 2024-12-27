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
    const uiPath = join(context.extensionPath, "ui");
    const manifestPath = join(uiPath, ".vite", "manifest.json");
    const manifestContent = readFileSync(manifestPath);
    const manifest = JSON.parse(manifestContent.toString());
    const jsScripts: string[] = [];
    const cssStyles: string[] = [];
    let content;
    if (this.view === WebViewType.ProjectManager) {
      content = manifest["index.html"];
    } else {
      content = manifest["tag.html"];
    }

    const { file, imports } = content;
    const index = webviewView.webview.asWebviewUri(
      vscode.Uri.file(join(uiPath, file))
    );
    jsScripts.push(
      `<script type="module" crossorigin src="${index}"></script>`
    );

    if (imports && imports.length > 0) {
      (imports as string[]).forEach((importFile) => {
        const importContent = manifest[importFile];
        const { file, src, css } = importContent;
        const script = webviewView.webview.asWebviewUri(
          vscode.Uri.file(join(uiPath, file))
        );
        jsScripts.push(
          `  <link rel="modulepreload" crossorigin href="${script}">`
        );
        if (src) {
          cssStyles.push(
            `<link rel="stylesheet" crossorigin href="${webviewView.webview.asWebviewUri(
              vscode.Uri.file(join(uiPath, src))
            )}">`
          );
        }
        if (css && css.length > 0) {
          css.forEach((cssFile: string) => {
            cssStyles.push(
              `<link rel="stylesheet" crossorigin href="${webviewView.webview.asWebviewUri(
                vscode.Uri.file(join(uiPath, cssFile))
              )}">`
            );
          });
        }
      });
    }

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${jsScripts.map((script) => script).join("\n")}
        ${cssStyles.map((style) => style).join("\n")}
    </head>
    <body>
      <div id="app"></div>
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
