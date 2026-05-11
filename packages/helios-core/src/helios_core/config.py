from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
import os
import tomllib


@dataclass(frozen=True)
class AudioConfig:
    hotword: str = "Hey Helios"
    stt_provider: str = "stub"
    tts_provider: str = "stub"


@dataclass(frozen=True)
class ControlPlaneConfig:
    url: str = "http://localhost:8080"
    enabled: bool = False


@dataclass(frozen=True)
class SecurityConfig:
    allow_shell: bool = False
    upload_transcripts: bool = False


@dataclass(frozen=True)
class HeliosConfig:
    agent_id: str = "local-dev"
    audio: AudioConfig = field(default_factory=AudioConfig)
    control_plane: ControlPlaneConfig = field(default_factory=ControlPlaneConfig)
    security: SecurityConfig = field(default_factory=SecurityConfig)

    @classmethod
    def from_env(cls) -> HeliosConfig:
        return cls(
            agent_id=os.getenv("HELIOS_AGENT_ID", "local-dev"),
            audio=AudioConfig(
                hotword=os.getenv("HELIOS_HOTWORD", "Hey Helios"),
                stt_provider=os.getenv("HELIOS_STT_PROVIDER", "stub"),
                tts_provider=os.getenv("HELIOS_TTS_PROVIDER", "stub"),
            ),
            control_plane=ControlPlaneConfig(
                url=os.getenv("HELIOS_CONTROL_PLANE_URL", "http://localhost:8080"),
                enabled=os.getenv("HELIOS_CONTROL_PLANE_ENABLED", "false").lower() == "true",
            ),
            security=SecurityConfig(
                allow_shell=os.getenv("HELIOS_ALLOW_SHELL", "false").lower() == "true",
                upload_transcripts=os.getenv("HELIOS_UPLOAD_TRANSCRIPTS", "false").lower()
                == "true",
            ),
        )

    @classmethod
    def from_toml(cls, path: Path) -> HeliosConfig:
        data = tomllib.loads(path.read_text(encoding="utf-8"))
        audio = data.get("audio", {})
        control_plane = data.get("control_plane", {})
        security = data.get("security", {})
        return cls(
            agent_id=data.get("agent_id", "local-dev"),
            audio=AudioConfig(
                hotword=audio.get("hotword", "Hey Helios"),
                stt_provider=audio.get("stt_provider", "stub"),
                tts_provider=audio.get("tts_provider", "stub"),
            ),
            control_plane=ControlPlaneConfig(
                url=control_plane.get("url", "http://localhost:8080"),
                enabled=control_plane.get("enabled", False),
            ),
            security=SecurityConfig(
                allow_shell=security.get("allow_shell", False),
                upload_transcripts=security.get("upload_transcripts", False),
            ),
        )
