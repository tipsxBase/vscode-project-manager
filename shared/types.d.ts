interface VsCodeApi {
  postMessage: (args: any) => void;
}

declare function acquireVsCodeApi(): VsCodeApi;
