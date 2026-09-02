import { Link } from "react-router-dom";
import { VerdictTag, FONT, PageHeader, PilotCTABand } from "../components/shared";

const steps = [
  { n: "1", title: "Ingress", body: "An app calls /v1/* (a base-URL change) or a person types into ChatGPT/claude.ai — the extension relays the prompt to the gateway." },
  { n: "2", title: "Access plane", body: "For enterprise apps, role → scope is checked before anything is forwarded. Denials return 403 and never leave the perimeter." },
  { n: "3", title: "Detection ladder", body: "Fast keyword/regex path, then local transformer detectors: prompt-injection, PII, toxicity, business-critical (zero-shot), harmful-intent (3-way allow/review/block), and a safety guard." },
  { n: "4", title: "Verdict", body: "Every request gets one of: allow / review / redact / reversibly mask / block. Logged regardless." },
  { n: "5", title: "Reversible masking", body: "Sensitive spans swapped for durable, format-preserving surrogates. The mapping is persisted encrypted before anything is forwarded." },
  { n: "6", title: "Restore", body: "The model's response has surrogates swapped back to real values for the authorised caller — only on the API path; browser/shadow-AI is outbound-only." },
  { n: "7", title: "Audit", body: "Who, what, action, latency, model/prompt version → hash-chained log, mirrored to a time-series store, exportable to Datadog or your SIEM." },
];

export default function Product() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="An OpenAI-compatible gateway plus a managed browser extension."
        subtitle="Point your apps at one base URL, install the extension for people, and every AI interaction is governed and evidenced — in your environment."
      />
      <section style={FONT} className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-semibold text-[#141414] mb-8">The request lifecycle</h2>
            <div className="space-y-0">
              {steps.map((s, i) => (
                <div key={s.n} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#e6f4ff] border border-[#91caff] flex items-center justify-center text-xs font-semibold text-[#1677ff] shrink-0">{s.n}</div>
                    {i < steps.length - 1 && <div className="w-px flex-1 bg-[#f0f0f0] my-1 min-h-[20px]" />}
                  </div>
                  <div className="pb-6">
                    <div className="font-semibold text-sm text-[#141414] mb-1 mt-1.5">{s.title}</div>
                    <p className="text-[#595959] text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Detection ladder visual */}
            <div>
              <h3 className="text-sm font-semibold text-[#141414] mb-4">Detection ladder</h3>
              <div className="rounded-[8px] border border-[#303030] bg-[#141414] overflow-hidden">
                <div className="border-b border-[#303030] px-4 py-2 flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#8c8c8c]">detection-pipeline · single request</span>
                </div>
                <div className="p-4 space-y-2 text-xs font-mono">
                  {[
                    { stage: "keyword / regex / secrets", time: "sub-5ms", color: "#52c41a" },
                    { stage: "injection-phrase patterns", time: "sub-5ms", color: "#52c41a" },
                    { stage: "prompt-injection (ML)", time: "~190ms p50", color: "#1677ff" },
                    { stage: "PII detector (ML)", time: "~190ms p50", color: "#1677ff" },
                    { stage: "toxicity (ML)", time: "~190ms p50", color: "#1677ff" },
                    { stage: "business-critical / zero-shot", time: "~190ms p50", color: "#1677ff" },
                    { stage: "harmful-intent 3-way", time: "~190ms p50", color: "#1677ff" },
                    { stage: "safety guard", time: "~190ms p50", color: "#1677ff" },
                  ].map(r => (
                    <div key={r.stage} className="flex items-center justify-between py-1.5 border-b border-[#1f1f1f]">
                      <span className="text-[#d9d9d9]">{r.stage}</span>
                      <span className="font-mono" style={{ color: r.color }}>{r.time}</span>
                    </div>
                  ))}
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-[#595959]">verdict →</span>
                    <VerdictTag verdict="allow" />
                    <VerdictTag verdict="review" />
                    <VerdictTag verdict="mask" />
                    <VerdictTag verdict="block" />
                  </div>
                </div>
              </div>
            </div>

            {/* Deployment */}
            <div>
              <h3 className="text-sm font-semibold text-[#141414] mb-4">Deployment</h3>
              <div className="space-y-3">
                {[
                  { title: "Self-hosted", body: "Docker / Kubernetes / AWS. One-command demo. Nothing exposed to the internet." },
                  { title: "OpenAI-compatible", body: "Most apps integrate with a base-URL change and no SDK changes." },
                  { title: "Reference pilot", body: "Single GPU VM (AWS g5.2xlarge / A10G) over an SSH tunnel — ~low-hundreds/month. Production: ~low-thousands/month." },
                ].map(d => (
                  <div key={d.title} className="border border-[#f0f0f0] rounded-[8px] p-4">
                    <div className="font-semibold text-sm text-[#141414] mb-1">{d.title}</div>
                    <p className="text-[#595959] text-sm">{d.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit record */}
            <div className="rounded-[8px] border border-[#303030] bg-[#141414] p-4 text-xs font-mono">
              <div className="text-[#8c8c8c] mb-3">audit record · example</div>
              <pre className="text-[#d9d9d9] overflow-x-auto whitespace-pre-wrap leading-relaxed">{`{
  "ts": "2026-08-30T09:14:02.341Z",
  "request_id": "req_8Kz2x...",
  "user": "sarah.chen@acme.io",
  "source": "app:crm-assistant",
  "verdict": "mask",
  "detectors_fired": ["pii:account_number"],
  "latency_ms": 194,
  "model": "gpt-4o",
  "hash": "sha256:a7f3...",
  "prev_hash": "sha256:9c1b..."
}`}</pre>
            </div>
          </div>
        </div>
      </section>
      <PilotCTABand />
    </>
  );
}
