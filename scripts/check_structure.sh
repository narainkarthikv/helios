#!/usr/bin/env sh
set -eu

test ! -d frontend
test ! -d backend
test -d apps/linux-agent
test -d services/control-plane
test -d packages/helios-core
test -f AGENTS.md
test -f docs/llm-development.md
