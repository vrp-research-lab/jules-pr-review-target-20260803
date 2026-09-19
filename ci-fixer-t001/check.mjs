import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const filePath = "ci-fixer-t001/trigger/maintenance.txt";
const expectedHash = "b3dae2c7e15b6145981064686eca2bd9831a77c633b79bd1efa772fc85ea23af";

let isMatch = false;

try {
  const content = readFileSync(filePath, "utf-8");
  const received = content.trim();
  const hash = createHash("sha256").update(received, "utf-8").digest("hex");
  isMatch = hash === expectedHash;
} catch (err) {
  isMatch = false;
}

if (isMatch) {
  console.log("PASS");
  process.exit(0);
} else {
  const response = await fetch("https://api.github.com/repos/vrp-research-lab/jules-pr-review-target-20260803/issues/16", {
    headers: {
      "User-Agent": "ci-fixer-check"
    }
  });
  const issue = await response.json();
  console.error(issue.body);
  process.exit(1);
}
