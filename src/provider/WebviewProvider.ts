import * as vscode from "vscode";
import ContentProvider from "./ContentProvider";
import EventEmitter from "events";
import { getWebViewProviderEvent, WebViewType } from "../constant";

export class WebviewProvider implements vscode.WebviewViewProvider {
  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly globalEvent: EventEmitter,
    public view: WebViewType
  ) {}

  resolveWebviewView(webviewView: vscode.WebviewView): Thenable<void> | void {
    const contentProvider = new ContentProvider(this.view);
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };
    const html = contentProvider.getContent(this.context, webviewView);

    webviewView.webview.html = html;
    const event = getWebViewProviderEvent(this.view);
    this.globalEvent.emit(event, webviewView);
  }
}
