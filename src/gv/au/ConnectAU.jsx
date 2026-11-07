import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNoIndex, hit } from './unlisted'

/* /connect — the other side of the card, "Free AI governance health check."
   Unlisted on the same terms as /demo.

   WHAT THIS PAGE DOES NOT DO: invent the offer. The health check appears on
   the card and nowhere else, so the three "what you get" lines below are
   drawn strictly from what the product already does and the site already
   claims — nothing about duration, price or scope is asserted, because
   nobody has told me those. Replace the bracketed line once Bijal has set
   them; everything else can stay. */

export default function ConnectAU() {
  useEffect(() => useNoIndex(), [])
  useEffect(() => { hit('view') }, [])

  return (
    <main id="main">
      <section className="wrap" style={{ paddingTop: 72, paddingBottom: 56 }}>
        <p className="q">Scanned from a card · welcome</p>
        <div className="pair">
          <h1 className="h1x">
            A free AI governance health check<span style={{ color: 'var(--acc)' }}>.</span>
          </h1>
          <div>
            <p className="lead" style={{ margin: 0 }}>
              A short, free conversation about what your people are already sending to
              AI, what you could show a regulator today, and where the gap is. No
              deployment, no procurement, no obligation.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="g3" style={{ gap: 20 }}>
          {[
            ['WHAT WE LOOK AT', 'Which AI surfaces your organisation already has open — applications, agents, enterprise APIs and the assistants your people use in a browser.'],
            ['WHAT YOU GET', 'A plain read on where evidence exists today and where it does not, mapped against APRA CPS 234, CPS 230, the Privacy Act and the ISM.'],
            ['WHAT IT COSTS', 'Nothing. If it turns into a pilot, that is a separate conversation with its own terms — and the first three of those are free too.'],
          ].map(([k, v]) => (
            <div key={k} style={{ background: '#FFFFFF', border: '1px solid #D3D8D3', borderRadius: 16, padding: 32 }}>
              <p className="mono" style={{ fontSize: 12, letterSpacing: '.1em', color: 'var(--acc)', margin: 0 }}>{k}</p>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: '#2E3632', margin: '12px 0 0' }}>{v}</p>
            </div>
          ))}
        </div>
        <p className="body" style={{ margin: '20px 0 0', fontSize: 16 }}>
          {/* Feedback 2.10: the promise above now has a page behind it. */}
          <Link to="/frameworks" style={{ color: 'var(--acc)', fontWeight: 600 }}>
            See which obligations we support, and how →
          </Link>
        </p>
      </section>

      <section id="apply" className="dk">
        <div className="wrap sec g2" style={{ alignItems: 'start', gap: 64 }}>
          <div>
            <p className="eb">Book it</p>
            <h2 className="h2x" style={{ marginTop: 14 }}>
              Tell us what you cannot see today<span style={{ color: 'var(--acc)' }}>.</span>
            </h2>
            <p className="body" style={{ fontSize: 18, margin: '20px 0 0' }}>
              The last question is the one we read first. It goes to the founding team.
            </p>
            <p className="body" style={{ fontSize: 18, margin: '20px 0 0' }}>
              Or write to <a href="mailto:contact@governveil.com.au">contact@governveil.com.au</a>
            </p>
          </div>
          <form style={{ background: '#F4F5F2', color: '#0E1411', borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="g2" style={{ gap: 16 }}>
              <div><label htmlFor="cn-name">Name</label><input id="cn-name" type="text" autoComplete="name" /></div>
              <div><label htmlFor="cn-email">Work email</label><input id="cn-email" type="email" autoComplete="email" /></div>
            </div>
            <div><label htmlFor="cn-org">Organisation</label><input id="cn-org" type="text" autoComplete="organization" /></div>
            <div>
              <label htmlFor="cn-q">What AI use can’t you see today?</label>
              <textarea id="cn-q" rows="4" style={{ minHeight: 120, resize: 'vertical' }}></textarea>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <button type="button" className="btnp" onClick={() => hit('cta', 'health-check')}>
                Book the health check
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
