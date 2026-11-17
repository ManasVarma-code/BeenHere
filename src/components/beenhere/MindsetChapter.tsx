import { ArrowRight, ArrowUpRight, Blocks, Compass, GitCompareArrows } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

const capabilities = [
  {
    number: "01",
    title: "Discover beyond your industry",
    body: "Abstract the hard part of the problem, then test for useful mechanisms in adjacent fields.",
    example: "VOICE PLATFORM  /  TURN ARBITRATION",
    evidence: "Façade · avionics · conceptual leads",
    icon: Compass,
  },
  {
    number: "02",
    title: "Compare what already exists",
    body: "Compare repositories by source evidence, interfaces, dependencies, maintenance, fit, and license considerations.",
    example: "PIPECAT  /  LETTA  /  AI TOWN",
    evidence: "Verified source roles · qualified risks",
    icon: GitCompareArrows,
  },
  {
    number: "03",
    title: "Build only what’s missing",
    body: "Turn the evidence into an integration posture, adapter boundaries, and checks for the unresolved parts.",
    example: "REUSE TRANSPORT + MEMORY",
    evidence: "Proposed controller · verify in target stack",
    icon: Blocks,
  },
];

export function MindsetChapter() {
  return (
    <section className="bh-method" id="mindset" aria-labelledby="mindset-title">
      <div className="bh-section-heading">
        <div>
          <span className="bh-section-kicker">THE v1.1 RESEARCH WORKFLOW</span>
          <h2 id="mindset-title">
            Look sideways.
            <br />
            Compare closely. Build deliberately.
          </h2>
        </div>
        <p>
          Three connected passes turn a broad idea into a decision you can trace back to evidence.
        </p>
      </div>
      <ol className="bh-research-sequence bh-capability-sequence">
        {capabilities.map(({ number, title, body, example, evidence, icon: Icon }, index) => (
          <li key={number} className="bh-research-stage bh-capability-stage">
            <div className="bh-stage-marker">
              <span>{number}</span>
              <Icon aria-hidden="true" />
              {index < capabilities.length - 1 && (
                <ArrowRight className="bh-stage-arrow" aria-hidden="true" />
              )}
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
            <div className="bh-capability-example">
              <span>{example}</span>
              <small>{evidence}</small>
            </div>
          </li>
        ))}
      </ol>
      <a
        className="bh-text-link"
        href={SITE_CONFIG.links.exampleLandscape}
        target="_blank"
        rel="noreferrer"
      >
        Read the repository example <ArrowUpRight aria-hidden="true" />
      </a>
    </section>
  );
}
