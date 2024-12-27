import { Tag } from "shared/interface";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { DefaultTagId } from "shared/constant";

export interface TagRenderProps {
  tag: Tag;
  onEdit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
}

const TagRender = ({ tag, onEdit, onDelete }: TagRenderProps) => {
  return (
    <div className="h-7 flex items-center justify-between p-2 gap-2 hover:bg-muted/50">
      <Badge
        style={{ backgroundColor: tag.color }}
        className="text-white"
        variant="outline"
      >
        {tag.title}
      </Badge>
      <div className="flex items-center">
        <Button
          onClick={() => onDelete(tag)}
          variant="ghost"
          disabled={tag.id === DefaultTagId}
          className="h-7 w-7"
        >
          <Trash2 />
        </Button>
        <Button
          disabled={tag.id === DefaultTagId}
          onClick={() => onEdit(tag)}
          variant="ghost"
          className="h-7 w-7"
        >
          <Edit />
        </Button>
      </div>
    </div>
  );
};

export default TagRender;
