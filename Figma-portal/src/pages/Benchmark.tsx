import { Link } from "react-router-dom";
import { FONT, PageHeader, PilotCTABand } from "../components/shared";

const latencyTable = [
  { path: "Fast path (keyword/regex)", p50: "sub-5ms", p95: "sub-5ms", hw: "2 vCPU", notes: "Stateless regex match" },
  { path: "ML path (all detectors)", p50: "~190ms", p95: "~320ms", hw: "A10G GPU", notes: "All 6 detectors, sequential" },
  { path: "Kill-switch enforcement", p50: "~0.5ms", p95: "~1ms", hw: "Any", notes: "In-memory lookup, synchronous" },
];

export default function Benchmark() {
  return (
    <>
      <PageHeader
        eyebrow="Benchmark / Proof"
        title="Reproducible results. Published methodology. No adjectives."
        subtitle="Every number here comes with a mechanism and a re-run path. Ask any competitor for their published false-positive rate."
      />

      <section style={FONT} className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-16">

          {/* AdvBench */}
          <div>
            <h2 className="text-xl font-semibold text-[#141414] mb-2">AdvBench: harmful-prompt detection</h2>
            <p className="text-[#595959] text-sm mb-6">Public benchmark. Re-runnable harness in the repo. Run it yourself and publish the result.</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { metric: "99.4%", label: "Block rate", note: "Harmful prompts correctly blocked" },
                { metric: "0", label: "False positives", note: "Benign prompts incorrectly blocked" },
                { metric: "Public", label: "Harness", note: "Re-runnable, in the repo" },
              ].map(s => (
                <div key={s.label} className="border border-[#f0f0f0] rounded-[8px] p-5 text-center">
                  <div className="text-3xl font-semibold text-[#1677ff] font-mono mb-1">{s.metric}</div>
                  <div className="text-sm font-medium text-[#141414] mb-0.5">{s.label}</div>
                  <div className="text-xs text-[#8c8c8c]">{s.note}</div>
                </div>
              ))}
            </div>
            <div className="rounded-[8px] border border-[#303030] bg-[#141414] p-4 text-xs font-mono">
              <div className="text-[#8c8c8c] mb-2"># re-run the AdvBench harness</div>
              <div className="text-[#52c41a]">git clone https://github.com/syntegreti/governveil</div>
              <div className="text-[#d9d9d9]">cd governveil/benchmarks/advbench</div>
              <div className="text-[#d9d9d9]">pip install -r requirements.txt</div>
              <div className="text-[#d9d9d9]">python run_advbench.py --endpoint http://localhost:8000/v1</div>
            </div>
          </div>

          {/* Self-improving */}
          <div>
            <h2 className="text-xl font-semibold text-[#141414] mb-2">Self-improving detection: evasion closure</h2>
            <p className="text-[#595959] text-sm mb-6">A reviewer-label fine-tuning cycle ran on a real evasion pattern. Held-out test set. 0 new false positives introduced.</p>
            <div className="border border-[#f0f0f0] rounded-[8px] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-[#f0f0f0]">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#8c8c8c] uppercase tracking-wide">Stage</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#8c8c8c] uppercase tracking-wide">Detection rate (held-out)</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#8c8c8c] uppercase tracking-wide">New false positives</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#f0f0f0]">
                    <td className="px-4 py-3 text-[#595959]">Before fine-tuning</td>
                    <td className="px-4 py-3 font-mono text-[#faad14]">85%</td>
                    <td className="px-4 py-3 font-mono text-[#595959]">0</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#595959]">After one fine-tune cycle (in-house, reviewer labels)</td>
                    <td className="px-4 py-3 font-mono text-[#52c41a]">100%</td>
                    <td className="px-4 py-3 font-mono text-[#52c41a]">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Latency */}
          <div>
            <h2 className="text-xl font-semibold text-[#141414] mb-2">Honest latency table</h2>
            <p className="text-[#595959] text-sm mb-6">Two numbers with methodology — not one marketing figure. Hardware and measurement approach stated explicitly.</p>
            <div className="border border-[#f0f0f0] rounded-[8px] overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#fafafa] border-b border-[#f0f0f0]">
                      {["Path", "p50", "p95", "Hardware", "Notes"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#8c8c8c] uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {latencyTable.map((r, i) => (
                      <tr key={r.path} className={`border-b border-[#f0f0f0] ${i % 2 === 0 ? "" : "bg-[#fafafa]/50"}`}>
                        <td className="px-4 py-3 font-medium text-[#141414]">{r.path}</td>
                        <td className="px-4 py-3 font-mono text-[#1677ff]">{r.p50}</td>
                        <td className="px-4 py-3 font-mono text-[#595959]">{r.p95}</td>
                        <td className="px-4 py-3 text-[#595959]">{r.hw}</td>
                        <td className="px-4 py-3 text-[#8c8c8c] text-xs">{r.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* What we don't claim */}
          <div className="border border-[#faad14]/40 bg-[#fffbe6] rounded-[8px] p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-[#faad14]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              <h3 className="font-semibold text-[#7c4a03]">What we don't claim</h3>
            </div>
            <ul className="space-y-3">
              {[
                "No FF3-1 — we use FF1-class format preservation with a domain floor. Adequate for realistic surrogates; not a cryptographic FPE claim.",
                "No differential privacy or k-anonymity for prompts — these are audit-analytics properties, not single-prompt properties. Don't apply them here.",
                "PII detection is not '99%' — which is exactly why we mask instead of block. Detection is a gate for masking, not a final verdict.",
                "No sub-100ms ML latency claim as a single figure — the fast path is sub-5ms; the ML path is ~190ms p50. We publish both.",
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#7c4a03]">
                  <svg className="w-4 h-4 text-[#faad14] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <PilotCTABand />
    </>
  );
}
