import { Redis } from "@upstash/redis";

const POSTS_KEY = "veridian:social:posts";

export type SocialPlatform = "linkedin" | "twitter" | "both";
export type PostStatus = "pending" | "posted" | "failed";

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  linkedinContent: string;
  xContent: string;
  scheduledAt: number;
  status: PostStatus;
  createdAt: number;
  postedAt?: number;
  errorMsg?: string;
}

function r(): Redis {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Upstash not configured");
  return new Redis({ url, token });
}

export async function queuePost(
  data: Pick<SocialPost, "platform" | "linkedinContent" | "xContent" | "scheduledAt">
): Promise<SocialPost> {
  const post: SocialPost = { ...data, id: crypto.randomUUID(), status: "pending", createdAt: Date.now() };
  await r().hset(POSTS_KEY, { [post.id]: JSON.stringify(post) });
  return post;
}

export async function listPosts(): Promise<SocialPost[]> {
  const raw = await r().hgetall<Record<string, string>>(POSTS_KEY);
  if (!raw) return [];
  return Object.values(raw)
    .map(v => JSON.parse(v) as SocialPost)
    .sort((a, b) => a.scheduledAt - b.scheduledAt);
}

export async function updatePost(id: string, patch: Partial<SocialPost>): Promise<void> {
  const raw = await r().hget<string>(POSTS_KEY, id);
  if (!raw) throw new Error("Post not found");
  await r().hset(POSTS_KEY, { [id]: JSON.stringify({ ...JSON.parse(raw), ...patch }) });
}

export async function deletePost(id: string): Promise<void> {
  await r().hdel(POSTS_KEY, id);
}

export async function getDuePosts(): Promise<SocialPost[]> {
  const now = Date.now();
  return (await listPosts()).filter(p => p.status === "pending" && p.scheduledAt <= now);
}
