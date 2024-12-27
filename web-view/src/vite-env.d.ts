/// <reference types="vite/client" />

import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (row: TData) => void;
  }
}

declare global {
  interface VsCodeApi {
    postMessage: (args: any) => void;
  }

  function acquireVsCodeApi(): VsCodeApi;
}
