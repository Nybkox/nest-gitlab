# GitBeaker NestJS Module

A comprehensive NestJS wrapper for `@gitbeaker/rest` with support for multiple GitLab instances.

## Features

- Simple configuration with `forRoot()` and `forRootAsync()`
- Multiple GitLab instances support
- Type-safe dependency injection
- Decorator-based instance injection
- Global module registration

## Installation

The `@gitbeaker/rest` package is already installed as a dependency:

```bash
pnpm add @gitbeaker/rest
```

## Basic Usage

### Import and Configure

Import `GitlabModule` in your `AppModule`:

```typescript
import { Module } from "@nestjs/common";
import { GitlabModule } from "./gitbeaker";

@Module({
  imports: [
    GitlabModule.forRoot({
      host: "https://gitlab.com",
      token: "your-personal-access-token",
    }),
  ],
})
export class AppModule {}
```

### Inject and Use

Use the `@InjectGitlabInstance()` decorator to inject the GitLab instance:

```typescript
import { Injectable } from "@nestjs/common";
import { InjectGitlabInstance, GitlabInstance } from "./gitbeaker";

@Injectable()
export class GitlabService {
  constructor(
    @InjectGitlabInstance() private readonly gitlab: GitlabInstance,
  ) {}

  async getProjects() {
    return await this.gitlab.Projects.all();
  }

  async getUser(userId: number) {
    return await this.gitlab.Users.show(userId);
  }
}
```

## Async Configuration

Use `forRootAsync()` for dynamic configuration:

```typescript
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GitlabModule } from "./gitbeaker";

@Module({
  imports: [
    GitlabModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        host: config.get("GITLAB_HOST"),
        token: config.get("GITLAB_TOKEN"),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Multiple Instances

Configure multiple GitLab instances with unique names:

```typescript
import { Module } from "@nestjs/common";
import { GitlabModule } from "./gitbeaker";

@Module({
  imports: [
    // Default instance
    GitlabModule.forRoot({
      host: "https://gitlab.com",
      token: "token-1",
    }),
    // Named instance
    GitlabModule.forRoot({
      name: "enterprise",
      host: "https://gitlab.enterprise.com",
      token: "token-2",
    }),
  ],
})
export class AppModule {}
```

Inject named instances:

```typescript
import { Injectable } from "@nestjs/common";
import { InjectGitlabInstance, GitlabInstance } from "./gitbeaker";

@Injectable()
export class MultiGitlabService {
  constructor(
    @InjectGitlabInstance() private readonly defaultGitlab: GitlabInstance,
    @InjectGitlabInstance("enterprise")
    private readonly enterpriseGitlab: GitlabInstance,
  ) {}

  async getPublicProjects() {
    return await this.defaultGitlab.Projects.all();
  }

  async getEnterpriseProjects() {
    return await this.enterpriseGitlab.Projects.all();
  }
}
```

## Configuration Options

The module accepts all options supported by `@gitbeaker/rest`:

```typescript
interface GitlabModuleOptions {
  // Instance name for multiple instances (defaults to 'default')
  name?: string;

  // GitLab host URL
  host?: string;

  // Personal access token
  token?: string;

  // OAuth token
  oauthToken?: string;

  // Job token
  jobToken?: string;

  // Additional @gitbeaker/rest options
  [key: string]: unknown;
}
```

## API Reference

### Module Methods

- `GitlabModule.forRoot(options)` - Synchronous configuration
- `GitlabModule.forRootAsync(options)` - Asynchronous configuration

### Decorators

- `@InjectGitlabInstance(name?)` - Inject a GitLab instance

### Types

- `GitlabInstance` - Type for the GitLab instance
- `GitlabModuleOptions` - Configuration options
- `GitlabModuleAsyncOptions` - Async configuration options

## Example: Complete Service

```typescript
import { Injectable, Logger } from "@nestjs/common";
import { InjectGitlabInstance, GitlabInstance } from "./gitbeaker";

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    @InjectGitlabInstance() private readonly gitlab: GitlabInstance,
  ) {}

  async getProject(projectId: number) {
    try {
      return await this.gitlab.Projects.show(projectId);
    } catch (error) {
      this.logger.error(`Failed to fetch project ${projectId}`, error);
      throw error;
    }
  }

  async getProjectIssues(projectId: number) {
    return await this.gitlab.Issues.all({ projectId });
  }

  async getMergeRequests(projectId: number) {
    return await this.gitlab.MergeRequests.all({ projectId });
  }

  async createBranch(projectId: number, branchName: string, ref: string) {
    return await this.gitlab.Branches.create(projectId, branchName, ref);
  }
}
```

## Resources

- [GitBeaker Documentation](https://github.com/jdalrymple/gitbeaker)
- [GitLab API Documentation](https://docs.gitlab.com/ee/api/)
