import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const projectSchema = z.object({
  projectName: z.string(),
  projectTag: z.string(),
  projectPath: z.string(),
});

export type Project = z.infer<typeof projectSchema>;
