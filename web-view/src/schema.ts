import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const projectSchema = z.object({
  projectName: z.string(),
  projectTag: z.string(),
  projectPath: z.string(),
});

export const tagSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "标签名称不能为空"),
  color: z.string().min(1, "标签颜色不能为空"),
});
