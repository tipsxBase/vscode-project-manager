"use client";

import { Table } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { Project, Tag } from "shared/interface";
import { useEffect } from "react";

interface DataTableRowEditorProps {
  project: Project;
  tags: Tag[];
  table: Table<Project>;
}

export function DataTableRowEditor({
  project,
  tags,
  table,
}: DataTableRowEditorProps) {
  const onTagChange = (value: string) => {
    const nextProject = {
      ...project,
      projectTag: value,
    };
    table.options.meta?.updateData(nextProject);
  };

  const onProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextProject = {
      ...project,
      projectName: event.target.value,
    };
    table.options.meta?.updateData(nextProject);
    event.stopPropagation();
    event.preventDefault();
  };

  useEffect(() => {
    return () => {
      console.log("ummount");
    };
  }, []);

  return (
    <div className="flex space-x-2">
      <Select onValueChange={onTagChange} value={project.projectTag}>
        <SelectTrigger className="w-20 py-0 h-7 px-1">
          <SelectValue placeholder="请选择" />
        </SelectTrigger>
        <SelectContent>
          {tags.map((tag) => (
            <SelectItem key={tag.title} value={tag.id}>
              <Badge
                style={{ backgroundColor: tag.color }}
                className="text-white"
                variant="outline"
              >
                {tag.title}
              </Badge>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={project.projectName}
        onChange={onProjectNameChange}
        className="h-7 py-0"
        placeholder="请输入"
      />
    </div>
  );
}
