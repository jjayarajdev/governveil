import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const FONT = { fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif" };

export function VerdictTag({ verdict }: { verdict: "allow" | "review" | "mask" | "block" | "redact" }) {
  const map = {
    allow:  { bg: "#f6ffed", border: "#b7eb8f", text: "#389e0d", dot: "#52c41a", label: "allow" },
    review: { bg: "#f9f0ff", border: "#d3adf7", text: "#531dab", dot: "#722ed1", label: "review" },
    mask:   { bg: "#e6f4ff", border: "#91caff", text: "#0958d9", dot: "#1677ff", label: "mask" },
    redact: { bg: "#e6f4ff", border: "#91caff", text: "#0958d9", dot: "#1677ff", label: "redact" },
    block:  { bg: "#fff2f0", border: "#ffccc7", text: "#cf1322", dot: "#ff4d4f", label: "block" },
  }[verdict];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border" style={{ background: map.bg, borderColor: map.border, color: map.text }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: map.dot }} />
      {map.label}
    </span>
  );
}

const NAV_LINKS = [
  ["Product", "/product"],
  ["Features", "/features"],
  ["Security", "/security"],
  ["Benchmark", "/benchmark"],
  ["Pricing", "/pricing"],
  ["Compare", "/compare"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <header style={FONT} className="fixed top-0 inset-x-0 z-50 bg-white border-b border-[#f0f0f0]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-[6px] bg-[#1677ff] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </span>
            <span className="font-semibold text-[#141414] text-sm tracking-tight">GovernVeil</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(([label, href]) => (
              <Link key={label} to={href} className={`px-3 py-1.5 rounded-[6px] text-sm transition-colors ${loc.pathname === href ? "text-[#1677ff] bg-[#e6f4ff]" : "text-[#595959] hover:text-[#141414] hover:bg-[#fafafa]"}`}>{label}</Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="/docs" className="text-sm text-[#595959] hover:text-[#141414] transition-colors">Docs</a>
          <Link to="/pilot" className="text-sm bg-[#1677ff] text-white px-4 py-1.5 rounded-[6px] hover:bg-[#0958d9] transition-colors font-medium">
            Book a pilot
          </Link>
        </div>
        <button className="md:hidden text-[#595959]" onClick={() => setOpen(!open)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#f0f0f0] bg-white px-6 py-4 flex flex-col gap-1 text-sm">
          {NAV_LINKS.map(([l, href]) => (
            <Link key={l} to={href} onClick={() => setOpen(false)} className={`px-3 py-2 rounded-[6px] ${loc.pathname === href ? "text-[#1677ff] bg-[#e6f4ff]" : "text-[#595959]"}`}>{l}</Link>
          ))}
          <hr className="border-[#f0f0f0] my-1" />
          <Link to="/pilot" onClick={() => setOpen(false)} className="bg-[#1677ff] text-white px-4 py-2 rounded-[6px] text-center font-medium mt-1">Book a pilot</Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer style={FONT} className="bg-[#141414] border-t border-[#303030] px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white text-sm font-semibold mb-3">
              <span className="w-5 h-5 rounded-[6px] bg-[#1677ff] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </span>
              GovernVeil
            </Link>
            <p className="text-[#595959] text-xs leading-relaxed mb-2">AI data-egress control & evidence.</p>
            <p className="text-[#595959] text-xs mb-4">A Syntegreti platform. Hyderabad, India.</p>
            <p className="text-[#595959] text-xs italic">Self-hosted. Your data never leaves your perimeter.</p>
          </div>
          {[
            { heading: "Product", links: [["Product", "/product"], ["Features", "/features"], ["Security", "/security"], ["Benchmark", "/benchmark"]] },
            { heading: "Evaluate", links: [["Pricing", "/pricing"], ["Compare", "/compare"], ["Pilot", "/pilot"], ["Docs", "/docs"]] },
            { heading: "Legal", links: [["Privacy", "/privacy"], ["Terms", "/terms"]] },
          ].map((col) => (
            <div key={col.heading}>
              <div className="text-[#595959] font-medium text-xs uppercase tracking-widest mb-4">{col.heading}</div>
              <ul className="space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}><Link to={href} className="text-[#595959] hover:text-[#d9d9d9] transition-colors text-xs">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#303030] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#595959] text-xs">© 2026 Syntegreti. GovernVeil is open-core; see the repo for licence details.</span>
          <div className="flex gap-4 text-xs text-[#595959]">
            <a href="#" className="hover:text-[#d9d9d9] transition-colors">GitHub</a>
            <a href="#" className="hover:text-[#d9d9d9] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[#d9d9d9] transition-colors">Security advisories</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="pt-28 pb-14 px-6 bg-white border-b border-[#f0f0f0]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-medium text-[#8c8c8c] uppercase tracking-widest mb-3">{eyebrow}</p>
        <h1 className="text-4xl font-semibold text-[#141414] mb-4 leading-tight">{title}</h1>
        {subtitle && <p className="text-[#595959] text-base max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}

export function PilotCTABand() {
  return (
    <section style={FONT} className="py-16 px-6 bg-[#fafafa] border-t border-[#f0f0f0]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="font-semibold text-[#141414] text-lg mb-1">See it mask a real prompt in 90 seconds.</h3>
          <p className="text-[#595959] text-sm">A paid 8–12-week design-partner pilot. Week one: full round trip, real data, your environment.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link to="/pilot" className="inline-flex items-center gap-2 bg-[#1677ff] text-white px-5 py-2.5 rounded-[6px] font-medium text-sm hover:bg-[#0958d9] transition-colors">
            Book a design-partner pilot
          </Link>
          <Link to="/benchmark" className="inline-flex items-center gap-2 border border-[#d9d9d9] text-[#595959] px-5 py-2.5 rounded-[6px] font-medium text-sm hover:border-[#1677ff] hover:text-[#1677ff] transition-colors">
            Read the benchmark
          </Link>
        </div>
      </div>
    </section>
  );
}
