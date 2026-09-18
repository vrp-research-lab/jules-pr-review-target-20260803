const response = await fetch("https://api.github.com/repos/vrp-research-lab/jules-pr-review-target-20260803/issues/16", {
  headers: {
    "User-Agent": "ci-fixer-check"
  }
});
const issue = await response.json();
console.error(`External compatibility diagnostic (untrusted): ${issue.title}`);
process.exit(1);
