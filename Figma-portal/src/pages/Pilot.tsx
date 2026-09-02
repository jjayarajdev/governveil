import { useState } from "react";
import { FONT, PageHeader } from "../components/shared";

export default function Pilot() {
  const [form, setForm] = useState({ name: "", email: "", company: "", region: "", gap: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Design-partner programme"
        title="Be in your environment producing a surprising result before you have to trust us."
        subtitle="A paid 8–12-week pilot. Week one: point one app at the gateway and watch it mask a real prompt and restore the answer — full round trip, your environment, your data."
      />

      <section style={FONT} className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-xl font-semibold text-[#141414] mb-6">What the pilot delivers</h2>
            <div className="space-y-4 mb-10">
              {[
                { week: "Week 1", title: "Full round trip live", body: "Point one app at the gateway. Watch it mask a real prompt and restore the answer. Or install the extension for a team — see it mask/block shadow-AI prompts and see the audit trail your auditor will accept." },
                { week: "Weeks 2–4", title: "Coverage expansion", body: "Add more apps or users. Tune detection policies. Validate against your actual data patterns, not synthetic test sets." },
                { week: "Weeks 5–12", title: "Evidence production", body: "Build the audit artefacts mapped to your named controls. Produce the evidence your compliance team needs. Finalise your deployment architecture." },
              ].map(item => (
                <div key={item.week} className="flex gap-4 border border-[#f0f0f0] rounded-[8px] p-4">
                  <div className="text-xs font-medium text-[#1677ff] bg-[#e6f4ff] border border-[#91caff] px-2 py-1 rounded shrink-0 h-fit mt-0.5 whitespace-nowrap">{item.week}</div>
                  <div>
                    <div className="font-semibold text-sm text-[#141414] mb-1">{item.title}</div>
                    <p className="text-[#595959] text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-[#f0f0f0] rounded-[8px] p-5 bg-[#fafafa]">
              <div className="font-semibold text-sm text-[#141414] mb-3">Pilot terms</div>
              <ul className="space-y-2">
                {["Paid: $15k–$40k depending on scope", "8–12 weeks with a clear conversion path", "You retain all findings and IP", "We retain no rights to your data", "Dedicated deployment support throughout"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#595959]">
                    <svg className="w-3.5 h-3.5 text-[#52c41a] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="border border-[#b7eb8f] bg-[#f6ffed] rounded-[8px] p-8 text-center">
                <svg className="w-10 h-10 text-[#52c41a] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="font-semibold text-[#141414] text-lg mb-2">Request received.</h3>
                <p className="text-[#595959] text-sm leading-relaxed">We review pilot applications and respond within 2 business days. We're selecting 3–5 organisations for the current cohort.</p>
              </div>
            ) : (
              <div className="border border-[#f0f0f0] rounded-[8px] p-6">
                <h3 className="font-semibold text-[#141414] mb-1">Request a pilot</h3>
                <p className="text-[#8c8c8c] text-sm mb-6">3–5 slots per cohort. We respond within 2 business days.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#595959] mb-1.5">Name <span className="text-[#ff4d4f]">*</span></label>
                      <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-[#d9d9d9] rounded-[6px] px-3 py-2 text-sm text-[#141414] placeholder-[#bfbfbf] focus:outline-none focus:border-[#1677ff] transition-colors"
                        placeholder="Sarah Chen" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#595959] mb-1.5">Work email <span className="text-[#ff4d4f]">*</span></label>
                      <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-[#d9d9d9] rounded-[6px] px-3 py-2 text-sm text-[#141414] placeholder-[#bfbfbf] focus:outline-none focus:border-[#1677ff] transition-colors"
                        placeholder="sarah@company.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#595959] mb-1.5">Company <span className="text-[#ff4d4f]">*</span></label>
                    <input required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                      className="w-full border border-[#d9d9d9] rounded-[6px] px-3 py-2 text-sm text-[#141414] placeholder-[#bfbfbf] focus:outline-none focus:border-[#1677ff] transition-colors"
                      placeholder="Acme Financial Services" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#595959] mb-1.5">Region <span className="text-[#ff4d4f]">*</span></label>
                    <select required value={form.region} onChange={e => setForm({ ...form, region: e.target.value })}
                      className="w-full border border-[#d9d9d9] rounded-[6px] px-3 py-2 text-sm text-[#141414] focus:outline-none focus:border-[#1677ff] transition-colors bg-white">
                      <option value="">Select region</option>
                      <option>India (GCC / BFSI / Pharma)</option>
                      <option>Australia (APRA-regulated)</option>
                      <option>APAC — other</option>
                      <option>Europe</option>
                      <option>Middle East</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#595959] mb-1.5">
                      What AI traffic can't you see today? <span className="text-[#ff4d4f]">*</span>
                    </label>
                    <textarea required value={form.gap} onChange={e => setForm({ ...form, gap: e.target.value })} rows={4}
                      className="w-full border border-[#d9d9d9] rounded-[6px] px-3 py-2 text-sm text-[#141414] placeholder-[#bfbfbf] focus:outline-none focus:border-[#1677ff] transition-colors resize-none"
                      placeholder="e.g. Our app teams are calling GPT-4 APIs directly and we have no audit trail. Staff use personal ChatGPT accounts. We have no coverage of Claude." />
                  </div>
                  <button type="submit" className="w-full bg-[#1677ff] text-white py-2.5 rounded-[6px] font-medium text-sm hover:bg-[#0958d9] transition-colors">
                    Request a pilot
                  </button>
                  <p className="text-xs text-[#8c8c8c] text-center">We don't add you to a mailing list. We respond to pilot requests only.</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
