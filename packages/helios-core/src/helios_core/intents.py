from __future__ import annotations

from dataclasses import dataclass, field
from typing import Iterable


@dataclass(frozen=True)
class Intent:
    name: str
    examples: tuple[str, ...] = ()
    description: str = ""


@dataclass(frozen=True)
class IntentMatch:
    intent: Intent
    confidence: float
    entities: dict[str, str] = field(default_factory=dict)
    transcript: str = ""


class RuleBasedIntentParser:
    """Small deterministic parser used before any optional LLM routing."""

    def __init__(self, intents: Iterable[Intent] | None = None) -> None:
        self._intents: dict[str, Intent] = {}
        for intent in intents or default_intents():
            self.register(intent)

    def register(self, intent: Intent) -> None:
        self._intents[intent.name] = intent

    def parse(self, transcript: str) -> IntentMatch:
        normalized = " ".join(transcript.lower().strip().split())
        if not normalized:
            return self._match("assistant.unknown", 0.0, transcript)

        if normalized in {"help", "what can you do", "show commands"}:
            return self._match("assistant.help", 0.95, transcript)

        if normalized.startswith(("open ", "launch ", "start ")):
            app_name = normalized.split(" ", 1)[1]
            return self._match("desktop.launch_app", 0.9, transcript, {"app": app_name})

        if "system status" in normalized or "system info" in normalized:
            return self._match("system.status", 0.9, transcript)

        if normalized.startswith("set timer"):
            return self._match("timer.create", 0.8, transcript, {"duration": normalized[9:]})

        return self._match("assistant.unknown", 0.25, transcript)

    def _match(
        self,
        intent_name: str,
        confidence: float,
        transcript: str,
        entities: dict[str, str] | None = None,
    ) -> IntentMatch:
        intent = self._intents.get(intent_name, Intent(intent_name))
        return IntentMatch(intent, confidence, entities or {}, transcript)


def default_intents() -> tuple[Intent, ...]:
    return (
        Intent("assistant.help", ("help", "what can you do"), "List available commands."),
        Intent("assistant.unknown", (), "Fallback for unrecognized utterances."),
        Intent("desktop.launch_app", ("open terminal",), "Launch a desktop application."),
        Intent("system.status", ("system status",), "Report local agent status."),
        Intent("timer.create", ("set timer for five minutes",), "Create a timer."),
    )
