import { Link } from 'react-router-dom'
import { Mark } from './Logo'

/* Runtime security — iteration 3, ported from site/runtime.html.

   Markup is the design's, converted mechanically: class -> className, style
   strings -> objects, internal .html hrefs -> <Link to> on the routes already
   public, <pre> newlines made explicit. */

export default function RuntimeV3() {
  return (
    <>
      <main id="main">
      <section className="wrap" style={{"paddingTop": 96, "paddingBottom": 72, "textAlign": "center"}}>
      <p className="eb" style={{"marginBottom": 24}}>Runtime security</p>
      <h1 className="h1x" style={{"maxWidth": 1100, "margin": "0 auto"}}>Catch it before it leaves<span style={{"color": "var(--acc)"}}>.</span></h1>
      <p className="lead" style={{"fontSize": 21, "maxWidth": 720, "margin": "32px auto 0"}}>Inspect prompts, agent tool calls, model responses and credentials in your own network — before anything reaches a provider.</p>
      <form aria-label="Book a pilot" style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "center", "gap": 10, "maxWidth": 560, "margin": "36px auto 0"}}>
      <label htmlFor="rt3-hero" className="sr">Work email</label>
      <input id="rt3-hero" type="email" placeholder="you@company.com" autocomplete="email" style={{"flex": "1 1 280px", "minHeight": 52}} />
      <button type="button" className="btnp">Book a pilot</button>
      </form>
      </section>

      <section className="wrap" style={{"paddingBottom": 40}}>
      <div className="pair">
      <div><p className="q">Q · What does it catch in a prompt?</p><p className="eb" style={{"color": "#B83E0E", "marginBottom": 12}}>01 · Prompts</p><h2 className="h2x">Catch sensitive data before the prompt leaves.</h2><p className="body" style={{"margin": "16px 0 20px"}}>Identifiers, credentials and injection phrasing are caught on a sub-millisecond pattern path. Anything the patterns cannot settle goes to one local model that answers every policy as a plain-language question. You tune detection by editing the question, not by retraining.</p><Link to="/benchmark" style={{"fontWeight": "600"}}>See the benchmark →</Link></div>
      <aside className="card"><div className="rl">RECEIPT · COMBINED-1000 CORPUS</div><div className="big">93.25 %</div><div className="cap">recall at 100 % precision</div><div className="rf">$ make benchmark · no network required</div></aside>
      </div>
      <div className="pair">
      <div><p className="q">Q · And when an agent calls a tool?</p><p className="eb" style={{"color": "#B83E0E", "marginBottom": 12}}>02 · Agents</p><h2 className="h2x">Judge every agent tool call, three times.</h2><p className="body" style={{"margin": "16px 0 20px"}}>When the agent discovers a tool, when it fills in the arguments, and when the server answers back. A poisoned tool description never reaches the agent’s list.</p><Link to="/mcp" style={{"fontWeight": "600"}}>Watch an agent call a tool →</Link></div>
      <aside className="card"><div className="rl">RECEIPT · MCP SCORECARD</div><div className="big">14 <span style={{"fontWeight": "500", "color": "#4A534E"}}>/ 14</span></div><div className="cap">across seven categories, poisoned tools and exfiltration included</div><div className="rf">$ make mcp-scorecard</div></aside>
      </div>
      <div className="pair">
      <div><p className="q">Q · Is the model’s answer checked too?</p><p className="eb" style={{"color": "#B83E0E", "marginBottom": 12}}>03 · Responses</p><h2 className="h2x">The model’s output is a prompt too.</h2><p className="body" style={{"margin": "16px 0 20px"}}>Every response — JSON or stream, tool-call arguments included — runs the same ladder and the same chain before the caller sees it. With the vault on, surrogates are restored only for the authorised caller.</p><Link to="/product" style={{"fontWeight": "600"}}>The eight steps →</Link></div>
      <aside className="dcard"><div className="rl">RECEIPT · LATENCY</div><div className="g2" style={{"gap": 20, "marginTop": 16}}><div><div style={{"fontSize": 34, "fontWeight": "800", "color": "#F4F5F2"}}>sub-ms</div><div style={{"fontSize": 13, "color": "#9DA8A1"}}>pattern path</div></div><div><div style={{"fontSize": 34, "fontWeight": "800", "color": "#F4F5F2"}}>~135–170 ms</div><div style={{"fontSize": 13, "color": "#9DA8A1"}}>model path, single request</div></div></div><div className="rf">A10G · 15–30 % of traffic reaches the model</div></aside>
      </div>
      <div className="pair">
      <div><p className="q">Q · What if a credential is compromised?</p><p className="eb" style={{"color": "#B83E0E", "marginBottom": 12}}>04 · Credentials</p><h2 className="h2x">Kill a credential before inspection runs.</h2><p className="body" style={{"margin": "16px 0 20px"}}>A revoked grant is refused with a 403 before any content is inspected. A long-dormant grant that suddenly wakes raises an incident with a 14-day clock and optional auto-freeze.</p><Link to="/security" style={{"fontWeight": "600"}}>How the ledger records it →</Link></div>
      <aside className="card"><div className="rl">RECEIPT · KILL SWITCH</div><div className="big">~0.5 ms</div><div className="cap">revoked grant to 403, measured in-line</div></aside>
      </div>
      </section>

      <section className="dk">
      <div className="wrap sec">
      <p className="q">Q · Can a person override a block?</p>
      <div className="g2" style={{"alignItems": "end"}}>
      <h2 className="h2x">Five verdicts, so the work doesn’t stop.</h2>
      <p className="body" style={{"margin": "0"}}>With acknowledge, the person sees the values found, unticks what the assistant doesn’t need and says why the rest must go. The name, the reason and the field types are signed — the values are not.</p>
      </div>
      <div className="g5" style={{"marginTop": 44}}>
      <div className="vc"><span className="v v-allow">ALLOW</span><b>Forwarded unchanged</b><span className="d">Nothing sensitive found</span></div>
      <div className="vc"><span className="v v-flag">FLAG</span><b>Sent, and raised</b><span className="d">Goes to the review queue</span></div>
      <div className="vc" style={{"border": "2px solid var(--acc)", "padding": 19}}><span className="v v-mask">MASK</span><b>Spans replaced</b><span className="d">The rest is forwarded</span></div>
      <div className="vc"><span className="v v-ack">ACKNOWLEDGE</span><b>Back to the person</b><span className="d">They minimise, and say why</span></div>
      <div className="vc"><span className="v v-block">BLOCK</span><b>Cancelled</b><span className="d">And ledgered, with the reason</span></div>
      </div>
      <div className="g2" style={{"marginTop": 72, "gap": "32px 48px"}}>
      <div className="sc"><b>Surfaces</b><p>Model APIs on /v1, enterprise applications on /gw, agent tool calls on /mcp, and a browser extension covering eight public assistants with no MDM dependency.</p></div>
      <div className="sc"><b>Identifiers</b><p>US and India formats on the pattern path — SSN, card, PAN, GSTIN, IFSC, Aadhaar. Anything specific to you is a policy written as a question.</p></div>
      <div className="sc"><b>Deployment</b><p>Your VPC or on-prem, one image. CUDA, Apple Metal or CPU, auto-selected. No outbound call to reach a verdict, so it runs air-gapped.</p></div>
      <div className="sc"><b>When no one is at the keyboard</b><p>Acknowledge degrades to mask, so an unattended app or agent still gets the work done without real values leaving.</p></div>
      </div>
      </div>
      </section>

      <section className="wrap sec side">
      <p className="eb">Questions</p>
      <div style={{"borderTop": "1px solid #0E1411"}}>
      <details open><summary>Where does the prompt go for a verdict?</summary><p>Nowhere. Every verdict is computed by a model inside your own network, and the gateway signs an attestation your security team can pull to check it.</p></details>
      <details><summary>We already own Microsoft Purview. Why this as well?</summary><p>Keep it. Purview covers Edge, Intune and Entra with allow-or-block; it has no redaction, no API path for apps and agents, and cannot scan files uploaded into prompts.</p></details>
      <details><summary>How would I know a control is still working in six months?</summary><p>Synthetic probes challenge every control daily, and “last challenged” is a column on the control board. State is computed from the ledger, never from a ticked box.</p></details>
      <details><summary>Does any of this need an internet connection?</summary><p>No. The enforcement path runs air-gapped; the only thing missing is the forward to a public provider.</p></details>
      </div>
      </section>
      </main>

      <section id="pilot" className="dk">
      <div className="wrap sec g2" style={{"alignItems": "start", "gap": 64}}>
      <div>
      <Mark size={34} tone="light" />
      <p className="eb" style={{"marginTop": 28}}>See it in your environment</p>
      <h2 className="h2x" style={{"marginTop": 14}}>See it catch a real prompt in week one.</h2>
      <p className="body" style={{"fontSize": 18, "margin": "20px 0 0"}}>A paid 8–12-week design-partner pilot — $15,000–$40,000 depending on scope. Your data, your environment, and a signed attestation that nothing else left.</p>
      <Link to="/pilot" style={{"display": "inline-block", "marginTop": 20, "color": "#F4F5F2", "fontWeight": "600"}}>Pilot terms →</Link>
      </div>
      <form style={{"background": "#F4F5F2", "color": "#0E1411", "borderRadius": 12, "padding": 32, "display": "flex", "flexDirection": "column", "gap": 18}}>
      <div className="g2" style={{"gap": 16}}><div><label htmlFor="rt3-email">Work email</label><input id="rt3-email" type="email" autocomplete="email" /></div><div><label htmlFor="rt3-co">Company</label><input id="rt3-co" type="text" autocomplete="organization" /></div></div>
      <div><label htmlFor="rt3-region">Region</label><select id="rt3-region"><option>Select region</option><option>India</option><option>Asia-Pacific</option><option>Middle East</option><option>Europe</option><option>Australia / New Zealand</option><option>North America</option></select></div>
      <div><label htmlFor="rt3-q">What AI traffic can’t you see today?</label><textarea id="rt3-q" rows="4" style={{"minHeight": 120, "resize": "vertical"}}></textarea></div>
      <button type="button" className="btnp">Request a pilot</button>
      <p style={{"fontSize": 13, "color": "#4A534E", "margin": "0"}}>Opens a pre-filled email. No backend, no mailing list, no tracking.</p>
      </form>
      </div>
      </section>
    </>
  )
}
