from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class LlmRouteDecision:
    should_route: bool
    reason: str


class LlmRouter:
    """Policy gate for optional LLM usage.

    The local deterministic parser always runs first. This router decides whether a
    low-confidence command may be escalated to an explicitly enabled LLM provider.
    """

    def __init__(self, enabled: bool = False, min_confidence: float = 0.6) -> None:
        self._enabled = enabled
        self._min_confidence = min_confidence

    def decide(self, confidence: float) -> LlmRouteDecision:
        if not self._enabled:
            return LlmRouteDecision(False, "LLM routing is disabled.")
        if confidence >= self._min_confidence:
            return LlmRouteDecision(False, "Deterministic parser confidence is high enough.")
        return LlmRouteDecision(True, "Low-confidence command may be routed to an enabled LLM.")
