import { SaveIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tag } from "shared/interface";

import useMemoizedFn from "@/hooks/useMemoizedFn";

import ColorSelect from "../ColorSelect";
import { tagSchema } from "@/schema";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface TagEditorProps {
  tag: Tag;
  updateTag: (tag: Tag) => void;
  doSave: (tag: Tag) => void;
  onCancel: (tag: Tag) => void;
}

const TagEditor = ({ tag, updateTag, doSave, onCancel }: TagEditorProps) => {
  const [errors, setErrors] = useState([]);
  const onColorChange = useMemoizedFn((color) => {
    updateTag({ ...tag, color });
  });

  const validateDoSave = useMemoizedFn((tag) => {
    try {
      tagSchema.parse(tag);
      doSave(tag);
      setErrors([]);
    } catch (e: any) {
      console.log(e.errors);
      setErrors(e.errors);
    }
  });

  const hasError = useMemoizedFn((propName) => {
    return errors.some((err) => err.path.includes(propName));
  });

  return (
    <div className="flex items-center justify-between p-2 gap-2 hover:bg-muted/50">
      <div className="flex items-center gap-4">
        <Input
          value={tag.title}
          onChange={(e) => updateTag({ ...tag, title: e.target.value })}
          className={cn(
            "h-7 py-0 min-w-32 max-w-32",
            hasError("title") && "border-red-500"
          )}
          placeholder="请输入"
        />

        <ColorSelect
          className={hasError("color") ? "border-red-500" : ""}
          value={tag.color}
          onChange={onColorChange}
        />
      </div>
      <div className="flex">
        <Button
          onClick={() => validateDoSave(tag)}
          variant="ghost"
          className="flex h-7 w-7 p-0 data-[state=open]:bg-muted"
        >
          <SaveIcon />
        </Button>
        <Button
          onClick={() => onCancel(tag)}
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
