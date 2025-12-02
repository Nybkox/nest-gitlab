import {
	DEFAULT_INSTANCE_NAME,
	GITLAB_INSTANCE_OPTIONS_TOKEN,
	GITLAB_INSTANCE_TOKEN,
} from "./gitbeaker.constants.js";
import type {
	GitlabModuleAsyncOptions,
	GitlabModuleOptions,
} from "./gitbeaker.types.js";

export function getInstanceToken(
	options: GitlabModuleOptions | GitlabModuleAsyncOptions = {},
): string {
	return `${GITLAB_INSTANCE_TOKEN}_${options.name || DEFAULT_INSTANCE_NAME}`;
}

export function getInstanceOptionsToken(
	options: GitlabModuleOptions | GitlabModuleAsyncOptions = {},
): string {
	return `${GITLAB_INSTANCE_OPTIONS_TOKEN}_${options.name || DEFAULT_INSTANCE_NAME}`;
}
