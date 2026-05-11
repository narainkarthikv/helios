from __future__ import annotations

import argparse

from helios_agent.runtime import AgentRuntime


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Helios Linux agent developer CLI")
    parser.add_argument("command", nargs="*", help="Text command to run through the agent")
    parser.add_argument(
        "--list-skills",
        action="store_true",
        help="List registered local skills",
    )
    return parser


def main() -> None:
    args = build_parser().parse_args()
    runtime = AgentRuntime.create()

    if args.list_skills:
        for manifest in runtime.skills.manifests():
            print(f"{manifest.name} {manifest.version}: {manifest.description}")
        return

    transcript = " ".join(args.command).strip() or "help"
    result = runtime.handle_text(transcript)
    print(result.speech)


if __name__ == "__main__":
    main()
