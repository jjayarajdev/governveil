import { Link } from "react-router-dom";
import { FONT, PageHeader } from "../components/shared";

const tiers = [
  {
    name: "Core",
    price: "~$96",
    per: "/ governed-AI-user / year",
    floor: "500-seat floor",
    description: "Content detection and audit evidence. Enforce policies, produce a verifiable audit trail.",
    features: [
      "Content detection ladder (fast path + local ML)",
      "Graduated verdicts: allow / review / redact / block",
      "Tamper-evident, hash-chained audit log",
      "Datadog export",
      "SOC 2, HIPAA, PCI DSS control mapping",
      "OpenAI-compatible drop-in",
      "Docker / Kubernetes self-hosted",
    ],
    notIncluded: ["Reversible masking", "Access-plane scope-gating", "Air-gapped reference architecture", "Vendor/agent governance"],
    cta: "Book a pilot",
    highlighted: false,
  },
  {
    name: "Governed",
    price: "Custom",
    per: "",
    floor: "Includes Core +",
    description: "Reversible masking and access-plane scope-gating. Work continues; data never leaves.",
    gate: "Gate: reversible masking + access-plane scope-gating",
    features: [
      "Everything in Core",
      "Reversible masking — full round trip on API calls",
      "Browser/shadow-AI outbound masking (ChatGPT + claude.ai)",
      "API access scope-gating (Access plane — /gw/<app>)",
      "Multi-turn drip detection",
      "Document-upload hostile-content sweep",
      "DPDP / APRA control mapping",
    ],
    notIncluded: ["Air-gapped reference architecture", "Vendor/agent governance"],
    cta: "Book a pilot",
    highlighted: true,
  },
  {
    name: "Sovereign",
    price: "Custom",
    per: "",
    floor: "Includes Governed +",
    description: "Air-gapped reference architecture and vendor/agent governance. For true sovereignty-constrained environments.",
    gate: "Gate: air-gapped reference architecture + vendor/agent governance",
    features: [
      "Everything in Governed",
      "Air-gapped reference architecture (no internet egress required)",
      "Vendor & agent credential governance",
      "Dormant-credential wake alerts",
      "Self-improving detection (fine-tune on your reviewer labels)",
      "Dedicated deployment support",
    ],
    notIncluded: [],
    cta: "Book a pilot",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Flat, self-hosted, predictable."
        subtitle="Priced per governed-AI-user — not per token you run on your own hardware, and not a $100k+ floor."
      />
      <section style={FONT} className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Anchor */}
          <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[8px] p-5 mb-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div>
              <div className="text-2xl font-semibold text-[#1677ff] font-mono mb-1">~$96 <span className="text-base font-normal text-[#595959]">/ governed-AI-user / year</span></div>
              <p className="text-sm text-[#595959] max-w-lg">500-seat floor. A 1,500-person org with 500 AI users is finally in-category. Land small, expand on seats. <span className="text-[#8c8c8c]">(Confirm final numbers before signing.)</span></p>
            </div>
            <div className="text-sm text-[#595959] max-w-sm">
              <div className="font-medium text-[#141414] mb-1">What you also pay:</div>
              Your own infra. Reference pilot ≈ low-hundreds/month. Production ≈ low-thousands/month on AWS. No per-token surprise on renewal.
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 mb-12">
            {tiers.map(t => (
              <div key={t.name} className={`border rounded-[8px] overflow-hidden flex flex-col ${t.highlighted ? "border-[#1677ff] shadow-lg shadow-[#1677ff]/10" : "border-[#f0f0f0]"}`}>
                {t.highlighted && (
                  <div className="bg-[#1677ff] text-white text-xs font-medium text-center py-1.5">Most common starting point</div>
                )}
                <div className="p-6 flex-1">
                  <div className="font-semibold text-[#141414] text-lg mb-1">{t.name}</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-semibold text-[#1677ff] font-mono">{t.price}</span>
                    <span className="text-xs text-[#8c8c8c]">{t.per}</span>
                  </div>
                  <div className="text-xs text-[#8c8c8c] mb-3">{t.floor}</div>
                  {t.gate && (
                    <div className="text-xs text-[#595959] bg-[#f5f5f5] border border-[#f0f0f0] rounded px-2 py-1 mb-3">{t.gate}</div>
                  )}
                  <p className="text-sm text-[#595959] mb-5 leading-relaxed">{t.description}</p>
                  <div className="space-y-2 mb-6">
                    {t.features.map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm text-[#595959]">
                        <svg className="w-3.5 h-3.5 text-[#52c41a] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        {f}
                      </div>
                    ))}
                    {t.notIncluded.map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm text-[#bfbfbf]">
                        <svg className="w-3.5 h-3.5 text-[#d9d9d9] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link to="/pilot" className={`w-full inline-flex items-center justify-center py-2.5 rounded-[6px] font-medium text-sm transition-colors ${t.highlighted ? "bg-[#1677ff] text-white hover:bg-[#0958d9]" : "border border-[#d9d9d9] text-[#595959] hover:border-[#1677ff] hover:text-[#1677ff]"}`}>
                    {t.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Design-partner programme */}
          <div className="border border-[#303030] bg-[#141414] rounded-[8px] p-8 text-center">
            <div className="text-xs font-medium text-[#595959] uppercase tracking-widest mb-3">Design-partner programme</div>
            <h3 className="text-2xl font-semibold text-white mb-3">Paid 8–12-week pilots: $15k–$40k</h3>
            <p className="text-[#8c8c8c] text-sm max-w-lg mx-auto mb-6 leading-relaxed">
              Charge-for-pilot = an accountable outcome. You get early access, influence the roadmap, and retain all findings. Clear conversion path to a full licence at the end.
            </p>
            <Link to="/pilot" className="inline-flex items-center gap-2 bg-[#1677ff] text-white px-6 py-2.5 rounded-[6px] font-medium text-sm hover:bg-[#0958d9] transition-colors">
              Request a pilot
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
