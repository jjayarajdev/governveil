import { Link } from 'react-router-dom'
import { Mark } from './Logo'

/* About — iteration 3, ported from site/about.html.

   Markup is the design's, converted mechanically: class -> className, style
   strings -> objects, internal .html hrefs -> <Link to> on the routes already
   public, <pre> newlines made explicit. */

export default function AboutV3() {
  return (
    <>
      <main id="main">
      <section className="wrap" style={{"paddingTop": 96, "paddingBottom": 80}}>
      <p className="q">Q · Who builds this, and why should we trust them?</p>
      <h1 className="h1x" style={{"maxWidth": 1100}}>Evidence-first, by conviction<span style={{"color": "var(--acc)"}}>.</span></h1>
      <div className="g2" style={{"marginTop": 40, "alignItems": "start"}}>
      <p style={{"fontSize": 24, "lineHeight": "1.35", "fontWeight": "600", "letterSpacing": "-0.01em", "margin": "0"}}>Enterprises are told to choose: let AI in and lose sight of the data, or block it and watch people route around you.</p>
      <p className="lead" style={{"margin": "0"}}>GovernVeil is the AI-governance platform from Syntegreti, the AI consulting and platform company in Hyderabad, India. We build AI data-egress control and evidence for regulated enterprises — BFSI, healthcare and life sciences, global capability centres, and any organisation whose data cannot leave its perimeter for a verdict.</p>
      </div>
      </section>

      <section className="dk">
      <div className="wrap sec">
      <p className="eb">What we hold ourselves to</p>
      <div className="g3" style={{"marginTop": 32}}>
      <div className="val"><b>Prove it<span style={{"color": "var(--acc)"}}>.</span></b><p>Every claim on this site has a number, a mechanism or a re-runnable harness behind it. The benchmark is public, with the corpora and the runner committed, and we probe our own controls daily.</p></div>
      <div className="val"><b>Keep it in<span style={{"color": "var(--acc)"}}>.</span></b><p>The product runs where your data lives. No vendor cloud in the verdict path — signed, not asserted — which is why it works air-gapped and learns from your traffic without your data moving.</p></div>
      <div className="val"><b>Ship it<span style={{"color": "var(--acc)"}}>.</span></b><p>Everything described here is running in the product today. Where a capability is off until you turn it on — reversible masking — it carries an opt-in label.</p></div>
      </div>
      <div style={{"borderTop": "1px solid #2A332E", "marginTop": 88, "paddingTop": 56}}>
      <p className="eb" style={{"marginBottom": 20}}>The standard</p>
      <p className="xl" style={{"margin": "0", "fontSize": 96, "lineHeight": "0.98", "fontWeight": "800", "letterSpacing": "-0.045em", "color": "#F4F5F2"}}>Claims are cheap.<br /><span style={{"color": "var(--acc)"}}>Evidence is the product.</span></p>
      </div>
      </div>
      </section>

      <section className="wrap sec">
      <div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "end", "gap": 24, "marginBottom": 40}}>
      <div><p className="eb">The team</p><h2 className="h2x" style={{"marginTop": 14, "maxWidth": 720}}>Small team. Architects who also write the code.</h2></div>
      <a href="https://syntegreti.com/" style={{"fontWeight": "600"}}>Syntegreti ↗</a>
      </div>
      {/* The team cards are removed, not filled. Four real people —
          names, roles, credentials and photographs are not mine to
          invent, and a wall of [PHOTO] placeholders is worse than no
          section. Restore from site/about.html once there is copy. */}

      </section>

      <section className="alt">
      <div className="wrap sec g2" style={{"alignItems": "start", "gap": 64}}>
      <div>
      <p className="q">Q · Is GovernVeil a standalone product?</p>
      <h2 className="h2x">One spine that governs how an enterprise adopts AI.</h2>
      <p className="body" style={{"margin": "18px 0 14px"}}>Syntegreti ships flagship platforms for contracts and business operations, and underneath them one spine that governs how an enterprise adopts AI. GovernVeil is the govern layer of that spine.</p>
      <p className="body" style={{"margin": "0"}}>A working result in your environment in weeks, not quarters — which is why the pilot is eight to twelve weeks rather than two quarters.</p>
      </div>
      <div style={{"display": "flex", "flexDirection": "column", "gap": 8}}>
      <div className="sp"><i>OPERATE</i><span>Round-the-clock operations on what ships</span></div>
      <div className="sp"><i>BUILD</i><span>Platforms and AI-assisted delivery on the governed spine</span></div>
      <div className="sp" style={{"background": "#0E1411", "borderColor": "#0E1411", "color": "#F4F5F2"}}><i style={{"color": "var(--acc)"}}>GOVERN</i><span>GovernVeil — policy, masking and evidence on every AI action</span></div>
      </div>
      </div>
      </section>

      <section className="wrap sec side">
      <p className="eb">Questions</p>
      <div style={{"borderTop": "1px solid #0E1411"}}>
      <details open><summary>Where are you based?</summary><p>Hyderabad, India. The product itself runs in your own environment, wherever that is.</p></details>
      <details><summary>Who should I talk to?</summary><p>Write to <a href="mailto:contact@syntegreti.com">contact@syntegreti.com</a>, or request a pilot below. We reply within two business days.</p></details>
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
      <div className="g2" style={{"gap": 16}}><div><label htmlFor="ab3-email">Work email</label><input id="ab3-email" type="email" autocomplete="email" /></div><div><label htmlFor="ab3-co">Company</label><input id="ab3-co" type="text" autocomplete="organization" /></div></div>
      <div><label htmlFor="ab3-region">Region</label><select id="ab3-region"><option>Select region</option><option>India</option><option>Asia-Pacific</option><option>Middle East</option><option>Europe</option><option>Australia / New Zealand</option><option>North America</option></select></div>
      <div><label htmlFor="ab3-q">What AI traffic can’t you see today?</label><textarea id="ab3-q" rows="4" style={{"minHeight": 120, "resize": "vertical"}}></textarea></div>
      <button type="button" className="btnp">Request a pilot</button>
      <p style={{"fontSize": 13, "color": "#4A534E", "margin": "0"}}>Opens a pre-filled email. No backend, no mailing list, no tracking.</p>
      </form>
      </div>
      </section>
    </>
  )
}
