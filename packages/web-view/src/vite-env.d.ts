/// <reference types="vite/client" />

interface VsCodeApi {
  postMessage: (args: { type: string; payload?: any }) => void;
}

declare function acquireVsCodeApi(): VsCodeApi;
