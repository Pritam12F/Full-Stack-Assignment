import z from "zod";

export const PostCreateSchema = z.object({
  uniqueId: z.number(),
  title: z.string(),
});

export const FindPostSchema = z.object({
  uniqueId: z.number(),
});

export const SubPostCreateSchema = z.object({
  content: z.string(),
  createdAt: z.date().default(() => new Date()),
  parentId: z.number(),
});
