import { Inject } from "@nestjs/common";
import { DEFAULT_INSTANCE_NAME } from "./gitbeaker.constants.js";
import { getInstanceToken } from "./gitbeaker.utils.js";

/**
 * Decorator to inject a GitLab instance
 * @param name - Optional instance name (defaults to 'default')
 * @returns Parameter decorator
 *
 * @example
 * ```typescript
 * constructor(@InjectGitlabInstance() private gitlab: GitlabInstance) {}
 * ```
 *
 * @example
 * ```typescript
 * constructor(@InjectGitlabInstance('secondary') private gitlab: GitlabInstance) {}
 * ```
 */
export function InjectGitlabInstance(
	name = DEFAULT_INSTANCE_NAME,
): ParameterDecorator {
	return Inject(getInstanceToken({ name }));
}
