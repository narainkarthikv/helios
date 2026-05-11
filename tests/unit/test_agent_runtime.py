from __future__ import annotations

import unittest

from helios_agent.runtime import AgentRuntime


class AgentRuntimeTests(unittest.TestCase):
    def test_agent_handles_system_status(self) -> None:
        runtime = AgentRuntime.create()

        result = runtime.handle_text("system status")

        self.assertTrue(result.success)
        self.assertIn("online", result.speech)


if __name__ == "__main__":
    unittest.main()
