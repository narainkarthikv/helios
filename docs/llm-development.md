# LLM-Assisted Development

Helios should be easy to build with coding agents while staying maintainable for humans.

## Development Pattern

1. Start from an issue with a narrow user outcome.
2. Identify the product surface: core, agent, control plane, packaging, docs, or ops.
3. Ask the LLM for the smallest tested implementation.
4. Run fast tests.
5. Review for privacy, permissions, and architecture boundaries.
6. Record meaningful design changes in `docs/adr/`.

## Prompt Template

```text
Implement [feature] in [product surface].
Respect Helios architecture:
- local-first by default
- no audio/transcript upload unless explicitly enabled
- core stays dependency-light
- skills declare permissions
Add or update tests and docs.
```

## Review Checklist

- Does this add a cloud dependency to local agent usage?
- Does it introduce shell, filesystem, network, or secrets access?
- Are permissions declared and tested?
- Is the implementation smaller than the abstraction it adds?
- Can a new contributor understand the behavior from tests and docs?
