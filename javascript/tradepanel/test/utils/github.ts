import * as core from "@actions/core";
import * as github from "@actions/github";

export function warnAnnotation({ message }: { message: string }) {
  core.warning(message);
}
export function infoAnnotation({ message }: { message: string }) {
  core.info(message);
}
