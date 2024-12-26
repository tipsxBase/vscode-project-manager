import { SaveIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tag } from "shared/interface";
import { Badge } from "../ui/badge";
import useMemoizedFn from "@/hooks/useMemoizedFn";

const colors = [
  "rgb(71 85 105)",
  "rgb(87 83 78)",
  "rgb(220 38 38)",
  "rgb(234 88 12)",
  "rgb(217 119 6)",
  "rgb(202 138 4)",
  "rgb(101 163 13)",
  "rgb(22 163 74)",
  "rgb(5 150 105)",
  "rgb(13 148 136)",
  "rgb(8 145 178)",
  "rgb(37 99 235)",
  "rgb(67 56 202)",
  "rgb(124 58 237)",
  "rgb(147 51 234)",
  "rgb(192 38 211)",
  "rgb(219 39 119)",
  "rgb(225 29 72)",
];

export interface TagEditorProps {
  tag: Tag;
  updateTag: (tag: Tag) => void;
  doSave: (tag: Tag) => void;
}

const TagEditor = ({ tag, updateTag, doSave }: TagEditorProps) => {
  const onColorChange = useMemoizedFn((color) => {
    updateTag({ ...tag, color });
  });

  return (
    <div className="h-7 flex items-center justify-between p-2 gap-2 hover:bg-muted/50">
      <div className="flex items-center gap-4">
        <Input
          value={tag.title}
          onChange={(e) => updateTag({ ...tag, title: e.target.value })}
          className="h-7 py-0 min-w-32 max-w-32"
          placeholder="请输入"
        />
        <Select onValueChange={onColorChange} value={tag.color}>
          <SelectTrigger className="w-32 py-0 h-7 px-1">
            <SelectValue placeholder="请选择" />
          </SelectTrigger>
          <SelectContent>
            {colors.map((color) => (
              <SelectItem key={color} value={color}>
                <Badge
                  style={{ backgroundColor: color }}
                  className="text-white min-w-10 h-5"
                  variant="outline"
                >
                  {tag.title}
                </Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex">
        <Button
          onClick={() => doSave(tag)}
          variant="ghost"
          className="flex h-7 w-7 p-0 data-[state=open]:bg-muted"
        >
          <SaveIcon />
        </Button>
        <Button
          onClick={() => updateTag(null)}
          variant="ghost"
          className="flex h-7 w-7 p-0 data-[state=open]:bg-muted"
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

export default TagEditor;
