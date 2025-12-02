import type { Gitlab } from "@gitbeaker/rest";
import type { ModuleMetadata, Type } from "@nestjs/common";

export type GitlabInstance = Gitlab;

export interface GitlabModuleOptions {
	/**
	 * Name of the GitLab instance (for multiple instances support)
	 * Defaults to 'default'
	 */
	name?: string;

	/**
	 * GitLab host URL
	 */
	host?: string;

	/**
	 * GitLab personal access token or OAuth token
	 */
	token?: string;

	/**
	 * OAuth token for authentication
	 */
	oauthToken?: string;

	/**
	 * Job token for authentication
	 */
	jobToken?: string;

	/**
	 * Additional options passed to @gitbeaker/rest Gitlab constructor
	 */
	[key: string]: unknown;
}

export interface GitlabModuleOptionsFactory {
	createGitlabModuleOptions():
		| Promise<GitlabModuleOptions>
		| GitlabModuleOptions;
}

export interface GitlabModuleAsyncOptions
	extends Pick<ModuleMetadata, "imports"> {
	/**
	 * Name of the GitLab instance
	 */
	name?: string;

	/**
	 * Factory function to create module options
	 */
	useFactory?: (
		...args: unknown[]
	) => Promise<GitlabModuleOptions> | GitlabModuleOptions;

	/**
	 * Dependencies to inject into the factory function
	 */
	inject?: unknown[];

	/**
	 * Use existing class to create options
	 */
	useExisting?: Type<GitlabModuleOptionsFactory>;

	/**
	 * Use class to create options
	 */
	useClass?: Type<GitlabModuleOptionsFactory>;
}
