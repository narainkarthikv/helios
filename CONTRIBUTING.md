# Contributing to Helios

Helios uses a small-core, adapter-heavy architecture. Keep changes focused, tested, and documented.

## Local Checks

```bash
python -m unittest discover -s tests
```

When optional tooling is installed, also run:

```bash
ruff check .
mypy packages apps services
```

## Code Standards

- Keep `packages/helios-core` free of heavy runtime dependencies.
- Put Linux-specific integrations in `apps/linux-agent`.
- Put SaaS-only logic in `services/control-plane`.
- Add tests for intent parsing, permission policy, skill routing, and config behavior.
- Add or update ADRs for architecture-level choices.

## Pull Request Expectations

- Explain the user or operator impact.
- List privacy and permission changes.
- Include verification commands.
- Keep generated code reviewed and simplified before merge.

## Skill Contributions

Each skill must define:

- Name, version, and owner.
- Example utterances.
- Declared permissions.
- Configuration schema.
- Tests for success and denial paths.
