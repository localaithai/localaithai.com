import { createHash } from "node:crypto";
import { lstatSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function filesIn(directory, prefix = "") {
  const files = [];
  for (const name of readdirSync(directory)) {
    const relative = prefix ? prefix + "/" + name : name;
    const filename = path.join(directory, name);
    const stat = lstatSync(filename);
    if (stat.isSymbolicLink())
      throw new Error("symlink is not permitted: " + relative);
    if (stat.isDirectory()) files.push(...filesIn(filename, relative));
    else if (stat.isFile()) files.push(relative);
  }
  return files;
}

export function verifyVendor(directory) {
  const errors = [];
  try {
    const manifest = JSON.parse(
      readFileSync(path.join(directory, "MANIFEST.json"), "utf8"),
    );
    if (
      typeof manifest.version !== "string" ||
      !/^[a-f0-9]{40}$/.test(manifest.commit) ||
      typeof manifest.domain !== "string" ||
      !/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(manifest.domain) ||
      !manifest.files ||
      typeof manifest.files !== "object" ||
      Array.isArray(manifest.files)
    ) {
      throw new Error("invalid MANIFEST.json");
    }
    const expected = Object.keys(manifest.files);
    if (
      !expected.some((name) => name.startsWith("core/")) ||
      !expected.some((name) => name.startsWith("facts/")) ||
      !expected.includes("verify.mjs") ||
      !expected.includes("social-images.mjs")
    )
      throw new Error(
        "manifest must cover core, facts, verify.mjs, and social-images.mjs",
      );
    for (const relative of expected) {
      if (
        (relative !== "verify.mjs" &&
          relative !== "social-images.mjs" &&
          !/^(core|facts)\/[^\\]+$/.test(relative)) ||
        relative.split("/").some((part) => part === ".." || part === ".") ||
        !/^[a-f0-9]{64}$/.test(manifest.files[relative])
      )
        throw new Error("invalid manifest entry: " + relative);
    }
    const actual = filesIn(directory).filter(
      (name) => name !== "MANIFEST.json",
    );
    for (const relative of actual) {
      if (!expected.includes(relative)) errors.push("extra file: " + relative);
    }
    for (const relative of expected) {
      if (!actual.includes(relative)) {
        errors.push("missing file: " + relative);
        continue;
      }
      const hash = createHash("sha256")
        .update(readFileSync(path.join(directory, relative)))
        .digest("hex");
      if (hash !== manifest.files[relative])
        errors.push("edited file: " + relative);
    }
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
  return errors;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const errors = verifyVendor(path.dirname(fileURLToPath(import.meta.url)));
  if (errors.length) {
    console.error(
      "BLOG:vendor:" +
        errors.join("; ") +
        ". Edit mimir/blog source and sync, never the vendored copy.",
    );
    process.exitCode = 1;
  }
}
