from __future__ import annotations

import unittest

from helios_core.permissions import Permission, PermissionPolicy
from helios_core.skills import SkillManifest, SkillRegistry, SkillRequest, SkillResult
from helios_core.intents import Intent, IntentMatch


class PermissionPolicyTests(unittest.TestCase):
    def test_registry_rejects_denied_permissions(self) -> None:
        registry = SkillRegistry(PermissionPolicy.local_default())
        manifest = SkillManifest(
            name="unsafe-shell",
            version="0.1.0",
            intents=("shell.run",),
            permissions=frozenset({Permission.SHELL}),
        )

        with self.assertRaises(PermissionError):
            registry.register(manifest, lambda _: SkillResult("nope"))

    def test_registry_dispatches_allowed_skill(self) -> None:
        registry = SkillRegistry(PermissionPolicy.local_default())
        manifest = SkillManifest(name="help", version="0.1.0", intents=("assistant.help",))
        registry.register(manifest, lambda _: SkillResult("hello"))

        result = registry.dispatch(
            SkillRequest(
                match=IntentMatch(Intent("assistant.help"), confidence=1.0),
                agent_id="test-agent",
            )
        )

        self.assertTrue(result.success)
        self.assertEqual(result.speech, "hello")


if __name__ == "__main__":
    unittest.main()
