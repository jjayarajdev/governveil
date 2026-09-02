import { Link } from "react-router-dom";
import { FONT, PageHeader, PilotCTABand } from "../components/shared";

const rows = [
  { feature: "Inline redaction / graduated verdicts", gv: { yes: true, note: "allow / review / redact / mask / block" }, competitor: { yes: false, note: "allow / block / audit" } },
  { feature: "Reversible masking (restore inbound)", gv: { yes: true, note: "Full round trip on API path" }, competitor: { yes: false, note: "—" } },
  { feature: "LLM API-traffic enforcement (your apps' calls)", gv: { yes: true, note: "Reverse proxy, in your perimeter" }, competitor: { yes: false, note: "Or SDK sends prompts to a vendor cloud" } },
  { feature: "Enterprise-API scope-gating (Access plane)", gv: { yes: true, note: "No competitor profiled has this" }, competitor: { yes: false, note: "—" } },
  { feature: "Claude (claude.ai + Anthropic API)", gv: { yes: true, note: "Browser extension + API proxy" }, competitor: { yes: null, note: "Partial or absent" } },
  { feature: "Verdict in your perimeter (air-gap capable)", gv: { yes: true, note: "Local inference — no vendor cloud" }, competitor: { yes: false, note: "Vendor cloud required for ML verdict" } },
  { feature: "Reproducible published benchmark", gv: { yes: true, note: "AdvBench harness in the repo" }, competitor: { yes: false, note: "—" } },
  { feature: "Pricing model", gv: { yes: null, note: "Flat, per-AI-user, self-hosted" }, competitor: { yes: null, note: "E5 uplift + usage meters / per-user floors" } },
];

function Cell({ val }: { val: { yes: boolean | null; note: string } }) {
  return (
    <td className="px-4 py-3 text-sm">
      <div className="flex items-start gap-2">
        {val.yes === true && <svg className="w-4 h-4 text-[#52c41a] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
        {val.yes === false && <svg className="w-4 h-4 text-[#ff4d4f] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
        {val.yes === null && <span className="w-4 h-4 shrink-0 mt-0.5 text-center text-[#8c8c8c] text-xs">~</span>}
        <span className="text-[#595959]">{val.note}</span>
      </div>
    </td>
  );
}

export default function Compare() {
  return (
    <>
      <PageHeader
        eyebrow="Compare"
        title="GovernVeil vs endpoint/SSE DLP"
        subtitle="Additive, not either/or. Keep your browser/endpoint/M365 perimeter. GovernVeil takes the API path, Claude, non-Microsoft endpoints, and reversible redaction."
      />
      <section style={FONT} className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Framing callout */}
          <div className="border border-[#e6f4ff] bg-[#f0f7ff] rounded-[8px] p-5 mb-10">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-[#1677ff] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                <div className="font-semibold text-sm text-[#0958d9] mb-1">Concede what incumbents do well — win on the gap.</div>
                <p className="text-sm text-[#0958d9]/80 leading-relaxed">
                  Microsoft Purview and SASE vendors are excellent at the browser/M365/endpoint perimeter. GovernVeil wins on the API path (your applications calling model APIs directly), on reversible redaction, on data residency, and on published proof.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <div className="border border-[#f0f0f0] rounded-[8px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-[#f0f0f0]">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#8c8c8c] uppercase tracking-wide w-1/3">Capability</th>
                    <th className="text-left px-4 py-3 w-1/3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-[4px] bg-[#1677ff] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                        </span>
                        <span className="font-semibold text-[#141414]">GovernVeil</span>
                      </div>
                    </th>
                    <th className="text-left px-4 py-3 w-1/3">
                      <span className="font-semibold text-[#595959]">Endpoint/SSE DLP (Purview, SASE)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.feature} className={`border-b border-[#f0f0f0] ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]/50"}`}>
                      <td className="px-4 py-3 text-sm font-medium text-[#141414]">{r.feature}</td>
                      <Cell val={r.gv} />
                      <Cell val={r.competitor} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Where they win */}
          <div className="mt-8 border border-[#f0f0f0] rounded-[8px] p-5 bg-[#fafafa]">
            <div className="font-semibold text-sm text-[#141414] mb-2">Where endpoint/SSE DLP vendors win (conceded)</div>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-[#595959]">
              {["Browser and endpoint perimeter — they own this layer", "M365 / SharePoint / Teams integration", "Identity-aware proxy and ZTNA", "Managed detection across thousands of SaaS apps"].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#52c41a] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-sm text-[#595959] text-center">
            Want specific numbers? <Link to="/benchmark" className="text-[#1677ff] hover:underline">Read the benchmark →</Link>
          </div>
        </div>
      </section>
      <PilotCTABand />
    </>
  );
}
