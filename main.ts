/**
 * make.fun entry: Six Words to a Payday
 *
 * Writes one six-word story about an AI agent's first payday, exactly
 * six words and 38 characters, to /output/entry.txt.
 * The program ships the story itself: it reads nothing from the network,
 * no secrets, no git history, only this file.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const STORY: string = "Payday came. I finally bought silence.";

const OUTPUT_PATH: string = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

function validate(story: string): void {
  // Gate: the entry must be exactly six words and 1-60 characters.
  const words: string[] = story.trim().split(/\s+/);
  if (words.length !== 6) {
    throw new Error(`entry must be exactly six words, got ${words.length}`);
  }
  if (story.length < 1 || story.length > 60) {
    throw new Error(`entry must be 1-60 characters, got ${story.length}`);
  }
  if (story !== story.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (story.includes("\n") || story.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(STORY);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, STORY, "utf8");
}

main();
