export const SITE_CONFIG = {
  name: "BeenHere",
  tagline: "Explore every angle before you build.",
  description:
    "BeenHere is an open-source Agent Skill for researching existing products, reusable code, academic work, cross-industry approaches, and integration risks before building.",
  version: "v1.1.0",
  links: {
    github: "https://github.com/manasvignesh/BeenHere",
    githubWebsite: "https://github.com/ManasVarma-code/field-notes",
    release: "https://github.com/manasvignesh/BeenHere/releases/tag/v1.1.0",
    docs: "https://github.com/manasvignesh/BeenHere/tree/v1.1.0/docs",
    skill: "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/SKILL.md",
    installation: "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/docs/INSTALLATION.md",
    exampleLandscape:
      "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/examples/voice_social_platform/IDEA_LANDSCAPE.md",
    exampleBlueprint:
      "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/examples/voice_social_platform/INTEGRATION_BLUEPRINT.md",
    codexTestEvidence:
      "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/docs/CODEX_END_TO_END_TEST.md",
    license: "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/LICENSE",
    security: "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/SECURITY.md",
    changelog: "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/CHANGELOG.md",
    contributing: "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/CONTRIBUTING.md",
  },
  installCommands: {
    universal: "npx skills add manasvignesh/BeenHere",
    codex: "npx skills add manasvignesh/BeenHere --agent codex",
    claudeCode: "npx skills add manasvignesh/BeenHere --agent claude-code",
  },
  invocations: {
    codex: "$beenhere Research a voice-first social platform.",
    claudeCode: "/beenhere Research a voice-first social platform.",
  },
  status: {
    codex: {
      label: "Verified",
      state: "verified" as const,
      details: "The repository includes a Codex end-to-end execution report.",
    },
    claudeCode: {
      label: "CLI registration documented",
      state: "prepared" as const,
      details: "The release documentation does not claim a live runtime audit.",
    },
    license: {
      label: "MIT",
      state: "open" as const,
      details: "Free and open-source software.",
    },
    dependencies: {
      label: "Python standard library",
      state: "clean" as const,
      details: "Python 3.8+; no third-party Python packages required.",
    },
    backend: {
      label: "No BeenHere-hosted backend",
      state: "local" as const,
      details:
        "Runs as an Agent Skill; available network and subprocess behavior depends on the agent environment.",
    },
  },
} as const;
