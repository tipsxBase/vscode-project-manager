import * as vscode from "vscode";
import ContentProvider from "./ContentProvider";
import EventEmitter from "events";
import { WebviewProviderEvents } from "../constant";

export class WebviewProvider implements vscode.WebviewViewProvider {
  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly globalEvent: EventEmitter
  ) {}

  resolveWebviewView(webviewView: vscode.WebviewView): Thenable<void> | void {
    const contentProvider = new ContentProvider();
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };
    const html = contentProvider.getContent(this.context, webviewView);

    webviewView.webview.html = html;

    this.globalEvent.emit(
      WebviewProviderEvents.WebviewProviderRegistered,
      webviewView
    );
  }
}
