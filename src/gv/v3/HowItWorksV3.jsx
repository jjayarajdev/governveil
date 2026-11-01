import { Link } from 'react-router-dom'
import { Mark } from './Logo'

/* How it works — iteration 3, ported from site/how-it-works.html.

   Markup is the design's, converted mechanically: class -> className, style
   strings -> objects, internal .html hrefs -> <Link to> on the routes already
   public, <pre> newlines made explicit. */

export default function HowItWorksV3() {
  return (
    <>
      <main id="main">
      <section className="wrap" style={{"paddingTop": 88, "paddingBottom": 56}}>
      <p className="q">Q · A request arrives. What happens to it?</p>
      <div className="g2" style={{"alignItems": "end"}}>
      <h1 className="h1x">Eight steps. The order is the guarantee<span style={{"color": "var(--acc)"}}>.</span></h1>
      <div>
      <p className="lead" style={{"margin": "0"}}>The data path fails closed at every step — an unreachable policy engine, a model-server timeout or an unscannable payload is a block, never a silent allow.</p>
      <div style={{"display": "flex", "flexWrap": "wrap", "gap": 12, "marginTop": 28}}><a href="#pilot" className="btnp">Book a pilot</a><Link to="/platform" className="btns">Platform overview</Link></div>
      </div>
      </div>
      </section>

      <section className="wrap" style={{"paddingBottom": 72}}>
      <p className="rl" style={{"margin": "0 0 14px"}}>TWO WAYS IN</p>
      <div className="g2" style={{"gap": 16}}>
      <div className="code"><div className="rl" style={{"color": "#9DA8A1", "marginBottom": 10}}>FOR APPS · ONE LINE</div>base_url = <span style={{"color": "#7FD6A4"}}>"https://&lt;your-gateway&gt;/v1"</span></div>
      <div className="code"><div className="rl" style={{"color": "#9DA8A1", "marginBottom": 10}}>FOR AGENTS · ONE PROCESS</div>MCP client → connector → <span style={{"color": "#7FD6A4"}}>/mcp/v1</span></div>
      </div>
      </section>

      <section className="wrap" style={{"paddingBottom": 104}}>
      <div className="track" role="list" aria-label="The eight steps">
      <div role="listitem"><i>01</i><b>Ingress</b></div>
      <div role="listitem"><i>02</i><b>Grant check</b></div>
      <div role="listitem"><i>03</i><b>Access plane</b></div>
      <div role="listitem"><i>04</i><b>Documents</b></div>
      <div role="listitem"><i>05</i><b>Detection</b></div>
      <div role="listitem"><i>06</i><b>Limits</b></div>
      <div role="listitem"><i>07</i><b>Verdict</b></div>
      <div role="listitem"><i>08</i><b>Sign → reply</b></div>
      </div>
      <div className="g4" style={{"marginTop": 40}}>
      <div className="sc"><i>01 · INGRESS</i><p>An app calls /v1/*, an enterprise API is called through /gw/&lt;app&gt;, an agent calls a tool through the connector, or the extension relays a prompt before it leaves the browser.</p><span className="tag">/v1 · /gw · /mcp · extension</span></div>
      <div className="sc"><i>02 · GRANT CHECK</i><p>A revoked grant is an instant 403, refused before inspection. A long-dormant grant that wakes raises an incident with a 14-day clock and optional auto-freeze.</p><span className="tag">~0.5 ms kill switch</span></div>
      <div className="sc"><i>03 · ACCESS PLANE</i><p>Role → scope → operation, checked before anything is forwarded. A viewer may read and not delete; the denial never leaves the perimeter and is still ledgered.</p><span className="tag">role → scope · 403 on deny</span></div>
      <div className="sc"><i>04 · DOCUMENTS</i><p>Embedded and uploaded files are parsed with provenance and swept for macros, PDF JavaScript, hidden and white text, hidden sheets and formulas. Every error path is quarantine.</p><span className="tag">control DS-05</span></div>
      <div className="sc"><i>05 · DETECTION</i><p>A sub-ms pattern path first — US and India PII, credentials, injection phrasing — then one local model answers every policy as a plain-language question in a single pass.</p><span className="tag">fast path → local model</span></div>
      <div className="sc"><i>06 · LIMITS</i><p>Tool allow-lists, hourly call and daily spend caps counted from the ledger. The model must be approved for the data classes still present after masking.</p><span className="tag">AG-11 · AG-12 · MD-01</span></div>
      <div className="sc"><i>07 · VERDICT</i><p>Exactly one outcome; the most restrictive wins. A masked value never leaves until its vault mapping is persisted — otherwise the gateway falls back to destructive redaction.</p><span className="tag">ALLOW · FLAG · MASK · ACK · BLOCK</span></div>
      <div className="sc" style={{"background": "#0E1411", "borderColor": "#0E1411"}}><i style={{"color": "var(--acc)"}}>08 · SIGN → REPLY</i><p style={{"color": "#C2CBC5"}}>The response runs the same ladder. Then the signed row is appended to the hash chain before the caller gets its reply.</p><span className="tag" style={{"color": "#9DA8A1", "borderColor": "#2A332E"}}>control RO-01 · signed before reply</span></div>
      </div>
      </section>

      <section className="dk">
      <div className="wrap sec pair" style={{"alignItems": "start"}}>
      <div>
      <p className="q">Q · How does step 05 decide?</p>
      <h2 className="h2x">Patterns first. One local model for the rest.</h2>
      <p className="body" style={{"margin": "16px 0 0"}}>Each policy is a yes/no question to one local model, answered in a single forward pass, with a companion model extracting PII spans for replacement. You tune detection by editing the question — not by retraining, and not by sending data to a vendor.</p>
      <p className="body" style={{"margin": "16px 0 0", "fontSize": 15, "color": "#9DA8A1"}}>A model-server error under strict validation is a block, never a skip. The classic multi-model stack stays available as a fallback.</p>
      </div>
      <div style={{"display": "flex", "flexDirection": "column", "gap": 10}}>
      <div style={{"border": "1px solid #2A332E", "borderRadius": 10, "padding": "18px 20px"}}><div className="mono" style={{"fontSize": 13, "fontWeight": "600", "color": "#F4F5F2"}}>fast path · sub-ms</div><div style={{"fontSize": 15, "color": "#C2CBC5", "marginTop": 6}}>keyword, regex and secrets — SSN, card, PAN, GSTIN, IFSC, Aadhaar, credentials — plus injection phrasing</div></div>
      <div style={{"border": "2px solid var(--acc)", "borderRadius": 10, "padding": "17px 19px"}}><div className="mono" style={{"fontSize": 13, "fontWeight": "600", "color": "#F4F5F2"}}>policy question · one pass</div><div style={{"fontSize": 15, "color": "#C2CBC5", "marginTop": 6}}>injection · PII · toxicity · business-critical · harmful intent · safety guard</div></div>
      <div style={{"border": "1px solid #2A332E", "borderRadius": 10, "padding": "18px 20px"}}><div className="mono" style={{"fontSize": 13, "fontWeight": "600", "color": "#F4F5F2"}}>NER</div><div style={{"fontSize": 15, "color": "#C2CBC5", "marginTop": 6}}>PII spans located for replacement</div></div>
      <div style={{"border": "1px solid #2A332E", "borderRadius": 10, "padding": "18px 20px"}}><div className="mono" style={{"fontSize": 13, "fontWeight": "600", "color": "#F4F5F2"}}>parser + sweep</div><div style={{"fontSize": 15, "color": "#C2CBC5", "marginTop": 6}}>macros, PDF JavaScript, hidden and white text, hidden sheets, formulas</div></div>
      </div>
      </div>
      </section>

      <section className="alt">
      <div className="wrap sec pair">
      <div>
      <p className="q">Q · How do you govern what you can’t name?</p>
      <h2 className="h2x">Four objects on one chain.</h2>
      <p className="body" style={{"margin": "16px 0 32px"}}>State is computed from the record rather than asserted.</p>
      <div className="g2" style={{"gap": "28px 36px"}}>
      <div className="ft"><b>assets</b><p>Applications, models and agents, each with a named business and technical owner.</p></div>
      <div className="ft"><b>controls</b><p>Sixteen across governance, privacy, security and ethics — enforced, detective or attested.</p></div>
      <div className="ft"><b>decisions</b><p>Approvals, exceptions, attestations, probe runs and drift reports, each with an expiry.</p></div>
      <div className="ft"><b>state</b><p>Holding · attempted-held · weak · breached · untested, computed over a window.</p></div>
      </div>
      </div>
      <aside className="card">
      <div className="rl">RECEIPT · CONTROL CATALOGUE</div>
      <div className="big">16</div>
      <div className="cap">controls seeded, each with the evidence source it is judged from</div>
      <div className="rf">PI-02 · INJ-01 · DS-05 · MD-01 · RO-01 · AC-07 · HL-09 · FAIR-01 …</div>
      </aside>
      </div>
      </section>

      <section className="wrap sec side">
      <p className="eb">What it takes to run</p>
      <div>
      <h2 className="h2x" style={{"marginBottom": 32}}>One image. One VM, or your cluster.</h2>
      <div className="g4">
      <div className="ft" style={{"borderTopWidth": 2}}><b>image</b><p>One Docker image for the gateway and model server; Compose or Helm.</p></div>
      <div className="ft" style={{"borderTopWidth": 2}}><b>reference box</b><p>One g5.2xlarge — A10G, ~6 GB of weights resident.</p></div>
      <div className="ft" style={{"borderTopWidth": 2}}><b>identity</b><p>OIDC or local auth, three enforced roles, aigw_ tokens tied to grants.</p></div>
      <div className="ft" style={{"borderTopWidth": 2}}><b>storage</b><p>TimescaleDB; Redis optional and skipped on a single-node pilot.</p></div>
      </div>
      <p className="body" style={{"color": "#4A534E", "margin": "28px 0 0"}}>One deployment governs one organisation, with its own database, keys and ledger. Nothing is shared across tenants because there are none.</p>
      </div>
      </section>

      <section className="alt">
      <div className="wrap sec side">
      <p className="eb">Questions</p>
      <div style={{"borderTop": "1px solid #0E1411"}}>
      <details open><summary>What does “fails closed” mean in practice?</summary><p>If any step cannot complete — the policy engine is unreachable, the model server times out, a document cannot be scanned — the request is blocked and the reason is written to the ledger.</p></details>
      <details><summary>Can I run controls without enforcing them?</summary><p>Yes. Controls in detective mode record “would have blocked” and let evaluation continue, so you can size the blast radius before you take it.</p></details>
      <details><summary>Are the model’s responses inspected too?</summary><p>Every response — JSON or stream, tool-call arguments included — runs the same ladder and the same chain before it reaches the caller.</p></details>
      </div>
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
      <div className="g2" style={{"gap": 16}}><div><label htmlFor="hw3-email">Work email</label><input id="hw3-email" type="email" autocomplete="email" /></div><div><label htmlFor="hw3-co">Company</label><input id="hw3-co" type="text" autocomplete="organization" /></div></div>
      <div><label htmlFor="hw3-region">Region</label><select id="hw3-region"><option>Select region</option><option>India</option><option>Asia-Pacific</option><option>Middle East</option><option>Europe</option><option>Australia / New Zealand</option><option>North America</option></select></div>
      <div><label htmlFor="hw3-q">What AI traffic can’t you see today?</label><textarea id="hw3-q" rows="4" style={{"minHeight": 120, "resize": "vertical"}}></textarea></div>
      <button type="button" className="btnp">Request a pilot</button>
      <p style={{"fontSize": 13, "color": "#4A534E", "margin": "0"}}>Opens a pre-filled email. No backend, no mailing list, no tracking.</p>
      </form>
      </div>
      </section>
    </>
  )
}
