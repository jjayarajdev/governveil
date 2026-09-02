import { VerdictTag, FONT, PageHeader, PilotCTABand } from "../components/shared";

const features = [
  {
    title: "Reversible masking",
    promise: "The work continues. The data never leaves.",
    body: "Realistic, format-preserving surrogates outbound. Durable, encrypted mapping. Deterministic per value. Default action is mask, never block.",
    how: "API path: full round trip — masked outbound, restored inbound. Browser/shadow-AI path: outbound masking only (the provider never sees real data; people work with stand-ins on screen). Restoring a third-party web UI's rendered turns isn't reliably achievable, so we don't claim it.",
    verdict: "mask" as const,
  },
  {
    title: "API access scope-gating (Access plane)",
    promise: "Governs any enterprise API by role → scope, with content inspection.",
    body: "Not just LLM traffic. Every enterprise API call is checked for role-to-scope alignment before any content inspection runs. No competitor profiled has this.",
    how: "Every request to /gw/<app> is checked against a role → scope policy. Out-of-scope requests return 403 and are logged. Never forwarded.",
    verdict: "allow" as const,
  },
  {
    title: "Content detection ladder",
    promise: "Fast path then local ML — sub-5ms to ~190ms, nothing external.",
    body: "Keyword/regex, secrets, and injection phrases in the fast path. Local transformers for injection, PII, toxicity, business-critical, harmful-intent (3-way allow/review/block), and a safety guard.",
    how: "All ML inference runs in your environment on your GPU. No prompt fragments sent to any vendor cloud for detection.",
    verdict: "review" as const,
  },
  {
    title: "Shadow-AI browser extension",
    promise: "Governs ChatGPT and claude.ai with no MDM dependency.",
    body: "Block or mask-outbound on ChatGPT and claude.ai. In-page review notice. Forward-proxy/ICAP variant for network-level coverage of any HTTP client.",
    how: "Extension intercepts prompts before submission. Verdict is applied locally. No traffic modification visible to the platform provider.",
    verdict: "block" as const,
  },
  {
    title: "Multi-turn drip detection",
    promise: "Catches sensitive data assembled across a conversation, not just single prompts.",
    body: "Session-level context is maintained per user. Sensitive values distributed across multiple turns are detected and masked as a unit.",
    how: "Per-session state tracks what has been submitted. Cumulative context is evaluated against detection policies at each turn.",
    verdict: "review" as const,
  },
  {
    title: "Document-upload hostile-content sweep",
    promise: "Cleans documents before they reach any model or RAG pipeline.",
    body: "Parses DOCX, PDF, and XLSX. Sweeps white-on-white text, OOXML comments, hidden sheets, formula payloads, and PDF JavaScript.",
    how: "Files are unpacked and swept before forwarding. Quarantine or redact action applied. Original file is not modified — a clean copy or rejection is returned.",
    verdict: "block" as const,
  },
  {
    title: "Vendor & agent credential governance",
    promise: "Every third-party AI credential scoped, monitored, and killable inline.",
    body: "Vendors → agents → scoped grants. Inline kill-switch enforced in ~0.5ms. Dormant-credential wake alerts. Scope changes require re-approval.",
    how: "Credentials stored as scoped grants in the gateway. Kill-switch is synchronous — in-flight requests with a killed credential return 401 immediately.",
    verdict: "review" as const,
  },
  {
    title: "Self-improving detection",
    promise: "Gets more accurate on your data without that data ever leaving.",
    body: "A review tier (allow/review/block) that fine-tunes on your reviewers' labels, in-house. Closed a real evasion 85→100% on held-out data, 0 new FPs.",
    how: "Reviewer decisions feed a fine-tuning pipeline that runs entirely in your environment. Model weights stay in your perimeter.",
    verdict: "review" as const,
  },
  {
    title: "Tamper-evident audit",
    promise: "Every request logged with a hash-chain of custody.",
    body: "Hash-chained audit log and DLP alert store. Export to Datadog today. Splunk/Sentinel emitters on roadmap.",
    how: "Each audit record contains the hash of the previous record. Any tampering breaks the chain. Export command produces a verifiable JSONL bundle.",
    verdict: "allow" as const,
    roadmap: "Splunk/Sentinel emitters are on the roadmap — not yet shipped.",
  },
  {
    title: "Graduated verdicts",
    promise: "allow / review / redact / mask / block — not just allow/block.",
    body: "Five distinct outcomes mean you can let work happen safely, queue for human review, or surface a pattern — without reaching for the kill switch as your only tool.",
    how: "Verdict mapping is configurable per detector, per policy, per app. Default is mask for PII; review for business-critical; block for known harmful.",
    verdict: "mask" as const,
  },
];

export default function Features() {
  return (
    <>
      <PageHeader
        eyebrow="Features"
        title="Everything GovernVeil enforces."
        subtitle="Each capability is scoped precisely — no adjectives without a mechanism behind them."
      />
      <section style={FONT} className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-4">
          {features.map(f => (
            <div key={f.title} className="border border-[#f0f0f0] rounded-[8px] p-6 hover:border-[#d9d9d9] transition-colors">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-semibold text-[#141414] text-base">{f.title}</h3>
                <VerdictTag verdict={f.verdict} />
              </div>
              <p className="text-sm font-medium text-[#595959] mb-2">{f.promise}</p>
              <p className="text-sm text-[#595959] leading-relaxed mb-3">{f.body}</p>
              <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[6px] px-4 py-3 text-xs text-[#8c8c8c] leading-relaxed">
                <span className="font-medium text-[#595959]">How it works: </span>{f.how}
              </div>
              {f.roadmap && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-[#faad14]">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  [roadmap] {f.roadmap}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <PilotCTABand />
    </>
  );
}
