import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  FileText,
  Scale,
  ShieldAlert,
  Terminal,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SiteHeader } from "@/components/beenhere/SiteHeader";
import { SiteFooter } from "@/components/beenhere/SiteFooter";
import { copyTextToClipboard } from "@/lib/clipboard";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: `Documentation — ${SITE_CONFIG.name}` },
      {
        name: "description",
        content:
          "BeenHere v1.1 documentation: installation, cross-industry research, repository comparison, integration blueprints, and evidence labels.",
      },
      { property: "og:title", content: `Documentation — ${SITE_CONFIG.name}` },
      {
        property: "og:description",
        content:
          "BeenHere v1.1: installation, source-evidence labels, repository comparison, and integration blueprint guidance.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/og-image.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Documentation — ${SITE_CONFIG.name}` },
      {
        name: "twitter:description",
        content:
          "BeenHere v1.1: installation, source-evidence labels, repository comparison, and integration blueprint guidance.",
      },
    ],
  }),
  component: DocsPage,
});

type DocSectionId =
  | "getting-started"
  | "codex-install"
  | "claude-install"
  | "research-modes"
  | "reading-outputs"
  | "why-not-github"
  | "case-offline-notes"
  | "licensing-limits"
  | "network-troubleshooting"
  | "contributing";

interface DocNavEntry {
  id: DocSectionId;
  label: string;
  category: "Setup" | "Methodology" | "Archives & Reference";
}

const DOC_NAV: DocNavEntry[] = [
  { id: "getting-started", label: "Getting Started", category: "Setup" },
  { id: "codex-install", label: "Codex Installation", category: "Setup" },
  { id: "claude-install", label: "Claude Code Integration", category: "Setup" },
  { id: "research-modes", label: "Quick vs. Deep Modes", category: "Methodology" },
  { id: "reading-outputs", label: "Understanding Dossiers", category: "Methodology" },
  { id: "why-not-github", label: "Why Not Just Search GitHub?", category: "Methodology" },
  {
    id: "case-offline-notes",
    label: "Case File: Voice Platform",
    category: "Archives & Reference",
  },
  { id: "licensing-limits", label: "Licensing Limitations", category: "Archives & Reference" },
  { id: "network-troubleshooting", label: "Network & Sandbox", category: "Archives & Reference" },
  { id: "contributing", label: "Contributing & Testing", category: "Archives & Reference" },
];

function DocsPage() {
  const [activeSection, setActiveSection] = useState<DocSectionId>("getting-started");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  async function handleCopy(text: string) {
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  }

  return (
    <div className="bh-page min-h-screen flex flex-col">
      <SiteHeader />

      <main id="main-content" className="flex-1 py-8">
        {/* Breadcrumbs & Header */}
        <div className="pb-6 border-b border-border">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground"
          >
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="size-3" /> Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Documentation</span>
            <span>/</span>
            <span className="text-primary">
              {DOC_NAV.find((n) => n.id === activeSection)?.label}
            </span>
          </nav>

          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                FIELD GUIDE TECHNICAL MANUAL · {SITE_CONFIG.version}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground mt-2 break-words">
                BeenHere Documentation
              </h1>
            </div>
            <a
              href={SITE_CONFIG.links.docs}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline"
            >
              v1.1 Docs on GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Documentation Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Sidebar Nav */}
          <aside
            className="lg:col-span-3 lg:border-r lg:border-border lg:pr-6"
            aria-label="Documentation navigation"
          >
            <div className="bh-doc-nav-mobile">
              <label
                htmlFor="docs-section-select"
                className="font-mono text-[10px] uppercase text-muted-foreground"
              >
                Jump to section
              </label>
              <select
                id="docs-section-select"
                value={activeSection}
                onChange={(event) => setActiveSection(event.target.value as DocSectionId)}
                className="w-full h-11 px-3 border border-border bg-card text-foreground font-mono text-xs rounded-xs"
              >
                {DOC_NAV.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.category} / {entry.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="bh-doc-nav-desktop sticky top-24 space-y-6">
              {["Setup", "Methodology", "Archives & Reference"].map((category) => (
                <div key={category} className="space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground tracking-wider block px-2 mb-1">
                    {category}
                  </span>
                  {DOC_NAV.filter((entry) => entry.category === category).map((entry) => {
                    const isActive = activeSection === entry.id;
                    return (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => setActiveSection(entry.id)}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                          isActive
                            ? "bg-primary text-primary-foreground font-bold shadow-xs"
                            : "text-foreground/80 hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span className="truncate">{entry.label}</span>
                        {isActive && (
                          <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}

              <div className="pt-4 border-t border-border font-mono text-[10px] text-muted-foreground space-y-1">
                <div>REPO: manasvignesh/BeenHere</div>
                <div>LICENSE: MIT</div>
                <div>RELEASE: {SITE_CONFIG.version}</div>
              </div>
            </div>
          </aside>

          {/* Main Article Body */}
          <article className="lg:col-span-9 max-w-3xl space-y-8 animate-in fade-in duration-150">
            {activeSection === "getting-started" && (
              <section className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-primary uppercase font-bold">
                    SECTION 01
                  </span>
                  <h2 className="font-editorial text-3xl text-foreground mt-1">Getting Started</h2>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed font-sans">
                    BeenHere is an open-source Agent Skill for researching existing products,
                    repositories, papers, and approaches from adjacent industries. Version 1.1 adds
                    cross-industry transfer analysis, side-by-side repository comparison, and
                    practical integration blueprints.
                  </p>
                </div>

                <div className="border border-border bg-card p-4 rounded-xs space-y-3">
                  <h3 className="font-mono text-xs font-bold text-foreground uppercase">
                    Core Operational Philosophy
                  </h3>
                  <ul className="space-y-2 text-xs text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">1.</span>
                      <span>
                        <strong>Investigate before committing:</strong> Understand the problem
                        domain and existing prior art before drafting architecture.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">2.</span>
                      <span>
                        <strong>Evidence before conclusions:</strong> Marks source-backed findings,
                        inferences, and unverified claims separately.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">3.</span>
                      <span>
                        <strong>No BeenHere-hosted backend:</strong> BeenHere is a skill, not a
                        hosted AI product. Available tools and network access depend on the agent.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-editorial text-xl text-foreground">Quickstart</h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Install the public Agent Skill with:
                  </p>
                  <div className="bh-doc-command bg-card p-3 border border-border rounded-xs flex items-center justify-between font-mono text-xs">
                    <code>{SITE_CONFIG.installCommands.universal}</code>
                    <button
                      type="button"
                      onClick={() => handleCopy(SITE_CONFIG.installCommands.universal)}
                      className="p-1 hover:text-primary transition-colors"
                      aria-label="Copy universal install command"
                    >
                      {copiedCode === SITE_CONFIG.installCommands.universal ? (
                        <Check className="size-4 text-green-600" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
                <nav
                  className="flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-4 text-xs font-mono"
                  aria-label="Version 1.1 resources"
                >
                  <a
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                    href={SITE_CONFIG.links.release}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Release notes <ArrowUpRight className="size-3" aria-hidden="true" />
                  </a>
                  <a
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                    href={SITE_CONFIG.links.skill}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Skill specification <ArrowUpRight className="size-3" aria-hidden="true" />
                  </a>
                  <a
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                    href={SITE_CONFIG.links.exampleLandscape}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Example reports <ArrowUpRight className="size-3" aria-hidden="true" />
                  </a>
                </nav>
              </section>
            )}

            {activeSection === "codex-install" && (
              <section className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-primary uppercase font-bold">
                    SECTION 02
                  </span>
                  <h2 className="font-editorial text-3xl text-foreground mt-1">
                    OpenAI Codex Installation
                  </h2>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed font-sans">
                    The public repository includes an end-to-end Codex execution audit. It records
                    the environment used and a restricted subprocess/network case; available
                    behavior can still vary across agent sandboxes.
                  </p>
                </div>

                <div className="p-4 border border-primary/40 bg-primary/5 rounded-xs space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold">
                    <Check className="size-4" /> VERIFIED MILESTONE
                  </div>
                  <p className="text-xs text-foreground/90">
                    A repository end-to-end report records installation and execution in OpenAI
                    Codex, including a restricted subprocess/network case. Review the report in{" "}
                    <a
                      href={SITE_CONFIG.links.codexTestEvidence}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline font-mono"
                    >
                      docs/CODEX_END_TO_END_TEST.md
                    </a>
                    .
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase text-foreground">
                    1. Install Command
                  </h3>
                  <div className="bg-card p-3 border border-border rounded-xs flex items-center justify-between font-mono text-xs">
                    <code>{SITE_CONFIG.installCommands.codex}</code>
                    <button
                      type="button"
                      onClick={() => handleCopy(SITE_CONFIG.installCommands.codex)}
                      className="p-1 hover:text-primary transition-colors"
                      aria-label="Copy Codex install command"
                    >
                      {copiedCode === SITE_CONFIG.installCommands.codex ? (
                        <Check className="size-4 text-green-600" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase text-foreground">
                    2. Invocation in Codex
                  </h3>
                  <div className="bg-card p-3 border border-border rounded-xs flex items-center justify-between font-mono text-xs">
                    <code>{SITE_CONFIG.invocations.codex}</code>
                    <button
                      type="button"
                      onClick={() => handleCopy(SITE_CONFIG.invocations.codex)}
                      className="p-1 hover:text-primary transition-colors"
                      aria-label="Copy Codex invocation"
                    >
                      {copiedCode === SITE_CONFIG.invocations.codex ? (
                        <Check className="size-4 text-green-600" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "claude-install" && (
              <section className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-primary uppercase font-bold">
                    SECTION 03
                  </span>
                  <h2 className="font-editorial text-3xl text-foreground mt-1">
                    Claude Code Integration
                  </h2>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed font-sans">
                    BeenHere is structurally prepared for Claude Code. The repository structure,
                    manifest schemas, and instruction prompts adhere to the standard agent skill
                    specification.
                  </p>
                </div>

                <div className="p-4 border border-border bg-card rounded-xs space-y-2">
                  <div className="font-mono text-xs text-muted-foreground font-bold uppercase">
                    INTEGRATION STATUS
                  </div>
                  <p className="text-xs text-foreground/80">
                    The v1.1 documentation describes Agent Skills CLI registration. It does not
                    claim a live authenticated Claude Code runtime audit.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase text-foreground">
                    CLI Install
                  </h3>
                  <div className="bg-card p-3 border border-border rounded-xs flex items-center justify-between font-mono text-xs">
                    <code>{SITE_CONFIG.installCommands.claudeCode}</code>
                    <button
                      type="button"
                      onClick={() => handleCopy(SITE_CONFIG.installCommands.claudeCode)}
                      className="p-1 hover:text-primary transition-colors"
                      aria-label="Copy Claude Code install command"
                    >
                      {copiedCode === SITE_CONFIG.installCommands.claudeCode ? (
                        <Check className="size-4 text-green-600" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase text-foreground">
                    Invocation Syntax
                  </h3>
                  <div className="bg-card p-3 border border-border rounded-xs flex items-center justify-between font-mono text-xs">
                    <code>{SITE_CONFIG.invocations.claudeCode}</code>
                    <button
                      type="button"
                      onClick={() => handleCopy(SITE_CONFIG.invocations.claudeCode)}
                      className="p-1 hover:text-primary transition-colors"
                      aria-label="Copy Claude Code invocation"
                    >
                      {copiedCode === SITE_CONFIG.invocations.claudeCode ? (
                        <Check className="size-4 text-green-600" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "research-modes" && (
              <section className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-primary uppercase font-bold">
                    SECTION 04
                  </span>
                  <h2 className="font-editorial text-3xl text-foreground mt-1">
                    Quick vs. Deep Research Modes
                  </h2>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed font-sans">
                    Depending on your decision timeline, BeenHere supports two investigative depths:
                    a lightweight initial landscape check, and an exhaustive repository and
                    licensing audit.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-border bg-card p-4 rounded-xs space-y-2">
                    <span className="font-mono text-xs font-bold text-primary block">
                      QUICK EXPLORATION
                    </span>
                    <h3 className="font-editorial text-lg text-foreground">
                      Landscape &amp; Prior Art
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Starts a focused prior-art search across relevant products, repositories, and
                      adjacent approaches. Findings depend on the question and accessible sources.
                    </p>
                    <div className="mt-2 pt-2 border-t border-border font-mono text-[10px] text-foreground/80">
                      <code>$beenhere "Quick scan: WebRTC collaborative whiteboard"</code>
                    </div>
                  </div>

                  <div className="border border-border bg-card p-4 rounded-xs space-y-2">
                    <span className="font-mono text-xs font-bold text-primary block">
                      DEEP INVESTIGATION
                    </span>
                    <h3 className="font-editorial text-lg text-foreground">
                      Full Architectural Dossier
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Uses the full research protocol to compare candidate repositories, inspect
                      interfaces and dependencies, evaluate transferability, and draft an
                      integration blueprint with open verification questions.
                    </p>
                    <div className="mt-2 pt-2 border-t border-border font-mono text-[10px] text-foreground/80">
                      <code>$beenhere "Deep audit: Resume parsing pipeline with Docling"</code>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "reading-outputs" && (
              <section className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-primary uppercase font-bold">
                    SECTION 05
                  </span>
                  <h2 className="font-editorial text-3xl text-foreground mt-1">
                    Understanding Research Dossiers
                  </h2>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed font-sans">
                    Research output can include an idea landscape and an integration blueprint. The
                    exact sections depend on the task and available evidence.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 border border-border bg-card rounded-xs">
                    <span className="font-mono text-xs font-bold text-primary">
                      01 · PRECEDENTS
                    </span>
                    <p className="mt-1 text-xs text-foreground/80">
                      Lists commercial products and existing platforms. Explains what jobs they
                      already do well, and highlights where market switching costs or compliance
                      lock-in exist.
                    </p>
                  </div>

                  <div className="p-3.5 border border-border bg-card rounded-xs">
                    <span className="font-mono text-xs font-bold text-primary">
                      02 · REUSABLE REPOSITORIES
                    </span>
                    <p className="mt-1 text-xs text-foreground/80">
                      Compares candidate repositories by functional overlap, maintenance signals,
                      exported interfaces, dependencies, compatibility, and license considerations.
                    </p>
                  </div>

                  <div className="p-3.5 border border-border bg-card rounded-xs">
                    <span className="font-mono text-xs font-bold text-primary">
                      03 · ADJACENT DISCIPLINES
                    </span>
                    <p className="mt-1 text-xs text-foreground/80">
                      Extracts underlying mechanisms and evaluates cross-industry candidates. The
                      report distinguishes possible transfer from conceptual inspiration and flags
                      when no transfer is needed.
                    </p>
                  </div>

                  <div className="p-3.5 border border-border bg-card rounded-xs">
                    <span className="font-mono text-xs font-bold text-primary">
                      04 · BUILD POSTURE
                    </span>
                    <p className="mt-1 text-xs text-foreground/80">
                      Recommends a qualified posture such as adopt, integrate through an API,
                      extract a component, reimplement cleanly, reject an incompatible candidate, or
                      build custom.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "why-not-github" && (
              <section className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-primary uppercase font-bold">
                    SECTION 06
                  </span>
                  <h2 className="font-editorial text-3xl text-foreground mt-1">
                    Why Not Just Search GitHub?
                  </h2>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed font-sans">
                    Code search is essential for finding implementations once you know what you are
                    looking for. BeenHere operates one level higher: it helps you decide{" "}
                    <em>what is worth building</em>, evaluates architectural reusability, and warns
                    you about licensing hazards before code is written.
                  </p>
                </div>

                <div className="border border-border bg-card rounded-xs divide-y divide-border text-xs">
                  <div className="p-4 space-y-1">
                    <span className="font-mono text-primary font-bold">
                      01 · Multi-Source Discovery
                    </span>
                    <p className="text-foreground/90 font-medium">Beyond Public Repositories</p>
                    <p className="text-muted-foreground">
                      Standard search finds keyword matches in code files. BeenHere investigates
                      commercial product workflows, academic approaches, and adjacent domain
                      architectures.
                    </p>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="font-mono text-primary font-bold">
                      02 · License &amp; Dependency Review
                    </span>
                    <p className="text-foreground/90 font-medium">
                      Qualified Evidence &amp; Risk Notes
                    </p>
                    <p className="text-muted-foreground">
                      Repository comparisons examine declared/source license evidence and relevant
                      dependencies. Legal conclusions remain qualified and require upstream review.
                    </p>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="font-mono text-primary font-bold">
                      03 · Cross-Discipline Analogies
                    </span>
                    <p className="text-foreground/90 font-medium">
                      Sideways Architectural Borrowing
                    </p>
                    <p className="text-muted-foreground">
                      Tests candidate mechanisms against assumptions and operational constraints;
                      weak analogies can be rejected instead of presented as reusable solutions.
                    </p>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="font-mono text-primary font-bold">
                      04 · Grounded Decision Synthesis
                    </span>
                    <p className="text-foreground/90 font-medium">
                      Actionable Posture Recommendation
                    </p>
                    <p className="text-muted-foreground">
                      Findings can be turned into integration boundaries, proposed adapter
                      contracts, verification steps, and unresolved questions.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "case-offline-notes" && (
              <section className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-primary uppercase font-bold">
                    SECTION 07
                  </span>
                  <h2 className="font-editorial text-3xl text-foreground mt-1">
                    Case File: Voice-First Social Platform
                  </h2>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed font-sans">
                    An example from the public repository follows a voice-first social idea through
                    existing components, adjacent mechanisms, repository comparison, and a proposed
                    engineering direction.
                  </p>
                </div>

                <div className="border border-border bg-card p-5 rounded-xs space-y-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-primary uppercase font-bold">
                      IDEA → EXISTING SOLUTIONS
                    </span>
                    <p className="text-foreground font-semibold text-sm">
                      Voice-first group conversations with persistent AI personas and structured
                      idea evaluation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-border">
                    <div className="space-y-1">
                      <strong className="text-foreground font-mono uppercase text-[10px] block">
                        Cross-industry leads
                      </strong>
                      <p className="text-muted-foreground leading-relaxed">
                        Façade beat management, avionics priority arbitration, and speculative
                        pre-computation are described by the report as conceptual inspiration—not
                        code transfers.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <strong className="text-foreground font-mono uppercase text-[10px] block">
                        Repository comparison
                      </strong>
                      <p className="text-muted-foreground leading-relaxed">
                        The example blueprint marks Pipecat pipeline interfaces, Letta’s client API,
                        and AI Town conversation-state code as source evidence, while qualifying
                        integration boundaries.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border bg-background p-3 rounded-xs space-y-1">
                    <span className="font-mono text-[10px] text-primary uppercase font-bold">
                      PROPOSED ENGINEERING DIRECTION
                    </span>
                    <p className="text-foreground font-medium">
                      Integrate a voice pipeline and memory API, extract a suitable conversation
                      state pattern, and build the platform-specific turn controller. Validate the
                      interfaces and assumptions in the target stack.
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Provenance: the linked report is dated 12–13 Nov 2026 and identifies its
                    BeenHere version as v0.2.0. It is an authentic repository example, not a v1.1
                    execution record. Its source tags describe that report’s inspection; re-check
                    current upstream repositories before relying on the findings.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-1">
                    <a
                      href={SITE_CONFIG.links.exampleLandscape}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Open idea landscape <ArrowUpRight className="size-3" aria-hidden="true" />
                    </a>
                    <a
                      href={SITE_CONFIG.links.exampleBlueprint}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Open integration blueprint{" "}
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "licensing-limits" && (
              <section className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-primary uppercase font-bold">
                    SECTION 08
                  </span>
                  <h2 className="font-editorial text-3xl text-foreground mt-1">
                    Licensing Limitations &amp; Disclaimers
                  </h2>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed font-sans">
                    Software licensing is complex and varies depending on distribution model, cloud
                    hosting, and proprietary modifications.
                  </p>
                </div>

                <div className="p-4 border border-destructive/40 bg-destructive/5 rounded-xs space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-destructive font-bold">
                    <ShieldAlert className="size-4" /> IMPORTANT LEGAL NOTICE
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed">
                    BeenHere reports license evidence and potential obligations; they are not legal
                    advice. License effects depend on the actual license text, use, and
                    distribution. Review upstream terms and seek legal advice where needed.
                  </p>
                </div>

                <div className="border border-border bg-card p-4 rounded-xs space-y-2 text-xs text-foreground/80">
                  <strong className="font-semibold text-foreground">
                    Common Checkpoints Identified by BeenHere:
                  </strong>
                  <ul className="mt-2 space-y-1.5 font-mono text-[11px] text-muted-foreground">
                    <li>
                      • MIT, Apache 2.0, BSD: Often permissive, subject to each license’s notices
                      and conditions.
                    </li>
                    <li>
                      • Strong Copyleft (GPL, AGPL): May require open-sourcing host application
                      source code.
                    </li>
                    <li>
                      • Dual-License / Non-Compete (BSL, SSPL): May restrict cloud-hosted commercial
                      operation.
                    </li>
                  </ul>
                </div>
              </section>
            )}

            {activeSection === "network-troubleshooting" && (
              <section className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-primary uppercase font-bold">
                    SECTION 09
                  </span>
                  <h2 className="font-editorial text-3xl text-foreground mt-1">
                    Network &amp; Sandbox Troubleshooting
                  </h2>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed font-sans">
                    BeenHere uses Python tools and the host agent’s available tools. Some coding
                    agent sandboxes restrict subprocess execution or network access, so not every
                    environment can run every tool path.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-foreground/80">
                  <div className="p-3.5 border border-border bg-card rounded-xs space-y-1">
                    <strong className="text-foreground font-semibold">
                      Offline / Air-Gapped Environments:
                    </strong>
                    <p className="text-muted-foreground">
                      Without network access, live repository and academic searches are unavailable.
                      The agent may still review local files or pre-generated evidence when those
                      are accessible in its environment.
                    </p>
                  </div>

                  <div className="p-3.5 border border-border bg-card rounded-xs space-y-1">
                    <strong className="text-foreground font-semibold">
                      Corporate HTTP Proxies:
                    </strong>
                    <p className="text-muted-foreground">
                      Ensure your agent environment exports standard{" "}
                      <code className="font-mono bg-muted px-1">HTTP_PROXY</code> and{" "}
                      <code className="font-mono bg-muted px-1">HTTPS_PROXY</code> environment
                      variables so repository metadata fetches succeed.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "contributing" && (
              <section className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-primary uppercase font-bold">
                    SECTION 10
                  </span>
                  <h2 className="font-editorial text-3xl text-foreground mt-1">
                    Contributing to BeenHere
                  </h2>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed font-sans">
                    BeenHere is an open-source community effort licensed under the MIT License. We
                    welcome contributions of new agent integrations, research heuristics, and
                    documentation.
                  </p>
                </div>

                <div className="border border-border bg-card p-4 rounded-xs space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase text-foreground">
                    Running Tests Locally
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    The v1.1.0 repository provides its own Python test suite and cross-platform CI.
                    Follow the upstream contribution guide for the current test workflow:
                  </p>
                  <div className="bg-background p-2.5 border border-border rounded-xs font-mono text-xs text-foreground">
                    <code>python -m unittest discover tests/</code>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={SITE_CONFIG.links.contributing}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline"
                  >
                    Read CONTRIBUTING.md on GitHub{" "}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href={SITE_CONFIG.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
                  >
                    GitHub Issues &amp; Pull Requests{" "}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </section>
            )}
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
