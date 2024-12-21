import { DataTable } from "./components/DataTable";
import { Button } from "./components/ui/button";
import { Save } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./components/DataTable/data-table-column-header";
import { Badge } from "./components/ui/badge";
import { DataTableRowActions } from "./components/DataTable/data-table-row-actions";
import { fetchData } from "./fetch";
import { Project, ProjectManagerStore, Tag } from "shared/interface";
import { WebviewResponseMethod } from "shared/constant";

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

  const fetchStore = useCallback(() => {
    fetchData<any, ProjectManagerStore>(WebviewResponseMethod.FetchStore).then(
      (res) => {
        const { data } = res;
        const { list, tags } = data;
        setList(list);
        setTags(tags);
      }
    );
  }, []);

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  const doSave = useCallback(() => {
    fetchData(WebviewResponseMethod.SaveProject).then(() => {
      fetchStore();
    });
  }, [fetchStore]);

  return (
    <div className="h-screen py-5 flex flex-col gap-4 relative">
      <Button size="sm" className="absolute right-0 top-5" onClick={doSave}>
        <Save /> 保存项目
      </Button>
      <DataTable tags={tags} data={list} columns={columns} />
    </div>
  );
}

export default App;
