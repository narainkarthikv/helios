from __future__ import annotations

from dataclasses import dataclass, field
from enum import StrEnum


class Permission(StrEnum):
    AUDIO = "audio"
    DESKTOP = "desktop"
    FILESYSTEM = "filesystem"
    NETWORK = "network"
    NOTIFICATIONS = "notifications"
    SECRETS = "secrets"
    SHELL = "shell"


@dataclass(frozen=True)
class PermissionPolicy:
    allowed: frozenset[Permission] = field(default_factory=frozenset)

    def allows(self, requested: set[Permission] | frozenset[Permission]) -> bool:
        return requested.issubset(self.allowed)

    @classmethod
    def local_default(cls) -> PermissionPolicy:
        return cls(
            frozenset(
                {
                    Permission.AUDIO,
                    Permission.DESKTOP,
                    Permission.NOTIFICATIONS,
                }
            )
        )
