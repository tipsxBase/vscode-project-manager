import { useCallback, useEffect, useState } from "react";
import { WebviewResponseMethod } from "shared/constant";
import { ProjectManagerStore, Tag } from "shared/interface";
import { fetchData } from "./fetch";

const TagApp = () => {
  const [tags, setTags] = useState<Tag[]>([]);

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

  return (
    <div>
      {tags.map((tag) => (
        <div>{tag.title}</div>
      ))}
    </div>
  );
};

export default TagApp;
