import { FONT, PageHeader, PilotCTABand } from "../components/shared";

const controls = [
  { framework: "SOC 2", items: ["CC6 — logical and physical access controls", "CC7 — system operations", "C1 — confidential information"] },
  { framework: "HIPAA", items: ["§164.312(b) — audit controls", "§164.308(a)(1)(ii)(D) — information-system activity review"] },
  { framework: "PCI DSS", items: ["12.5.1 — incident response", "12.8 — third-party service providers", "3.x — protection of cardholder data"] },
  { framework: "DPDP (India)", items: ["Rule 6 — purpose limitation", "Rule 13 — data retention", "Rule 15 — grievance redressal evidence"] },
  { framework: "APRA (Australia)", items: ["CPS 234 — continuous-monitoring evidence", "CPS 230 — third-party tech risk evidence"] },
];

export default function Security() {
  return (
    <>
      <PageHeader
        eyebrow="Security & Compliance"
        title="Governance you can prove, without your data leaving."
        subtitle="GovernVeil satisfies access, egress-control, and activity-review evidence requirements. It supports but does not satisfy fairness, provenance, and explainability. We say so plainly."
      />

      <section style={FONT} className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-xl font-semibold text-[#141414] mb-6">Data protection</h2>
            <div className="space-y-4 mb-10">
              {[
                { title: "Self-hosted, air-gap capable", body: "All ML inference runs locally — prompt content never leaves your environment. No vendor cloud in the verdict path." },
                { title: "Encryption in transit and at rest", body: "TLS 1.2+ in transit. AES-256 at rest. Reversible-masking vault stores ciphertext + HMAC only — no plaintext at rest." },
                { title: "Data residency by construction", body: "There is no GovernVeil cloud to send prompts to. Residency is a deployment property, not a policy promise." },
              ].map(item => (
                <div key={item.title} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#f6ffed] border border-[#b7eb8f] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#52c41a]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#141414] mb-0.5">{item.title}</div>
                    <p className="text-[#595959] text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-[#141414] mb-6">Access & identity</h2>
            <div className="border border-[#f0f0f0] rounded-[8px] p-5 space-y-3">
              {["OIDC/SAML SSO", "RBAC with configurable roles", "Service tokens for non-human callers", "HMAC-signed webhooks"].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#595959]">
                  <svg className="w-3.5 h-3.5 text-[#1677ff] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {item}
                </div>
              ))}
              <div className="flex items-center gap-2 text-sm text-[#faad14] pt-1 border-t border-[#f0f0f0]">
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                [roadmap] Multi-tenant isolation (org-scoped RLS) — not yet shipped
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#141414] mb-2">Evidence & control mapping</h2>
            <p className="text-[#595959] text-sm mb-6">GovernVeil produces audit artifacts mapped line-by-line to named controls. The table below states exactly what is satisfied and what is not.</p>
            <div className="space-y-4 mb-8">
              {controls.map(c => (
                <div key={c.framework} className="border border-[#f0f0f0] rounded-[8px] overflow-hidden">
                  <div className="bg-[#fafafa] border-b border-[#f0f0f0] px-4 py-2 flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#141414]">{c.framework}</span>
                    <span className="text-xs text-[#52c41a] bg-[#f6ffed] border border-[#b7eb8f] px-1.5 py-0.5 rounded">satisfied</span>
                  </div>
                  <div className="px-4 py-3 space-y-1.5">
                    {c.items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs text-[#595959]">
                        <svg className="w-3 h-3 text-[#52c41a] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-[#faad14]/40 bg-[#fffbe6] rounded-[8px] p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-[#faad14]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                <span className="text-sm font-semibold text-[#7c4a03]">What GovernVeil does not satisfy</span>
              </div>
              <p className="text-sm text-[#7c4a03] leading-relaxed">
                GovernVeil <span className="font-semibold">supports but does not satisfy</span> fairness, provenance, and explainability requirements. It provides the access and egress-control evidence layer; it does not perform model auditing, bias assessment, or output-explanation functions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <PilotCTABand />
    </>
  );
}
