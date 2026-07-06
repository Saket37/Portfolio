import { posts } from "../../.velite";

export const getAllPosts = () =>
  posts
    .filter((post) => post.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const getPostBySlug = (slug: string) =>
  getAllPosts().find((post) => post.slugAsParams === slug);
