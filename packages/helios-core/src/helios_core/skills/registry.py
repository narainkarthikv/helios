from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass, field

from helios_core.intents import IntentMatch
from helios_core.permissions import Permission, PermissionPolicy


@dataclass(frozen=True)
class SkillManifest:
    name: str
    version: str
    intents: tuple[str, ...]
    permissions: frozenset[Permission] = field(default_factory=frozenset)
    description: str = ""


@dataclass(frozen=True)
class SkillRequest:
    match: IntentMatch
    agent_id: str


@dataclass(frozen=True)
class SkillResult:
    speech: str
    data: dict[str, str] = field(default_factory=dict)
    success: bool = True


SkillHandler = Callable[[SkillRequest], SkillResult]


@dataclass(frozen=True)
class RegisteredSkill:
    manifest: SkillManifest
    handler: SkillHandler


class SkillRegistry:
    def __init__(self, policy: PermissionPolicy) -> None:
        self._policy = policy
        self._skills: dict[str, RegisteredSkill] = {}

    def register(self, manifest: SkillManifest, handler: SkillHandler) -> None:
        if not self._policy.allows(manifest.permissions):
            missing = sorted(permission.value for permission in manifest.permissions - self._policy.allowed)
            raise PermissionError(f"Skill '{manifest.name}' requires denied permissions: {missing}")
        for intent in manifest.intents:
            self._skills[intent] = RegisteredSkill(manifest, handler)

    def dispatch(self, request: SkillRequest) -> SkillResult:
        skill = self._skills.get(request.match.intent.name)
        if skill is None:
            return SkillResult(
                speech="I do not have a skill for that yet.",
                data={"intent": request.match.intent.name},
                success=False,
            )
        return skill.handler(request)

    def manifests(self) -> tuple[SkillManifest, ...]:
        seen: dict[str, SkillManifest] = {}
        for skill in self._skills.values():
            seen[skill.manifest.name] = skill.manifest
        return tuple(seen.values())
