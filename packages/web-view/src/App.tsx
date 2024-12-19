import { DataTable } from "./components/DataTable";
import { Button } from "./components/ui/button";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Project } from "./schema";
import { DataTableColumnHeader } from "./components/DataTable/data-table-column-header";
import { Badge } from "./components/ui/badge";
import { DataTableRowActions } from "./components/DataTable/data-table-row-actions";
import { cn } from "./lib/utils";
import { Tag } from "./type";
const vscode = acquireVsCodeApi();

function App() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [list, setList] = useState<Project[]>([]);
  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "projectName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="项目名称" />
      ),
      cell: ({ row }) => {
        const tag = tags.find((tag) => tag.title === row.original.projectTag);

        return (
          <div className="flex space-x-2">
            {tag && (
              <Badge
                style={{ backgroundColor: tag.color }}
                className="text-white"
                variant="outline"
              >
                {tag.title}
              </Badge>
            )}
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("projectName")}
            </span>
          </div>
        );
      },
      filterFn: (row, _, value) => {
        const { column, filter } = value;
        if (column === "projectName") {
          return (row.getValue(column) as string).includes(filter);
        } else if (column === "projectTag") {
          return filter?.includes(row.original.projectTag as string);
        }
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];

  useEffect(() => {
    vscode.postMessage({
      type: "AppInitialed",
    });

    window.addEventListener("message", (message) => {
      const { type, data } = message;
      if (type === "message") {
        const { type, payload } = data;
        switch (type) {
          case "loaded": {
            const { list, tags } = payload;
            setTags(tags);
            setList(list);
          }
        }
      }
    });
  }, []);

  return (
    <div className="h-screen py-5 flex flex-col gap-4">
      <div className="flex gap-3 bg-slate-950">
        <Button>
          <Save /> 保存项目
        </Button>
        <Button variant="destructive">批量删除项目</Button>
      </div>
      <DataTable tags={tags} data={list} columns={columns} />
    </div>
  );
}

export default App;
