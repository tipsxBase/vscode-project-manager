import { DataTable } from "./components/DataTable";
import { Button } from "./components/ui/button";
import { SaveIcon, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./components/DataTable/data-table-column-header";
import { Badge } from "./components/ui/badge";
import { DataTableRowActions } from "./components/DataTable/data-table-row-actions";
import { fetchData, registerServerPushEvent } from "./fetch";
import { Project, ProjectManagerStore, Tag } from "shared/interface";
import { WebviewResponseMethod, WebviewServerPushEvent } from "shared/constant";
import { DataTableRowEditor } from "./components/DataTable/data-table-row-editor";
import useMemoizedFn from "./hooks/useMemoizedFn";

function App() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [list, setList] = useState<Project[]>([]);
  const [currentPaths, setCurrentPaths] = useState<string[]>([]);
  const [editingProject, setEditingProject] = useState<Project>(null);

  const updateStore = useMemoizedFn((store) => {
    const { list, tags } = store;
    setList(list);
    setTags(tags);
  });

  const onEdit = useMemoizedFn((row: Project) => {
    setEditingProject(row);
  });

  const onDelete = useMemoizedFn((row: Project) => {
    const nextList = list.filter(
      (item) => item.projectPath !== row.projectPath
    );
    fetchData<Project[], ProjectManagerStore>(
      WebviewResponseMethod.UpdateProject,
      nextList
    ).then((res) => {
      const { data } = res;
      updateStore(data);
    });
  });

  const onOpenInCurrentWindow = useMemoizedFn((row: Project) => {
    fetchData(WebviewResponseMethod.OpenProjectInCurrentWindow, row);
  });

  const onOpen = useMemoizedFn((row: Project) => {
    fetchData(WebviewResponseMethod.OpenProject, row);
  });

  const doSave = useMemoizedFn((project: Project) => {
    const nextList = [...list];
    const updateIndex = nextList.findIndex(
      (item) => item.projectPath === project.projectPath
    );
    nextList[updateIndex] = { ...editingProject };

    fetchData<Project[], ProjectManagerStore>(
      WebviewResponseMethod.UpdateProject,
      nextList
    ).then((res) => {
      const { data } = res;
      updateStore(data);
      setEditingProject(null);
    });
  });

  const cellRender = useMemoizedFn(
    ({ row, table }: CellContext<Project, unknown>) => {
      if (
        editingProject &&
        editingProject.projectPath === row.original.projectPath
      ) {
        return (
          <DataTableRowEditor
            table={table}
            project={editingProject}
            tags={tags}
          />
        );
      }
      const tag = tags.find((tag) => tag.id === row.original.projectTag);

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
    }
  );

  const columns: ColumnDef<Project>[] = useMemo(
    () => [
      {
        accessorKey: "projectName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="项目名称" />
        ),
        cell: cellRender,
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
        cell: ({ row }) => {
          if (
            editingProject &&
            editingProject.projectPath === row.original.projectPath
          ) {
            return (
              <div className="flex">
                <Button
                  onClick={() => doSave(row.original)}
                  variant="ghost"
                  className="flex h-7 w-7 p-0 data-[state=open]:bg-muted"
                >
                  <SaveIcon />
                </Button>
                <Button
                  onClick={() => setEditingProject(null)}
                  variant="ghost"
                  className="flex h-7 w-7 p-0 data-[state=open]:bg-muted"
                >
                  <X />
                </Button>
              </div>
            );
          }

          return (
            <DataTableRowActions
              currentPaths={currentPaths}
              onDelete={onDelete}
              onEdit={onEdit}
              onOpen={onOpen}
              onOpenInCurrentWindow={onOpenInCurrentWindow}
              row={row}
            />
          );
        },
      },
    ],
    [
      cellRender,
      editingProject,
      currentPaths,
      onDelete,
      onEdit,
      onOpen,
      onOpenInCurrentWindow,
      doSave,
    ]
  );

  const fetchStore = useMemoizedFn(() => {
    fetchData<any, ProjectManagerStore>(WebviewResponseMethod.FetchStore).then(
      (res) => {
        const { data } = res;
        updateStore(data);
      }
    );
  });

  useEffect(() => {
    fetchData(WebviewResponseMethod.ExtensionInitialized).then((res) => {
      const { data } = res;
      setCurrentPaths(data);
    });

    fetchStore();

    const unregister = registerServerPushEvent(
      WebviewServerPushEvent.StoreUpdated,
      (res) => {
        const { data } = res;
        updateStore(data);
      }
    );

    return () => {
      unregister();
    };
  }, [fetchStore, updateStore]);

  return (
    <div className="h-screen p-2 flex flex-col gap-4 relative">
      <DataTable
        updateRow={setEditingProject}
        tags={tags}
        data={list}
        columns={columns}
      />
    </div>
  );
}

export default App;
