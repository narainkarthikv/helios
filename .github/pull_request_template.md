## Summary

Describe the change and the user or operator outcome.

## Product Surface

- [ ] Linux agent
- [ ] Core package
- [ ] Control plane
- [ ] Packaging
- [ ] Documentation

## Privacy and Permissions

List new or changed access to audio, desktop, filesystem, network, notifications, secrets, or shell.

## Verification

```bash
python -m unittest discover -s tests
```

## Checklist

- [ ] Tests or docs were updated.
- [ ] Architecture boundaries were preserved.
- [ ] ADR added or updated if this changes product architecture.
- [ ] Optional cloud behavior is documented and disabled by default.
