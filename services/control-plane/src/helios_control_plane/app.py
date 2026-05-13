from __future__ import annotations

from fastapi import FastAPI

from helios_control_plane.settings import ControlPlaneSettings


def create_app() -> FastAPI:
    settings = ControlPlaneSettings.from_env()
    app = FastAPI(
        title="Helios Control Plane",
        version="0.1.0",
        description="Optional SaaS API for Helios device, policy, and release management.",
    )

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok", "environment": settings.environment}

    @app.get("/v1/product/positioning")
    def positioning() -> dict[str, str]:
        return {
            "name": "Helios",
            "market": "Privacy-first Linux voice assistant for individuals and teams.",
            "default_data_posture": "No audio or transcript upload by default.",
        }

    return app
