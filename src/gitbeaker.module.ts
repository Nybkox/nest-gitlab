/** biome-ignore-all lint/complexity/noStaticOnlyClass: NestJS likes classes */
import { Gitlab } from "@gitbeaker/rest";
import {
	type DynamicModule,
	Global,
	Module,
	type Provider,
} from "@nestjs/common";
import type {
	GitlabInstance,
	GitlabModuleAsyncOptions,
	GitlabModuleOptions,
} from "./gitbeaker.types.js";
import {
	getInstanceOptionsToken,
	getInstanceToken,
} from "./gitbeaker.utils.js";

@Global()
@Module({})
export class GitlabModule {
	public static forRoot(options: GitlabModuleOptions = {}): DynamicModule {
		const providers = GitlabModule.createProviders(options);

		return {
			module: GitlabModule,
			providers: providers,
			exports: providers,
		};
	}

	public static forRootAsync(options: GitlabModuleAsyncOptions): DynamicModule {
		const providers = GitlabModule.createAsyncProviders(options);

		return {
			...(options.imports && { imports: options.imports }),
			module: GitlabModule,
			providers: providers,
			exports: providers,
		};
	}

	private static createProviders(options: GitlabModuleOptions): Provider[] {
		return [
			{
				provide: getInstanceOptionsToken(options),
				useValue: options,
			},
			{
				provide: getInstanceToken(options),
				useFactory: () => new Gitlab(options),
			},
		];
	}

	private static createAsyncProviders(
		options: GitlabModuleAsyncOptions,
	): Provider[] {
		return [
			{
				provide: getInstanceOptionsToken(options),
				useFactory: options.useFactory ?? (() => ({})),
				inject: (options.inject ?? []) as never[],
			},
			{
				provide: getInstanceToken(options),
				useFactory: (
					gitlabModuleOptions: GitlabModuleOptions,
				): GitlabInstance => new Gitlab(gitlabModuleOptions),
				inject: [getInstanceOptionsToken(options)],
			},
		];
	}
}
