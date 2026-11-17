import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  FileCode2,
  FileText,
  Info,
  ShieldAlert,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ResearchStep {
  id: string;
  category: string;
  title: string;
  summary: string;
  evidenceLabel: string;
  evidence: string[];
  note: string;
  source: string;
}

const steps: ResearchStep[] = [
  {
    id: "idea",
    category: "THE IDEA",
    title: "Voice-first social platform",
    summary:
      "The repository example investigates a social product where people debate ideas with several AI personas in real time.",
    evidenceLabel: "REPORT INPUT · IDEA LANDSCAPE",
    evidence: ["Full-duplex voice", "Persona memory", "Multi-agent conversation"],
    note: "The idea and problem framing are from the included report. They are not presented as a v1.1 execution log.",
    source: SITE_CONFIG.links.exampleLandscape,
  },
  {
    id: "solutions",
    category: "EXISTING SOLUTIONS",
    title: "Find components with distinct jobs",
    summary:
      "The report identifies separate foundations instead of treating one repository as a complete product.",
    evidenceLabel: "REPORT CANDIDATES · SOURCE LABELS IN BLUEPRINT",
    evidence: [
      "pipecat-ai/pipecat — voice pipeline · BSD-2-Clause",
      "letta-ai/letta — stateful memory · Apache-2.0",
      "a16z-infra/ai-town — social conversation engine · MIT",
    ],
    note: "These candidates and license labels appear in the repository example. Recheck upstream versions and terms before adoption.",
    source: SITE_CONFIG.links.exampleBlueprint,
  },
  {
    id: "cross-industry",
    category: "CROSS-INDUSTRY FINDINGS",
    title: "Look for mechanisms, not metaphors",
    summary:
      "For conversation turn arbitration, the report explores ideas outside social software and distinguishes inspiration from reusable code.",
    evidenceLabel: "CONCEPTUAL INSPIRATION · NO CODE TRANSFER CLAIMED",
    evidence: [
      "Façade — beat-based drama management",
      "Avionics — priority arbitration",
      "Computer architecture — speculative pre-computation",
    ],
    note: "The report describes these as conceptual inspiration; it does not claim executable components were transferred from those fields.",
    source: SITE_CONFIG.links.exampleLandscape,
  },
  {
    id: "comparison",
    category: "REPOSITORY COMPARISON",
    title: "Check fit, interfaces, and boundaries",
    summary:
      "The blueprint compares the candidates by role and verified interface evidence, then records where adopting a whole project creates coupling.",
    evidenceLabel: "BLUEPRINT · [VERIFIED-SOURCE]",
    evidence: [
      "Pipecat — pipeline interfaces in src/pipecat/pipeline/pipeline.py",
      "Letta — client API and local app server",
      "AI Town — conversation state; Convex coupling is a qualification",
    ],
    note: "“Verified source” describes the report’s source inspection. It is not a guarantee of compatibility with your application.",
    source: SITE_CONFIG.links.exampleBlueprint,
  },
  {
    id: "recommendation",
    category: "ENGINEERING RECOMMENDATION",
    title: "Integrate foundations. Build the missing layer.",
    summary:
      "The included blueprint recommends adopting a voice pipeline, integrating memory through an API, extracting a conversation-state pattern, and building the platform-specific controller.",
    evidenceLabel: "ADVISORY BLUEPRINT · VALIDATE IN YOUR STACK",
    evidence: [
      "Adopt the Pipecat pipeline role",
      "Integrate Letta through its API",
      "Extract AI Town’s state pattern; build the floor controller",
    ],
    note: "This is the example report’s proposed direction. Its integration contracts and verification steps still need project-specific review.",
    source: SITE_CONFIG.links.exampleBlueprint,
  },
];

export function InvestigationChapter() {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep]!;

  return (
    <section className="bh-case-study" id="investigation" aria-labelledby="investigation-title">
      <div className="flex items-center justify-between pb-8 border-b border-border text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="text-primary font-bold">02</span>
          <span className="text-foreground">A repository example</span>
        </span>
        <span className="font-semibold text-foreground">VOICE-FIRST SOCIAL PLATFORM</span>
      </div>

      <div className="py-12 max-w-3xl space-y-4">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
          IDEA LANDSCAPE → INTEGRATION BLUEPRINT
        </span>
        <h2
          id="investigation-title"
          className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-foreground font-normal leading-tight"
        >
          From question
          <br />
          to engineering direction.
        </h2>
        <p className="font-sans text-base text-foreground/80 leading-relaxed">
          Follow the included voice-first platform report from its initial idea through
          cross-industry leads, repository comparison, and a proposed integration plan.
        </p>
        <p className="bh-report-disclosure">
          Source note: this example report is dated 12–13 Nov 2026 and identifies itself as a
          BeenHere v0.2.0 report. The page summarizes that repository artifact; it is not a v1.1
          run.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
        <div className="lg:col-span-4 space-y-3">
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest pb-2 border-b border-border">
            IDEA → SOLUTIONS → COMPARISON → DECISION
          </div>
          <div
            className="space-y-1.5"
            role="tablist"
            aria-label="Repository example research steps"
          >
            {steps.map((step, index) => (
              <button
                key={step.id}
                id={`research-step-${step.id}`}
                type="button"
                role="tab"
                aria-selected={activeStep === index}
                aria-controls="research-step-panel"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-3.5 rounded-xs border transition-colors cursor-pointer font-mono text-xs flex items-center justify-between ${
                  activeStep === index
                    ? "border-primary bg-card shadow-xs text-foreground font-bold"
                    : "border-transparent hover:border-border/60 hover:bg-muted/40 text-muted-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={activeStep === index ? "text-primary" : "text-muted-foreground"}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step.category}</span>
                </span>
                {activeStep === index && (
                  <ChevronRight className="size-3.5 text-primary" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
          <div className="pt-5 border-t border-border flex flex-col gap-2 text-xs font-mono">
            <a
              className="inline-flex items-center gap-1 text-primary hover:underline"
              href={SITE_CONFIG.links.exampleLandscape}
              target="_blank"
              rel="noreferrer"
            >
              Open the idea landscape <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
            <a
              className="inline-flex items-center gap-1 text-primary hover:underline"
              href={SITE_CONFIG.links.exampleBlueprint}
              target="_blank"
              rel="noreferrer"
            >
              Open the integration blueprint <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div
          id="research-step-panel"
          role="tabpanel"
          aria-labelledby={`research-step-${active.id}`}
          className="lg:col-span-8 border border-border bg-card p-6 md:p-8 rounded-xs space-y-6 min-w-0"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-border">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                STEP {String(activeStep + 1).padStart(2, "0")} // {active.category}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-foreground">
                {active.title}
              </h3>
            </div>
            <a
              href={active.source}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] text-primary hover:underline"
            >
              <FileText className="size-3" aria-hidden="true" /> Source file{" "}
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </div>

          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
            {active.summary}
          </p>
          <div className="rounded-xs border border-border bg-background/70 p-4">
            <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
              {active.evidenceLabel}
            </span>
            <ul className="mt-3 space-y-2">
              {active.evidence.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs sm:text-sm text-foreground/85"
                >
                  <CheckCircle2
                    className="size-3.5 text-primary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            {activeStep === 2 ? (
              <Info className="size-3.5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            ) : activeStep === 3 ? (
              <FileCode2 className="size-3.5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            ) : (
              <ShieldAlert className="size-3.5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            )}
            <span>{active.note}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
