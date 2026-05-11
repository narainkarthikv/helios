# Helios Architecture

Helios is split into three product surfaces:

1. **Linux agent**: local assistant runtime that owns audio, intent routing, skills, permissions, and desktop integration.
2. **Core package**: shared domain logic that stays deterministic, testable, and dependency-light.
3. **Control plane**: optional SaaS API for teams managing many Linux devices.

## Runtime Flow

```text
hotword/push-to-talk -> audio session -> STT -> intent parser -> permission policy
  -> skill execution -> result event -> TTS/notification/UI response
```

## Agent Boundaries

- Audio providers are adapters. The core runtime should not depend directly on a specific STT, TTS, or hotword engine.
- Skills declare permissions before use. Undeclared permissions are denied.
- The SaaS control plane does not receive audio by default.
- Desktop integrations live behind adapter interfaces so GNOME, KDE, Wayland, X11, PipeWire, PulseAudio, and ALSA differences stay isolated.

## SaaS Control Plane

The control plane is for go-to-market business workflows:

- Tenant and organization management.
- Device enrollment and heartbeat.
- Release channel assignment.
- Signed skill registry and policy sync.
- Audit trails for administrative actions.
- Billing and entitlement integration later.

## Repository Contracts

- Core code must remain importable without optional voice or web dependencies.
- Agent code may depend on Linux-specific packages behind adapters.
- Control-plane code may depend on FastAPI/Postgres, but it must not be required for local assistant usage.
- Every new subsystem should include an ADR when it changes product architecture.
