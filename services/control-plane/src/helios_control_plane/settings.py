from __future__ import annotations

from dataclasses import dataclass
import os


@dataclass(frozen=True)
class ControlPlaneSettings:
    environment: str = "development"
    database_url: str = "postgresql://helios:helios@localhost:5432/helios"
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: str = "dev-only"

    @classmethod
    def from_env(cls) -> ControlPlaneSettings:
        return cls(
            environment=os.getenv("HELIOS_ENV", "development"),
            database_url=os.getenv(
                "HELIOS_DATABASE_URL",
                "postgresql://helios:helios@localhost:5432/helios",
            ),
            redis_url=os.getenv("HELIOS_REDIS_URL", "redis://localhost:6379/0"),
            jwt_secret=os.getenv("HELIOS_JWT_SECRET", "dev-only"),
        )
