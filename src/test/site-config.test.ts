import { describe, expect, it } from "vitest";
import { SITE_CONFIG } from "@/config/site";

describe("SITE_CONFIG validation", () => {
  it("uses the official BeenHere GitHub repository without search parameters", () => {
    expect(SITE_CONFIG.links.github).toBe("https://github.com/manasvignesh/BeenHere");
    expect(SITE_CONFIG.links.githubWebsite).toBe("https://github.com/ManasVarma-code/field-notes");
    expect(SITE_CONFIG.links.github).not.toContain("search");
    expect(SITE_CONFIG.links.github).not.toContain("<github-owner>");
  });

  it("points to the published v1.1 release and source artifacts", () => {
    expect(SITE_CONFIG.version).toBe("v1.1.0");
    expect(SITE_CONFIG.links.release).toBe(
      "https://github.com/manasvignesh/BeenHere/releases/tag/v1.1.0",
    );
    expect(SITE_CONFIG.links.skill).toBe(
      "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/SKILL.md",
    );
    expect(SITE_CONFIG.links.exampleLandscape).toContain(
      "/examples/voice_social_platform/IDEA_LANDSCAPE.md",
    );
    expect(SITE_CONFIG.links.exampleBlueprint).toContain(
      "/examples/voice_social_platform/INTEGRATION_BLUEPRINT.md",
    );
  });

  it("configures the verified install commands with correct owner/repo", () => {
    expect(SITE_CONFIG.installCommands.universal).toBe("npx skills add manasvignesh/BeenHere");
    expect(SITE_CONFIG.installCommands.codex).toBe(
      "npx skills add manasvignesh/BeenHere --agent codex",
    );
    expect(SITE_CONFIG.installCommands.claudeCode).toBe(
      "npx skills add manasvignesh/BeenHere --agent claude-code",
    );
  });

  it("points to versioned documentation, test evidence, license, and security files", () => {
    expect(SITE_CONFIG.links.docs).toBe(
      "https://github.com/manasvignesh/BeenHere/tree/v1.1.0/docs",
    );
    expect(SITE_CONFIG.links.codexTestEvidence).toBe(
      "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/docs/CODEX_END_TO_END_TEST.md",
    );
    expect(SITE_CONFIG.links.license).toBe(
      "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/LICENSE",
    );
    expect(SITE_CONFIG.links.security).toBe(
      "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/SECURITY.md",
    );
    expect(SITE_CONFIG.links.changelog).toBe(
      "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/CHANGELOG.md",
    );
    expect(SITE_CONFIG.links.contributing).toBe(
      "https://github.com/manasvignesh/BeenHere/blob/v1.1.0/CONTRIBUTING.md",
    );
  });

  it("preserves accurate verification claims", () => {
    expect(SITE_CONFIG.status.codex.state).toBe("verified");
    expect(SITE_CONFIG.status.claudeCode.state).toBe("prepared");
    expect(SITE_CONFIG.status.claudeCode.details).toMatch(/does not claim a live runtime audit/i);
  });
});
