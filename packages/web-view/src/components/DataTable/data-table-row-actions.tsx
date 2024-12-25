"use client";

import { Row } from "@tanstack/react-table";
import { ExternalLink, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Project } from "shared/interface";

interface DataTableRowActionsProps {
  row: Row<Project>;
  onEdit: (row: Project) => void;
  onOpenInCurrentWindow: (row: Project) => void;
  onDelete: (row: Project) => void;
  onOpen: (row: Project) => void;
  currentPaths: string[];
}

export function DataTableRowActions({
  row,
  onEdit,
  onDelete,
  onOpenInCurrentWindow,
  onOpen,
  currentPaths,
}: DataTableRowActionsProps) {
  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={currentPaths.includes(row.original.projectPath)}
              onClick={() => onOpen(row.original)}
              variant="ghost"
              className="flex h-7 w-7 p-0 data-[state=open]:bg-muted"
            >
              <ExternalLink />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>新窗口打开</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-7 w-7 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => onEdit(row.original)}>
            编辑
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={currentPaths.includes(row.original.projectPath)}
            onSelect={() => onOpenInCurrentWindow(row.original)}
          >
            当前窗口打开
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => onDelete(row.original)}>
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
