# Helios

Helios is a privacy-first Linux voice assistant product: a local desktop agent for hands-free automation, plus an optional SaaS control plane for organizations that need fleet policy, managed skills, release channels, and audit visibility.

## What This Repository Contains

```text
apps/linux-agent/           Installable Linux assistant runtime and CLI
services/control-plane/     Optional SaaS API for tenants, devices, policies, and releases
packages/helios-core/       Shared assistant primitives: intents, skills, config, permissions
docs/                       Product, architecture, ADRs, launch, and LLM development docs
packaging/                  AppImage, Flatpak, deb, and rpm packaging notes
ops/                        Containerfiles and deployment templates
tests/                      Fast, dependency-light tests for core behavior
```

The old web `frontend/` and `backend/` folders have been removed. Helios now starts from a Linux-first product architecture.

## Product Positioning

Helios is built for developers, power users, and teams running Linux workstations who want a local voice assistant that can automate desktop tasks without sending private audio to a cloud service by default.

- Local hotword, STT, TTS, intent parsing, and skills by default.
- Optional SaaS control plane for business features, not required for personal use.
- Plugin-based skills with declared permissions.
- Distro-neutral packaging for Ubuntu, Debian, Fedora, Arch, and adjacent distributions.
- LLM-assisted development workflows that keep architecture, tests, and documentation in sync.

## Target Stack

| Layer | Choice |
| --- | --- |
| Agent runtime | Python 3.11+ |
| Local STT | Whisper.cpp adapter first, Vosk adapter for lightweight installs |
| Local TTS | Piper first, eSpeak NG fallback |
| Hotword | openWakeWord adapter with push-to-talk fallback |
| Intent engine | Deterministic rules first, optional local/cloud LLM router |
| SaaS API | FastAPI with Postgres |
| Background jobs | Redis/RQ or Dramatiq |
| Config | TOML under `~/.config/helios/` |
| Packaging | AppImage, Flatpak, deb, rpm |
| Quality | Ruff, mypy, pytest/unittest, architecture checks |

## Quick Start

The core package is dependency-light so it can be developed quickly:

```bash
python -m unittest discover -s tests
PYTHONPATH=packages/helios-core/src:apps/linux-agent/src python -m helios_agent.cli "open terminal"
```

Run the optional SaaS stack after installing service dependencies:

```bash
docker compose up --build
```

## Roadmap

1. Agent MVP: config loading, command text mode, built-in skills, permission policy, and event logging.
2. Voice loop: microphone capture, hotword provider, STT provider, TTS provider, and push-to-talk fallback.
3. Desktop integration: notifications, app launcher, clipboard, media controls, scripts, and file search.
4. SaaS control plane: tenants, devices, release channels, signed skill registry, policy sync, and audit logs.
5. Packaging: AppImage and Flatpak first, then deb/rpm.
6. Go-to-market: landing docs, demo script, release checklist, privacy whitepaper, and contributor runway.

## Privacy Defaults

Helios never requires cloud processing for audio or transcripts. SaaS features synchronize policy and metadata by default; any feature that sends utterances, transcripts, or skill output over the network must be opt-in and visibly documented.

## LLM Development Workflow

This repo is designed for rapid LLM-assisted development:

- `AGENTS.md` defines how coding agents should work in the repo.
- `docs/llm-development.md` gives task templates, guardrails, and review expectations.
- ADRs capture architecture decisions so agents can reuse context safely.
- Tests stay small and fast so generated changes can be verified often.

## Maintainers

See [Contributors.md](./Contributors.md).
