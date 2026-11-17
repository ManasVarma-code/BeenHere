import { useState } from "react";
import { ArrowUpRight, Check, CheckCircle2, Clock, Copy, Terminal } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { copyTextToClipboard } from "@/lib/clipboard";

type AgentKey = "universal" | "codex" | "claudeCode";

export function InvitationChapter() {
  const [activeAgent, setActiveAgent] = useState<AgentKey>("universal");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const activeCommand = SITE_CONFIG.installCommands[activeAgent];

  async function handleCopy(cmd: string) {
    const ok = await copyTextToClipboard(cmd);
    if (ok) {
      setCopiedCmd(cmd);
      setTimeout(() => setCopiedCmd(null), 2200);
    }
  }

  return (
    <section className="bh-install" id="invitation" aria-labelledby="invitation-title">
      <div className="bh-chapter-line flex items-center justify-between pb-8 border-b border-border text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="text-primary font-bold">04</span>
          <span className="text-foreground">Installation</span>
        </span>
        <span>AGENT SKILL · {SITE_CONFIG.version}</span>
      </div>

      <div className="bh-install-layout grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-end">
        <div className="bh-install-copy lg:col-span-6 space-y-6">
          <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
            OPEN SOURCE · PYTHON 3.8+
          </span>
          <h2
            id="invitation-title"
            className="font-editorial text-4xl sm:text-6xl text-foreground font-normal leading-[1.02]"
          >
            Install once.
            <br />
            <em className="text-primary italic font-normal">Research on demand.</em>
          </h2>
          <p className="font-sans text-base text-foreground/80 leading-relaxed max-w-lg">
            BeenHere is an open-source Agent Skill, not a hosted AI application. Its Python tools
            use the runtime and network access available in your coding-agent environment; some
            sandboxes may require the documented host-agent fallback.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-primary" aria-hidden="true" />
              <span>Codex: execution report available</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-3.5 text-muted-foreground" aria-hidden="true" />
              <span>Claude Code: CLI registration documented</span>
            </div>
          </div>
        </div>

        <div className="bh-install-panel lg:col-span-6 border border-border bg-card p-6 rounded-xs space-y-4">
          <div className="bh-install-panel-header flex items-center justify-between border-b border-border pb-3 gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-foreground font-semibold shrink-0">
              <Terminal className="size-3.5 text-primary" aria-hidden="true" />
              <span>TERMINAL INSTALLATION</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              {(
                [
                  ["universal", "Auto"],
                  ["codex", "Codex"],
                  ["claudeCode", "Claude Code"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveAgent(key)}
                  className={`px-2 py-1 rounded-xs border transition-colors cursor-pointer ${
                    activeAgent === key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={activeAgent === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 bg-background p-3 border border-border/80 rounded-xs min-w-0">
            <div className="bh-install-command font-mono text-[10px] sm:text-xs text-foreground flex items-center gap-2 min-w-0">
              <span className="text-primary font-bold select-none">$</span>
              <code className="select-all">{activeCommand}</code>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(activeCommand)}
              className="shrink-0 p-2 text-muted-foreground hover:text-primary transition-colors border border-border bg-card rounded-xs"
              aria-label={copiedCmd === activeCommand ? "Command copied" : "Copy install command"}
              title={copiedCmd === activeCommand ? "Copied!" : "Copy command"}
            >
              {copiedCmd === activeCommand ? (
                <Check className="size-4 text-green-600" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="text-[11px] font-mono text-muted-foreground space-y-1">
            <span>Example request:</span>
            <div className="bg-background/60 p-2 border border-border/60 rounded-xs text-foreground/90 break-words">
              <code>{SITE_CONFIG.invocations.codex}</code>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              View repository <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
            <span>RELEASE {SITE_CONFIG.version} · MIT</span>
          </div>
          <nav className="bh-install-resources" aria-label="BeenHere release resources">
            <a href={SITE_CONFIG.links.release} target="_blank" rel="noreferrer">
              Release notes <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={SITE_CONFIG.links.skill} target="_blank" rel="noreferrer">
              Skill docs <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={SITE_CONFIG.links.exampleLandscape} target="_blank" rel="noreferrer">
              Example reports <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
