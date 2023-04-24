import * as core from "@actions/core";
import { Octokit } from "@octokit/action";

const octokit = new Octokit();
const owner = process?.env?.GITHUB_REPOSITORY?.split("/")[0];
const repo = process?.env?.GITHUB_REPOSITORY?.split("/")[1];

export function warnWithNewCheck({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  octokit.checks.create({
    owner,
    repo,
    name: "Liminal Market Check",
    head_sha: process.env.GITHUB_SHA,
    status: "completed",
    conclusion: "skipped",
    output: {
      title: title,
      summary: message,
    },
  });

  core.warning(message);
}
