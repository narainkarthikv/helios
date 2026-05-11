# Agent Development Guide

This repository is optimized for LLM-assisted development. Coding agents should preserve the architecture boundaries and leave the repo easier for the next contributor to understand.

## Rules

- Keep core logic in `packages/helios-core` dependency-light.
- Do not add cloud requirements to the local agent.
- Do not send audio, transcripts, or command history to a service by default.
- Add tests for behavior changes.
- Update docs or ADRs when architecture changes.
- Prefer small, reviewable patches.

## Useful Commands

```bash
python -m unittest discover -s tests
PYTHONPATH=packages/helios-core/src:apps/linux-agent/src python -m helios_agent.cli "system status"
```

## Task Template

1. Identify the product surface: agent, core, control plane, packaging, docs, or ops.
2. Check existing interfaces before adding new abstractions.
3. Implement the smallest useful slice.
4. Add tests.
5. Update documentation.
6. Summarize risks and follow-up work.
