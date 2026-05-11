# ADR 0002: Local-First Privacy

## Status

Accepted

## Context

A Linux voice assistant handles sensitive audio, transcripts, commands, and desktop state.

## Decision

Helios does not upload audio or transcripts by default. Optional cloud or SaaS integrations must be explicit, documented, and policy-controlled.

## Consequences

- Offline providers are the default engineering path.
- SaaS features focus on policy, releases, and fleet management before transcript features.
- Any networked assistant intelligence must pass a privacy review.
