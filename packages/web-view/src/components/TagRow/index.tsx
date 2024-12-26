import { Tag } from "shared/interface";
import TagEditor from "./TagEditor";
import TagRender from "./TagRender";

export interface TagRowProps {
  tag: Tag;
  currentEditTag: Tag;
  onEdit: (tag: Tag) => void;
  updateTag: (tag: Tag) => void;
  doSave: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
}

const TagRow = ({
  tag,
  currentEditTag,
  onEdit,
  updateTag,
  doSave,
  onDelete,
}: TagRowProps) => {
  if (tag.id === currentEditTag?.id) {
    return (
      <TagEditor doSave={doSave} updateTag={updateTag} tag={currentEditTag} />
    );
  }
  return <TagRender onDelete={onDelete} onEdit={onEdit} tag={tag} />;
};

export default TagRow;
