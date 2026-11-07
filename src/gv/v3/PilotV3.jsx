import { Mark } from './Logo'

/* Pilot — iteration 3, ported from site/pilot.html.

   Markup is the design's, converted mechanically: class -> className, style
   strings -> objects, internal .html hrefs -> <Link to> on the routes already
   public, <pre> newlines made explicit. */

export default function PilotV3() {
  return (
    <>
      <main id="main">
      <section className="wrap" style={{"paddingTop": 88, "paddingBottom": 72}}>
      <p className="q">Q · How do I start?</p>
      <h1 className="h1x" style={{"maxWidth": 1080}}>A surprising result in your environment, before you have to trust us<span style={{"color": "var(--acc)"}}>.</span></h1>
      <div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "end", "gap": 24, "marginTop": 32}}>
      <p className="lead" style={{"maxWidth": 760, "margin": "0"}}>A paid 8–12-week design-partner pilot. Week one: point one application at the gateway and watch it catch a real prompt before it leaves. Then pull the signed attestation and check that nothing else left either.</p>
      <a href="#request" style={{"background": "#0E1411", "color": "#F4F5F2", "padding": "0 22px", "minHeight": 52, "borderRadius": 6, "textDecoration": "none", "fontWeight": "700", "fontSize": 16, "display": "inline-flex", "alignItems": "center"}}>Request a pilot →</a>
      </div>
      <div className="g4" style={{"marginTop": 48}}>
      <div className="fact"><span className="rl">FEE</span><b>$15k–$40k</b></div>
      <div className="fact"><span className="rl">LENGTH</span><b>8–12 weeks</b></div>
      <div className="fact"><span className="rl">COHORT</span><b>3–5 slots</b></div>
      <div className="fact"><span className="rl">REPLY</span><b>2 business days</b></div>
      </div>
      </section>

      <section className="wrap" style={{"paddingBottom": 104}}>
      <p className="eb" style={{"marginBottom": 18}}>From first catch to audit-ready evidence</p>
      <div className="g3" style={{"gap": "0", "borderTop": "2px solid #0E1411"}}>
      <div className="ph"><em style={{"background": "var(--acc)", "borderColor": "var(--acc)"}}>WK 1</em><h2>First catch, live</h2><p>Point one application at the gateway, or install the extension for one team. Watch it replace a real value before the prompt leaves, and pull the signed no-egress attestation the same day.</p></div>
      <div className="ph"><em>WK 2–4</em><h2>Coverage expansion</h2><p>Register assets, models and agents with named owners. Run in detective mode to size the blast radius. Import a week of DNS or proxy telemetry for your real coverage number.</p></div>
      <div className="ph"><em>WK 5–12</em><h2>Evidence production</h2><p>Map your AI policy to controls, flip them to enforced, run the probes, and produce the gap assessment, attestations and drift report — plus the production architecture.</p></div>
      </div>
      </section>

      <section className="dk">
      <div className="wrap sec g2" style={{"alignItems": "start", "gap": 64}}>
      <div>
      <p className="q">Q · What are the terms?</p>
      <h2 className="h2x" style={{"marginBottom": 28}}>Plain terms, and a clear path to production.</h2>
      <div style={{"borderTop": "1px solid #E6ECE7"}}>
      <div className="kv"><span>SCOPE</span><span>Up to 5 governed assets and 500 users; one application surface plus the extension</span></div>
      <div className="kv"><span>CONVERSION</span><span>20 % off year one, 50 % of the fee credited, 10 % off permanently from year two</span></div>
      <div className="kv"><span>FINDINGS &amp; IP</span><span>Yours. We retain no rights to your data.</span></div>
      <div className="kv"><span>SUPPORT</span><span>Dedicated deployment support throughout</span></div>
      </div>
      </div>
      <div>
      <p className="q">Q · What do you need from us?</p>
      <h2 className="h2x" style={{"marginBottom": 28}}>Four things, and an owner.</h2>
      <ol style={{"margin": "0", "padding": "0", "listStyle": "none", "borderTop": "1px solid #E6ECE7"}}>
      <li className="need"><i>01</i><span>One application whose base URL you can change, or one team willing to install a managed extension.</span></li>
      <li className="need"><i>02</i><span>A GPU instance in your environment — one A10G-class box is the reference.</span></li>
      <li className="need"><i>03</i><span>A named owner who can schedule the integration call and chase a firewall change. The single best predictor of whether a pilot reaches a verdict.</span></li>
      <li className="need"><i>04</i><span>An honest answer to what you are worried about, so week one tests that.</span></li>
      </ol>
      <p className="body" style={{"fontSize": 16, "margin": "20px 0 0"}}>Three success criteria agreed in writing before we start, so at week twelve there is a yes or a no.</p>
      </div>
      </div>
      </section>

      <section id="request" className="wrap sec g2" style={{"alignItems": "start", "gap": 64}}>
      <div>
      <Mark size={34} tone="light" />
      <p className="eb" style={{"marginTop": 28}}>Request a pilot</p>
      <h2 className="h2x h2x-lg" style={{"marginTop": 14}}>Tell us what you can’t see today.</h2>
      <p className="lead" style={{"margin": "20px 0 0"}}>The last question is the one we actually read first.</p>
      <p className="body" style={{"fontSize": 15, "color": "#4A534E", "margin": "28px 0 0"}}>Opens a pre-filled email in your own client. No backend, no mailing list, no tracking. You can also write to <a href="mailto:contact@syntegreti.com">contact@syntegreti.com</a>.</p>
      </div>
      <form style={{"background": "#FFFFFF", "border": "1px solid #D3D8D3", "borderRadius": 12, "padding": 32, "display": "flex", "flexDirection": "column", "gap": 18}}>
      <div className="g2" style={{"gap": 16}}><div><label htmlFor="pl3-name">Name</label><input id="pl3-name" type="text" autocomplete="name" /></div><div><label htmlFor="pl3-email">Work email</label><input id="pl3-email" type="email" autocomplete="email" /></div></div>
      <div className="g2" style={{"gap": 16}}><div><label htmlFor="pl3-co">Company</label><input id="pl3-co" type="text" autocomplete="organization" /></div><div><label htmlFor="pl3-role">Role</label><select id="pl3-role"><option>Select role</option><option>CISO / security leadership</option><option>Security engineering</option><option>Risk &amp; compliance</option><option>AI / platform engineering</option><option>Other</option></select></div></div>
      <div className="g2" style={{"gap": 16}}><div><label htmlFor="pl3-size">Company size</label><select id="pl3-size"><option>Select size</option><option>Under 500</option><option>500–2,000</option><option>2,000–10,000</option><option>10,000+</option></select></div><div><label htmlFor="pl3-region">Region</label><select id="pl3-region"><option>Select region</option><option>India</option><option>Asia-Pacific</option><option>Middle East</option><option>Europe</option><option>Australia / New Zealand</option><option>North America</option></select></div></div>
      <div><label htmlFor="pl3-q">What AI traffic can’t you see today?</label><textarea id="pl3-q" rows="5" style={{"minHeight": 140, "resize": "vertical"}}></textarea></div>
      <button type="button" className="btnp">Request a pilot</button>
      </form>
      </section>

      <section className="alt">
      <div className="wrap sec side">
      <p className="eb">Questions</p>
      <div style={{"borderTop": "1px solid #0E1411"}}>
      <details open><summary>Why is the pilot paid?</summary><p>It funds dedicated deployment support and keeps the cohort to teams who will reach a verdict. Half the fee is credited if you convert.</p></details>
      <details><summary>What happens at week twelve?</summary><p>You measure against the three success criteria agreed before we started, and decide yes or no. Findings and IP are yours either way.</p></details>
      <details><summary>Do we need to send you any data?</summary><p>No. It runs in your environment, and the signed attestation shows that nothing left.</p></details>
      </div>
      </div>
      </section>
      </main>
    </>
  )
}
