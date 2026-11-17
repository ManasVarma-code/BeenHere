import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleCheck,
  Command,
  FileSearch,
  GitBranch,
  ShieldAlert,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export function Hero() {
  return (
    <section className="bh-hero" id="top" aria-labelledby="hero-title">
      <div className="bh-hero-copy">
        <a
          className="bh-release-pill"
          href={SITE_CONFIG.links.release}
          target="_blank"
          rel="noreferrer"
        >
          <span className="bh-release-dot" />
          BeenHere v1.1 is here — Research Beyond the Obvious
          <ArrowUpRight aria-hidden="true" />
        </a>
        <h1 id="hero-title">
          A better first commit
          <br />
          <em>starts with research.</em>
        </h1>
        <p className="bh-hero-lede">
          Discover work already out there, evaluate what fits, look for useful approaches in other
          industries, and decide what is still worth building.
        </p>
        <div className="bh-hero-actions">
          <a className="bh-cta-primary" href="#invitation">
            Install BeenHere <ArrowRight aria-hidden="true" />
          </a>
          <a className="bh-cta-secondary" href="#investigation">
            Explore a research run <ChevronRight aria-hidden="true" />
          </a>
        </div>
        <div className="bh-hero-meta" aria-label="Product details">
          <span>
            <Check aria-hidden="true" /> Open-source Agent Skill
          </span>
          <span>
            <Check aria-hidden="true" /> Python 3.8+
          </span>
          <span>
            <Check aria-hidden="true" /> MIT licensed
          </span>
        </div>
      </div>

      <aside className="bh-workbench" aria-label="Repository example research report">
        <div className="bh-workbench-bar">
          <div className="bh-workbench-brand">
            <span className="bh-mini-mark">B</span>
            <span>beenhere</span>
          </div>
          <span className="bh-workbench-path">/ examples / voice_social_platform</span>
          <span className="bh-workbench-status">
            <CircleCheck aria-hidden="true" /> REPORT
          </span>
        </div>
        <div className="bh-run-query">
          <div className="bh-query-icon">
            <Command aria-hidden="true" />
          </div>
          <div>
            <span>RESEARCH IDEA</span>
            <p>Voice-first social platform</p>
          </div>
          <span className="bh-query-time">NOV ’26</span>
        </div>
        <div className="bh-run-stream" aria-label="Findings shown in repository example report">
          <div>
            <span className="bh-stream-check">
              <Check aria-hidden="true" />
            </span>
            <span>Voice transport</span>
            <span className="bh-stream-detail">Pipecat · BSD-2</span>
          </div>
          <div>
            <span className="bh-stream-check">
              <Check aria-hidden="true" />
            </span>
            <span>Persona memory</span>
            <span className="bh-stream-detail">Letta · Apache-2.0</span>
          </div>
          <div>
            <span className="bh-stream-alert">
              <ShieldAlert aria-hidden="true" />
            </span>
            <span>Cross-industry ideas</span>
            <span className="bh-stream-warning">Conceptual only</span>
          </div>
        </div>
        <div className="bh-run-conclusion">
          <div className="bh-conclusion-label">
            <span>BLUEPRINT POSTURE</span>
            <span className="bh-posture">INTEGRATE + EXTRACT</span>
          </div>
          <h2>
            Reuse the foundations.
            <br />
            <em>Build the missing layer.</em>
          </h2>
          <p>
            Repository report recommends combining verified components and developing the
            platform-specific conversation controller.
          </p>
        </div>
        <div className="bh-workbench-foot">
          <span>
            <FileSearch aria-hidden="true" /> Repository report
          </span>
          <span>
            <GitBranch aria-hidden="true" /> Evidence labels retained
          </span>
          <a
            href={SITE_CONFIG.links.exampleBlueprint}
            target="_blank"
            rel="noreferrer"
            aria-label="Read the integration blueprint"
          >
            Blueprint <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <p className="bh-example-caption">
          Example report snapshot · 12–13 Nov 2026 · BeenHere v0.2.0 ·{" "}
          <a href={SITE_CONFIG.links.exampleLandscape} target="_blank" rel="noreferrer">
            Open source report
          </a>
        </p>
      </aside>
    </section>
  );
}
