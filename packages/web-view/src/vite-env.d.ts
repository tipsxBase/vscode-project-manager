/// <reference types="vite/client" />
/// <reference types="shared" />

import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (row: TData) => void;
  }
}
