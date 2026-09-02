import { useState } from "react";
import { Link } from "react-router-dom";
import { VerdictTag, FONT, PilotCTABand } from "../components/shared";

function RequestFlowDiagram() {
  const rows = [
    { source: "LLM API call", payload: "Account A123456(7) — balance £48,200", verdict: "mask" as const, egress: "A563710(2) — £00,000", note: "reversed on response" },
    { source: "Browser / ChatGPT", payload: "Patient MRN-00842 dob 1979-04-12", verdict: "mask" as const, egress: "MRN-00000 dob ****-**-**", note: "stand-in on screen" },
    { source: "Agent credential", payload: "sk-prod-xxxxxxxx (scope: write:all)", verdict: "review" as const, egress: "queued for approval", note: "over-scoped" },
    { source: "Document upload", payload: "contract.pdf (hidden PII in metadata)", verdict: "block" as const, egress: "upload rejected", note: "macro detected" },
    { source: "Internal API call", payload: "GET /customers?region=APAC", verdict: "allow" as const, egress: "forwarded unchanged", note: "role in scope" },
  ];
  return (
    <div className="rounded-[8px] border border-[#303030] bg-[#141414] overflow-hidden text-xs">
      <div className="border-b border-[#303030] px-4 py-2.5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d4f]" /><span className="w-2.5 h-2.5 rounded-full bg-[#faad14]" /><span className="w-2.5 h-2.5 rounded-full bg-[#52c41a]" />
        <span className="ml-2 text-[#8c8c8c] font-mono">GovernVeil · enforcement log · live</span>
        <span className="ml-auto flex items-center gap-1.5 text-[#52c41a] font-mono"><span className="w-1.5 h-1.5 rounded-full bg-[#52c41a] animate-pulse" />processing</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full font-mono">
          <thead>
            <tr className="border-b border-[#1f1f1f] text-[#595959]">
              <th className="text-left px-4 py-2 font-normal">source</th>
              <th className="text-left px-4 py-2 font-normal hidden sm:table-cell">inbound payload (excerpt)</th>
              <th className="text-left px-4 py-2 font-normal">verdict</th>
              <th className="text-left px-4 py-2 font-normal hidden lg:table-cell">egress / note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-[#1f1f1f] hover:bg-[#1a1a1a] transition-colors">
                <td className="px-4 py-2.5 text-[#d9d9d9] whitespace-nowrap">{r.source}</td>
                <td className="px-4 py-2.5 text-[#8c8c8c] hidden sm:table-cell max-w-xs truncate">{r.payload}</td>
                <td className="px-4 py-2.5"><VerdictTag verdict={r.verdict} /></td>
                <td className="px-4 py-2.5 hidden lg:table-cell text-[#8c8c8c]">{r.egress} <span className="text-[#595959] italic ml-1">— {r.note}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section style={FONT} className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 border border-[#d9d9d9] rounded-[6px] px-3 py-1 text-xs text-[#595959] mb-5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1677ff]" />
            AI data-egress control & evidence · self-hosted
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-semibold text-[#141414] leading-[1.15] tracking-tight mb-5">
            Let your teams use AI.<br />
            Keep the data — and the proof —<br />inside your perimeter.
          </h1>
          <p className="text-base text-[#595959] leading-relaxed max-w-2xl mb-8">
            GovernVeil governs every AI action — LLM API calls, enterprise-app access, and vendor/agent credentials — in your own environment. Sensitive values are replaced with realistic stand-ins before the prompt leaves; on your apps' API calls they're restored in the response — so work continues and nothing sensitive ever reaches the model provider.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/pilot" className="inline-flex items-center justify-center gap-2 bg-[#1677ff] text-white px-5 py-2.5 rounded-[6px] font-medium text-sm hover:bg-[#0958d9] transition-colors">
              Book a design-partner pilot
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link to="/product" className="inline-flex items-center justify-center gap-2 border border-[#d9d9d9] text-[#595959] px-5 py-2.5 rounded-[6px] font-medium text-sm hover:border-[#1677ff] hover:text-[#1677ff] transition-colors">
              See the architecture
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-12 text-xs text-[#8c8c8c] border-t border-b border-[#f0f0f0] py-3">
          {["Runs in your VPC or on-prem", "All ML inference local", "No prompt content leaves your network", "OpenAI-compatible drop-in"].map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-[#52c41a]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              {t}
            </span>
          ))}
        </div>
        <RequestFlowDiagram />
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section style={FONT} className="py-20 px-6 bg-[#fafafa] border-t border-[#f0f0f0]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-medium text-[#8c8c8c] uppercase tracking-widest mb-3">The gap</p>
          <h2 className="text-3xl font-semibold text-[#141414]">Three things the current stack doesn't solve.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "01", title: "The licence doesn't see everything.", body: "ChatGPT Enterprise and Copilot cover people in a browser. They don't cover your applications and agents calling model APIs directly, or the personal accounts staff still use." },
            { n: "02", title: "Blocking stops the work.", body: "Traditional DLP either lets a prompt through or walls the user off — so they switch to a personal device and you lose visibility entirely." },
            { n: "03", title: "You can't prove any of it.", body: "Only ~a third of organisations send AI logs anywhere an auditor would accept. The contract transfers liability; it doesn't produce evidence." },
          ].map(item => (
            <div key={item.n} className="bg-white border border-[#f0f0f0] rounded-[8px] p-6 hover:border-[#d9d9d9] transition-colors">
              <div className="text-[#d9d9d9] font-mono text-xs mb-4">{item.n}</div>
              <h3 className="font-semibold text-[#141414] mb-2 text-sm leading-snug">{item.title}</h3>
              <p className="text-[#595959] text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={FONT} className="py-20 px-6 bg-white border-t border-[#f0f0f0]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-xs font-medium text-[#8c8c8c] uppercase tracking-widest mb-3">Architecture</p>
          <h2 className="text-3xl font-semibold text-[#141414] mb-4">Two enforcement planes over one detection ladder.</h2>
          <p className="text-[#595959] text-sm leading-relaxed mb-8">
            Every request ends in <VerdictTag verdict="allow" /> <VerdictTag verdict="review" /> <VerdictTag verdict="mask" /> <VerdictTag verdict="block" /> — and is audited with a tamper-evident hash-chained record.
          </p>
          <div className="space-y-5">
            {[
              { icon: "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z", title: "Access plane", code: "/gw/<app>", body: "Role → scope gating on any enterprise API before a request is ever forwarded. Vendor credentials scoped, monitored, and killable inline (~0.5ms)." },
              { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Content plane", code: "/v1/*", body: "Fast keyword/regex path (sub-5ms) then local transformer detectors (~190ms p50 on GPU): prompt-injection, PII, toxicity, harmful-intent (3-way), safety guard. No data sent to any external inference endpoint." },
              { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", title: "Reversible masking", code: null, body: "Sensitive values are swapped for realistic surrogates outbound and restored inbound — the provider sees A563710(2), your user sees A123456(7). Default action is mask, never block." },
            ].map(item => (
              <div key={item.title} className="flex gap-4">
                <div className="w-8 h-8 rounded-[6px] bg-[#e6f4ff] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#1677ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-[#141414]">{item.title}</span>
                    {item.code && <code className="text-xs bg-[#f5f5f5] border border-[#f0f0f0] px-1.5 py-0.5 rounded text-[#595959]">{item.code}</code>}
                  </div>
                  <p className="text-[#595959] text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/product" className="inline-flex items-center gap-1.5 mt-8 text-sm text-[#1677ff] hover:underline">
            Full request lifecycle →
          </Link>
        </div>
        {/* Architecture diagram */}
        <div className="rounded-[8px] border border-[#f0f0f0] bg-[#fafafa] p-6 space-y-2.5 text-xs font-mono">
          <div className="text-[#8c8c8c] mb-4">request-flow · simplified</div>
          {[
            { label: "Client (browser / agent / app)", bg: "#e6f4ff", border: "#91caff", text: "#0958d9" },
            { label: "↓ TLS", indent: false, arrow: true },
            { label: "GovernVeil gateway", bg: "#141414", border: "#303030", text: "#d9d9d9", dark: true },
            { label: "│  1. Access plane — role/scope", indent: true },
            { label: "│  2. Content plane — detect & verdict", indent: true },
            { label: "│  3. Reversible masking (if mask)", indent: true },
            { label: "│  4. Hash-chain audit record", indent: true },
            { label: "↓ (allow / mask-outbound)", arrow: true },
            { label: "Model provider or enterprise API", bg: "#f6ffed", border: "#b7eb8f", text: "#389e0d" },
            { label: "↑ response: mask restored inbound", arrow: true, blue: true },
          ].map((row, i) => (
            <div key={i} className={row.indent ? "pl-4" : ""}>
              {row.bg ? (
                <div className="px-3 py-2 rounded-[6px] border" style={{ background: row.bg, borderColor: row.border, color: row.text }}>{row.label}</div>
              ) : (
                <div className={`text-center py-0.5 ${row.blue ? "text-[#1677ff]" : row.indent ? "text-[#595959]" : "text-[#d9d9d9]"}`}>{row.label}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const caps = [
    { title: "Reversible masking", body: "Full round trip on API calls: masked outbound, restored inbound. Browser/shadow-AI: outbound masking only (provider never sees real data). Default action is mask, never block.", verdict: "mask" as const },
    { title: "Two enforcement planes", body: "Content inspection and API access scope-gating run in sequence. No competitor profiled has the access plane.", verdict: "allow" as const },
    { title: "Shadow-AI coverage", body: "Browser extension for ChatGPT and claude.ai (mask outbound or block), plus a forward-proxy/ICAP variant for network-level coverage.", verdict: "block" as const },
    { title: "Document-upload sweep", body: "Catches hidden text, Office/OOXML tricks, macros, and PDF JavaScript before a file reaches an LLM or RAG pipeline.", verdict: "block" as const },
    { title: "Vendor & agent governance", body: "Every third-party AI credential scoped, monitored, and killable inline. Kill-switch enforced in ~0.5ms. Dormant-credential wake alerts.", verdict: "review" as const },
    { title: "Audit-grade evidence", body: "Tamper-evident, hash-chained logs mapped line-by-line to named controls. Export to Datadog or SIEM today.", verdict: "allow" as const },
  ];
  return (
    <section style={FONT} className="py-20 px-6 bg-[#fafafa] border-t border-[#f0f0f0]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-medium text-[#8c8c8c] uppercase tracking-widest mb-3">Capabilities</p>
          <h2 className="text-3xl font-semibold text-[#141414]">What GovernVeil enforces.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {caps.map(c => (
            <div key={c.title} className="bg-white border border-[#f0f0f0] rounded-[8px] p-5 hover:border-[#d9d9d9] transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-[#141414] text-sm pr-2">{c.title}</h3>
                <VerdictTag verdict={c.verdict} />
              </div>
              <p className="text-[#595959] text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/features" className="text-sm text-[#1677ff] hover:underline">All features →</Link>
        </div>
      </div>
    </section>
  );
}

function Differentiator() {
  return (
    <section style={FONT} className="py-20 px-6 bg-[#141414]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-medium text-[#595959] uppercase tracking-widest mb-4">The one thing nobody else does</p>
          <h2 className="text-3xl font-semibold text-white mb-5 leading-snug">"We blocked it" →<br />"We let the work happen safely."</h2>
          <p className="text-[#8c8c8c] text-sm leading-relaxed mb-6">
            On your apps' model-API calls, GovernVeil replaces a sensitive value with a reversible surrogate on the way out and restores it on the way back — a full round trip. For browser/shadow-AI use it masks outbound so nothing real leaves.
          </p>
          <ul className="space-y-3 mb-8">
            {["Detect-and-block vendors can't do this — they have no response path.", "The model providers have explicitly declined to implement it.", "Runs entirely in your perimeter, so it works air-gapped."].map(item => (
              <li key={item} className="flex items-start gap-3 text-sm text-[#8c8c8c]">
                <svg className="w-4 h-4 text-[#1677ff] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link to="/pilot" className="inline-flex items-center gap-2 bg-[#1677ff] text-white px-5 py-2.5 rounded-[6px] font-medium text-sm hover:bg-[#0958d9] transition-colors">Book a design-partner pilot</Link>
            <Link to="/benchmark" className="inline-flex items-center gap-2 border border-[#424242] text-[#8c8c8c] px-5 py-2.5 rounded-[6px] font-medium text-sm hover:border-[#595959] hover:text-[#d9d9d9] transition-colors">Read the benchmark</Link>
          </div>
        </div>
        {/* Round-trip diagram */}
        <div className="rounded-[8px] border border-[#303030] bg-[#1a1a1a] p-5 space-y-3 text-xs font-mono">
          <div className="text-[#595959] mb-2">masking round-trip · LLM API call</div>
          <div className="rounded-[6px] border border-[#303030] bg-[#141414] p-3">
            <div className="text-[#52c41a] mb-1">// your application sends:</div>
            <div className="text-[#d9d9d9]">"Summarise account <span className="bg-[#ff4d4f]/20 text-[#ff4d4f] px-1 rounded">A123456(7)</span>, balance <span className="bg-[#ff4d4f]/20 text-[#ff4d4f] px-1 rounded">£48,200</span>"</div>
          </div>
          <div className="flex items-center gap-2 py-0.5">
            <div className="flex-1 h-px bg-[#303030]" />
            <span className="text-[#8c8c8c] flex items-center gap-1.5"><VerdictTag verdict="mask" /> masks outbound</span>
            <div className="flex-1 h-px bg-[#303030]" />
          </div>
          <div className="rounded-[6px] border border-[#303030] bg-[#141414] p-3">
            <div className="text-[#8c8c8c] mb-1">// model provider receives:</div>
            <div className="text-[#d9d9d9]">"Summarise account <span className="bg-[#1677ff]/20 text-[#1677ff] px-1 rounded">A563710(2)</span>, balance <span className="bg-[#1677ff]/20 text-[#1677ff] px-1 rounded">£00,000</span>"</div>
          </div>
          <div className="rounded-[6px] border border-[#303030] bg-[#141414] p-3">
            <div className="text-[#8c8c8c] mb-1">// model returns:</div>
            <div className="text-[#d9d9d9]">"Account <span className="bg-[#1677ff]/20 text-[#1677ff] px-1 rounded">A563710(2)</span> has balance <span className="bg-[#1677ff]/20 text-[#1677ff] px-1 rounded">£00,000</span>…"</div>
          </div>
          <div className="flex items-center gap-2 py-0.5">
            <div className="flex-1 h-px bg-[#303030]" />
            <span className="text-[#8c8c8c] flex items-center gap-1.5"><VerdictTag verdict="allow" /> restores inbound</span>
            <div className="flex-1 h-px bg-[#303030]" />
          </div>
          <div className="rounded-[6px] border border-[#52c41a]/30 bg-[#141414] p-3">
            <div className="text-[#52c41a] mb-1">// your application receives:</div>
            <div className="text-[#d9d9d9]">"Account <span className="bg-[#52c41a]/20 text-[#52c41a] px-1 rounded">A123456(7)</span> has balance <span className="bg-[#52c41a]/20 text-[#52c41a] px-1 rounded">£48,200</span>…"</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section style={FONT} className="py-20 px-6 bg-white border-t border-[#f0f0f0]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-xs font-medium text-[#8c8c8c] uppercase tracking-widest mb-3">Reproducible benchmark</p>
          <h2 className="text-3xl font-semibold text-[#141414] mb-4">Numbers, not adjectives.</h2>
          <p className="text-[#595959] text-sm leading-relaxed mb-8">
            Public, re-runnable harness in the repo. Ask any competitor for their published false-positive rate.
          </p>
          <div className="space-y-4">
            {[
              { metric: "99.4%", label: "harmful-prompt block rate on AdvBench", note: "public, re-runnable harness in the repo" },
              { metric: "0", label: "false positives on AdvBench", note: "ask any competitor for their published number" },
              { metric: "85→100%", label: "evasion closed by self-improving detection", note: "held-out data, 0 new FPs" },
            ].map(s => (
              <div key={s.metric} className="flex gap-4 border border-[#f0f0f0] rounded-[8px] p-4">
                <div className="text-2xl font-semibold text-[#1677ff] font-mono shrink-0 w-24">{s.metric}</div>
                <div>
                  <div className="text-sm font-medium text-[#141414] mb-0.5">{s.label}</div>
                  <div className="text-xs text-[#8c8c8c]">{s.note}</div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/benchmark" className="inline-flex items-center gap-1.5 mt-6 text-sm text-[#1677ff] hover:underline">Full benchmark methodology →</Link>
        </div>
        <div>
          <p className="text-xs font-medium text-[#8c8c8c] uppercase tracking-widest mb-3">Honest latency</p>
          <p className="text-[#595959] text-sm leading-relaxed mb-6">We publish two numbers with methodology, not one marketing figure.</p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { value: "sub-5ms", label: "fast path p50", note: "keyword / regex, commodity hardware" },
              { value: "~190ms", label: "ML path p50", note: "GPU-accelerated, local inference" },
              { value: "~0.5ms", label: "kill-switch enforcement", note: "inline, synchronous" },
              { value: "100%", label: "audit coverage", note: "every request, hash-chained" },
            ].map(s => (
              <div key={s.value} className="bg-[#fafafa] border border-[#f0f0f0] rounded-[8px] p-4">
                <div className="text-2xl font-semibold text-[#1677ff] font-mono mb-1">{s.value}</div>
                <div className="text-xs font-medium text-[#141414] mb-0.5">{s.label}</div>
                <div className="text-xs text-[#8c8c8c]">{s.note}</div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-medium text-[#8c8c8c] uppercase tracking-widest mb-3">Security & residency</p>
            <div className="border border-[#f0f0f0] rounded-[8px] p-4 space-y-2">
              {["Self-hosted (Docker / Kubernetes / AWS)", "All ML inference local — no prompt content leaves", "Encryption in transit (TLS 1.2+) and at rest (AES-256)", "Data residency by construction — no vendor cloud in verdict path", "Air-gap capable"].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#595959]">
                  <svg className="w-3.5 h-3.5 text-[#52c41a] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {item}
                </div>
              ))}
            </div>
            <Link to="/security" className="inline-flex items-center gap-1.5 mt-4 text-sm text-[#1677ff] hover:underline">Security & compliance detail →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section style={FONT} className="py-16 px-6 bg-[#fafafa] border-t border-[#f0f0f0]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-xs font-medium text-[#8c8c8c] uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-2xl font-semibold text-[#141414] mb-2">Flat, self-hosted, predictable.</h2>
          <p className="text-[#595959] text-sm max-w-lg leading-relaxed">
            Priced per governed-AI-user — not per token you run on your own hardware, and not a $100k+ floor.
            ~<span className="font-semibold text-[#141414]">$96 / governed-AI-user / year</span>, 500-seat floor.
            You also pay your own infra (reference pilot ≈ low-hundreds/month).
          </p>
        </div>
        <Link to="/pricing" className="inline-flex items-center gap-2 border border-[#d9d9d9] text-[#595959] px-5 py-2.5 rounded-[6px] font-medium text-sm hover:border-[#1677ff] hover:text-[#1677ff] transition-colors shrink-0">
          See pricing tiers →
        </Link>
      </div>
    </section>
  );
}

function ICP() {
  return (
    <section style={FONT} className="py-20 px-6 bg-white border-t border-[#f0f0f0]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-medium text-[#8c8c8c] uppercase tracking-widest mb-3">Who it's for</p>
          <h2 className="text-3xl font-semibold text-[#141414]">Built for regulated, sovereignty-constrained environments.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { region: "India", label: "GCCs & global capability centres", detail: "200+ GCCs in Hyderabad, Bengaluru, Chennai running regulated workloads for BFSI, pharma, and insurance parents." },
            { region: "Australia", label: "APRA-regulated financial institutions", detail: "CPS 234 and CPS 230 require demonstrable AI-access controls and evidence for third-party tech risk." },
            { region: "Global", label: "BFSI & healthcare / life-sciences", detail: "PCI-DSS, HIPAA, and local privacy regimes treat AI egress as a data-transfer event — not a browser policy." },
            { region: "Global", label: "Sovereignty & residency-constrained orgs", detail: "Data-localisation mandates mean local inference is a legal requirement, not a preference." },
          ].map(s => (
            <div key={s.label} className="border border-[#f0f0f0] rounded-[8px] p-5 hover:border-[#d9d9d9] transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-[#f5f5f5] border border-[#f0f0f0] text-[#8c8c8c] px-2 py-0.5 rounded">{s.region}</span>
                <span className="font-semibold text-[#141414] text-sm">{s.label}</span>
              </div>
              <p className="text-[#595959] text-sm leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={FONT} className="py-20 px-6 bg-[#141414] border-t border-[#303030]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-medium text-[#595959] uppercase tracking-widest mb-4">Design-partner programme</p>
        <h2 className="text-3xl font-semibold text-white mb-4">See it mask a real prompt in 90 seconds.</h2>
        <p className="text-[#8c8c8c] text-sm leading-relaxed mb-8">
          A paid 8–12-week pilot. Week one: point one app at the gateway and watch it mask a real prompt and restore the answer — full round trip, your environment, your data.
        </p>
        <Link to="/pilot" className="inline-flex items-center gap-2 bg-[#1677ff] text-white px-6 py-3 rounded-[6px] font-medium text-sm hover:bg-[#0958d9] transition-colors">
          Book a design-partner pilot
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
        <p className="text-[#595959] text-xs mt-4">Or <Link to="/product" className="text-[#1677ff] hover:underline">see the architecture first →</Link></p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Capabilities />
      <Differentiator />
      <Proof />
      <ICP />
      <PricingTeaser />
      <FinalCTA />
    </>
  );
}
