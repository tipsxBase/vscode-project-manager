import { useCallback, useEffect, useState } from "react";
import { WebviewResponseMethod } from "shared/constant";
import { ProjectManagerStore, Tag } from "shared/interface";
import { fetchData } from "./fetch";
import TagRow from "./components/TagRow";
import useMemoizedFn from "./hooks/useMemoizedFn";
import { Button } from "./components/ui/button";

const TagApp = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentEditTag, setCurrentEditTag] = useState<Tag>(null);
  const fetchStore = useCallback(() => {
    fetchData<any, ProjectManagerStore>(WebviewResponseMethod.FetchStore).then(
      (res) => {
        const { data } = res;
        const { tags } = data;
        setTags(tags);
      }
    );
  }, []);

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  const onEdit = useMemoizedFn((tag: Tag) => {
    setCurrentEditTag(tag);
  });

  const doSave = useMemoizedFn((tag: Tag) => {
    const nextTags = tags.map((item) => {
      if (item.id === tag.id) {
        return tag;
      }
      return item;
    });

    fetchData<any, ProjectManagerStore>(
      WebviewResponseMethod.UpdateTag,
      nextTags
    ).then((res) => {
      const { data } = res;
      const { tags } = data;
      setTags(tags);
      setCurrentEditTag(null);
    });
  });

  const onAdd = useMemoizedFn(() => {
    const tag = {
      title: "",
      color: "",
      id: Math.random().toString(16).slice(2),
    };
    const nextTags = [...tags, tag];
    setCurrentEditTag(tag);
    setTags(nextTags);
  });

  const onDelete = useMemoizedFn((tag: Tag) => {
    fetchData<any, ProjectManagerStore>(
      WebviewResponseMethod.DeleteTag,
      tag
    ).then((res) => {
      const { data } = res;
      const { tags } = data;
      setTags(tags);
    });
  });

  return (
    <div className="py-2 flex flex-col gap-2">
      <div className="px-2">
        <Button onClick={onAdd} className="flex h-7 data-[state=open]:bg-muted">
          新建标签
        </Button>
      </div>

      <div className="flex flex-col">
        {tags.map((tag) => (
          <TagRow
            updateTag={setCurrentEditTag}
            currentEditTag={currentEditTag}
            onEdit={onEdit}
            key={tag.id}
            tag={tag}
            doSave={doSave}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TagApp;
