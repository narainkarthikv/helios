from __future__ import annotations

from helios_core.permissions import Permission
from helios_core.skills import SkillManifest, SkillRequest, SkillResult


def help_manifest() -> SkillManifest:
    return SkillManifest(
        name="assistant-help",
        version="0.1.0",
        intents=("assistant.help",),
        description="Lists available Helios commands.",
    )


def help_handler(_: SkillRequest) -> SkillResult:
    return SkillResult(
        speech="Try saying: system status, open terminal, or set timer for five minutes."
    )


def status_manifest() -> SkillManifest:
    return SkillManifest(
        name="system-status",
        version="0.1.0",
        intents=("system.status",),
        permissions=frozenset({Permission.DESKTOP}),
        description="Reports local agent status.",
    )


def status_handler(request: SkillRequest) -> SkillResult:
    return SkillResult(
        speech=f"Helios agent {request.agent_id} is online.",
        data={"agent_id": request.agent_id},
    )


def launcher_manifest() -> SkillManifest:
    return SkillManifest(
        name="desktop-launcher",
        version="0.1.0",
        intents=("desktop.launch_app",),
        permissions=frozenset({Permission.DESKTOP}),
        description="Launches desktop applications through a platform adapter.",
    )


def launcher_handler(request: SkillRequest) -> SkillResult:
    app = request.match.entities.get("app", "application")
    return SkillResult(
        speech=f"I would launch {app}. Desktop adapter wiring comes next.",
        data={"app": app},
    )
