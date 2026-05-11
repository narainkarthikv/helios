# ADR 0001: Product Architecture

## Status

Accepted

## Context

Helios needs to be both a privacy-first local Linux assistant and a viable SaaS product for teams.

## Decision

Use a monorepo with three main surfaces:

- `packages/helios-core` for deterministic assistant domain logic.
- `apps/linux-agent` for local Linux runtime and desktop/audio integrations.
- `services/control-plane` for optional SaaS workflows.

## Consequences

- Local personal usage does not require the SaaS service.
- SaaS work can move quickly without polluting the local agent.
- Shared contracts live in a dependency-light package.
