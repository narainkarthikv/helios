from __future__ import annotations

from dataclasses import dataclass

from helios_core.config import HeliosConfig
from helios_core.intents import RuleBasedIntentParser
from helios_core.permissions import PermissionPolicy
from helios_core.skills import SkillRegistry, SkillRequest, SkillResult
from helios_core.skills.builtins import (
    help_handler,
    help_manifest,
    launcher_handler,
    launcher_manifest,
    status_handler,
    status_manifest,
)


@dataclass
class AgentRuntime:
    config: HeliosConfig
    parser: RuleBasedIntentParser
    skills: SkillRegistry

    @classmethod
    def create(cls, config: HeliosConfig | None = None) -> AgentRuntime:
        active_config = config or HeliosConfig.from_env()
        registry = SkillRegistry(PermissionPolicy.local_default())
        registry.register(help_manifest(), help_handler)
        registry.register(status_manifest(), status_handler)
        registry.register(launcher_manifest(), launcher_handler)
        return cls(
            config=active_config,
            parser=RuleBasedIntentParser(),
            skills=registry,
        )

    def handle_text(self, transcript: str) -> SkillResult:
        match = self.parser.parse(transcript)
        request = SkillRequest(match=match, agent_id=self.config.agent_id)
        return self.skills.dispatch(request)
