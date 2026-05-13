.PHONY: test lint typecheck agent

PYTHONPATH := packages/helios-core/src:apps/linux-agent/src:services/control-plane/src

test:
	PYTHONPATH=$(PYTHONPATH) python -m unittest discover -s tests

lint:
	ruff check .

typecheck:
	mypy packages apps services

agent:
	PYTHONPATH=$(PYTHONPATH) python -m helios_agent.cli "system status"
