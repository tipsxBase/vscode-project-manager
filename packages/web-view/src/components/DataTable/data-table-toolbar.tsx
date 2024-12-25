"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useMemo } from "react";
import { Tag } from "shared/interface";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  tags: Tag[];
}

interface FilterValue {
  column: string;
  filter: string;
}

export function DataTableToolbar<TData>({
  table,
  tags,
}: DataTableToolbarProps<TData>) {
  const filterValue = table
    .getColumn("projectName")
    ?.getFilterValue() as FilterValue;

  const inputValue = useMemo(() => {
    if (!filterValue) {
      return "";
    }
    if (filterValue.column === "projectName") {
      return filterValue.filter;
    }
    return "";
  }, [filterValue]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="过滤项目"
          value={inputValue}
          onChange={(event) =>
            table.getColumn("projectName")?.setFilterValue({
              column: "projectName",
              filter: event.target.value,
            })
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <DataTableFacetedFilter
          column={table.getColumn("projectName")}
          title="标签"
          options={tags}
        />
      </div>
    </div>
  );
}
