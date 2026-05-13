from __future__ import annotations

import unittest

from helios_core.intents import RuleBasedIntentParser


class IntentParserTests(unittest.TestCase):
    def test_launch_app_intent_extracts_app_name(self) -> None:
        match = RuleBasedIntentParser().parse("open terminal")

        self.assertEqual(match.intent.name, "desktop.launch_app")
        self.assertEqual(match.entities["app"], "terminal")

    def test_system_status_intent(self) -> None:
        match = RuleBasedIntentParser().parse("system status")

        self.assertEqual(match.intent.name, "system.status")
        self.assertGreater(match.confidence, 0.8)


if __name__ == "__main__":
    unittest.main()
