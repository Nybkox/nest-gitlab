export { DEFAULT_INSTANCE_NAME } from "./gitbeaker.constants.js";
export { InjectGitlabInstance } from "./gitbeaker.decorators.js";

export type {
	GitlabInstance,
	GitlabModuleAsyncOptions,
	GitlabModuleOptions,
	GitlabModuleOptionsFactory,
} from "./gitbeaker.types.js";
export { GitlabModule } from "./gitbeaker.module.js";

export {
	getInstanceOptionsToken,
	getInstanceToken,
} from "./gitbeaker.utils.js";
