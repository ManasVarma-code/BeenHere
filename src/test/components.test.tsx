import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Hero } from "@/components/beenhere/Hero";
import { InvestigationChapter } from "@/components/beenhere/InvestigationChapter";
import { MindsetChapter } from "@/components/beenhere/MindsetChapter";
import { InvitationChapter } from "@/components/beenhere/InvitationChapter";
import { SiteFooter } from "@/components/beenhere/SiteFooter";

describe("BeenHere landing page chapters", () => {
  it("renders Chapter 01 (Hero) with editorial headline and actions", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /A better first commit\s*starts with research/i,
    );
    expect(screen.getByText(/Discover work already out there/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /BeenHere v1.1 is here/i })).toHaveAttribute(
      "href",
      "https://github.com/manasvignesh/BeenHere/releases/tag/v1.1.0",
    );

    const getBtn = screen.getByRole("link", { name: /Install BeenHere/i });
    expect(getBtn).toHaveAttribute("href", "#invitation");

    const exploreBtn = screen.getByRole("link", { name: /Explore a research run/i });
    expect(exploreBtn).toHaveAttribute("href", "#investigation");
  });

  it("renders the repository-backed voice platform investigation with clear evidence limits", () => {
    render(<InvestigationChapter />);

    expect(screen.getByText(/A repository example/i)).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /the idea/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/This example report is dated/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: /cross-industry findings/i }));
    expect(
      screen.getByText(/CONCEPTUAL INSPIRATION · NO CODE TRANSFER CLAIMED/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Façade — beat-based drama management/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: /engineering recommendation/i }));
    expect(
      screen.getByText(/Integrate foundations. Build the missing layer./i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/months|benchmark|AI recruitment platform/i)).not.toBeInTheDocument();
  });

  it("renders the three connected v1.1 research capabilities", () => {
    render(<MindsetChapter />);

    expect(
      screen.getByRole("heading", { name: /Look sideways. Compare closely. Build deliberately./i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Discover beyond your industry/i)).toBeInTheDocument();
    expect(screen.getByText(/Compare what already exists/i)).toBeInTheDocument();
    expect(screen.getByText(/Build only what’s missing/i)).toBeInTheDocument();
  });

  it("renders Chapter 04 (Invitation) with copyable terminal command", () => {
    render(<InvitationChapter />);

    expect(
      screen.getByRole("heading", { name: /Install once. Research on demand./i }),
    ).toBeInTheDocument();

    const cmd = screen.getByText("npx skills add manasvignesh/BeenHere");
    expect(cmd).toBeInTheDocument();

    const copyBtn = screen.getByRole("button", { name: /Copy install command/i });
    expect(copyBtn).toBeInTheDocument();
  });

  it("renders SiteFooter with verified GitHub and documentation links", () => {
    render(<SiteFooter />);

    const ghLink = screen.getByRole("link", { name: /GitHub/i });
    expect(ghLink).toHaveAttribute("href", "https://github.com/manasvignesh/BeenHere");
    expect(screen.getByRole("link", { name: /v1.1 Release/i })).toHaveAttribute(
      "href",
      "https://github.com/manasvignesh/BeenHere/releases/tag/v1.1.0",
    );
    expect(screen.getByRole("link", { name: /Example reports/i })).toHaveAttribute(
      "href",
      expect.stringContaining("IDEA_LANDSCAPE.md"),
    );
  });
});
