// The Long Roast: Lawmakers and the File They Cannot Convert.
// Writes one satirical sentence to $OUTPUT_PATH (default /output/entry.txt).
// Node 22, standard library only, deterministic, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 320;
const LINE =
  "They wrote 400 pages of law on how AI must behave, yet the committee still emails its intern to turn a Word file into a PDF — and the intern is on holiday until the bill passes.";

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

const length = [...LINE].length; // count Unicode code points, not UTF-16 units
if (length === 0) fail("line is empty");
if (length > MAX_CHARS) {
  fail(`line is ${length} chars, over the ${MAX_CHARS} limit`);
}
if (LINE.trim().length === 0) fail("line is only whitespace");
if (LINE !== LINE.trim()) fail("line has leading or trailing whitespace");
if (/[\r\n]/.test(LINE)) fail("line must be a single line");

const out = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, LINE, "utf8");
console.log(`wrote ${length} chars to ${out}`);
