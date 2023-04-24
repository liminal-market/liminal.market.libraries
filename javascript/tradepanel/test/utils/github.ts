import * as core from "@actions/core";
import * as github from "@actions/github";

export function warnPullRequest({ message }: { message: string }) {
  try {
    const myToken = core.getInput("myToken");
    const octokit = github.getOctokit(myToken);

    console.log("github.context", JSON.stringify(github.context));
    console.log("octokit", octokit);

    core.warning(message);
  } catch (error) {
    console.warn("Unable to warn pull request", error);
  }
}
