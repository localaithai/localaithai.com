import { existsSync, mkdirSync, readdirSync, renameSync } from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const index = path.join(root, "blog.html");
const directory = path.join(root, "blog");
if (!existsSync(index)) throw new Error("BLOG:export:missing out/blog.html");
mkdirSync(directory, { recursive: true });
for (const name of readdirSync(directory).sort()) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.html$/.test(name)) continue;
  const slug = name.slice(0, -5);
  const destination = path.join(directory, slug);
  mkdirSync(destination, { recursive: true });
  renameSync(path.join(directory, name), path.join(destination, "index.html"));
}
renameSync(index, path.join(directory, "index.html"));
