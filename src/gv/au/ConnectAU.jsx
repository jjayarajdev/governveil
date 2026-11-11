import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNoIndex, hit } from './unlisted'
import { ConcernsField, FollowUpField } from './EnquiryFields'

/* /connect — the other side of the card, "Free AI governance health check."
   Unlisted on the same terms as /demo.

   WHAT THIS PAGE DOES NOT DO: invent the offer. The health check appears on
   the card and nowhere else, so the three "what you get" lines below are
   drawn strictly from what the product already does and the site already
   claims — nothing about duration, price or scope is asserted, because
   nobody has told me those. Replace the bracketed line once Bijal has set
   them; everything else can stay.

   LAYOUT (2026-11-11): the form leads. Someone who scanned the card and is
   ready to book should not scroll past the explanation to do it; the three
   "what" blocks sit underneath for the visitor who wants to read first. */

export default function ConnectAU() {
  useEffect(() => useNoIndex(), [])
  useEffect(() => { hit('view') }, [])

  return (
    <main id="main" className="gvc">
      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 32 }}>
        <p className="q">Scanned from a card · welcome</p>
        {/* Smaller than the site's h1 on purpose: at full size this title runs
            to three lines and pushes the form below the first screen. */}
        <h1 className="h1x" style={{ maxWidth: 1000, fontSize: 'clamp(38px, 5.2vw, 68px)' }}>
          Book your AI data protection health check<span style={{ color: 'var(--acc)' }}>.</span>
        </h1>
        <p className="lead" style={{ maxWidth: 760, margin: '16px 0 0' }}>
          Discover how GovernVeil can help protect your organisation’s sensitive information
          before it reaches AI, enforce governance policies, and provide verifiable evidence
          of governance decisions.
        </p>
      </section>

      <section id="apply" className="wrap" style={{ paddingBottom: 88 }}>
        <form className="gvf gvf-lead" noValidate>
          <div className="g2" style={{ gap: 16 }}>
            <div>
              <label htmlFor="cn-name">Full name</label>
              <input id="cn-name" type="text" autoComplete="name" required placeholder="Enter your full name" />
            </div>
            <div>
              <label htmlFor="cn-email">Work email</label>
              <input id="cn-email" type="email" autoComplete="email" required placeholder="name@company.com" />
            </div>
          </div>
          <div>
            <label htmlFor="cn-org">Organisation</label>
            <input id="cn-org" type="text" autoComplete="organization" required placeholder="Enter your organisation’s name" />
          </div>
          <ConcernsField prefix="cn" />
          <FollowUpField prefix="cn" />
          <div className="gvf-actions">
            <button type="button" className="btnp" onClick={() => hit('cta', 'health-check')}>
              Book my AI data protection health check
            </button>
            <p className="gvf-note">
              It goes to the founding team. Or write to{' '}
              <a href="mailto:contact@governveil.com.au">contact@governveil.com.au</a>
            </p>
          </div>
        </form>
      </section>

      <section className="alt">
        <div className="wrap sec">
          <p className="lead" style={{ maxWidth: 820, margin: 0 }}>
            A short, free conversation about what your people are already sending to
            AI, what you could show a regulator today, and where the gap is. No
            deployment, no procurement, no obligation.
          </p>
          <div className="gvc-what">
            {[
              ['WHAT WE LOOK AT', 'Which AI surfaces your organisation already has open — applications, agents, enterprise APIs and the assistants your people use in a browser.'],
              ['WHAT YOU GET', 'A plain read on where evidence exists today and where it does not, mapped against APRA CPS 234, CPS 230, the Privacy Act and the ISM.'],
              ['WHAT IT COSTS', 'Nothing. If it turns into a pilot, that is a separate conversation with its own terms — and the first three of those are free too.'],
            ].map(([k, v]) => (
              <div key={k}>
                <h2 className="mono">{k}</h2>
                <p>{v}</p>
              </div>
            ))}
          </div>
          <p className="body" style={{ margin: '28px 0 0', fontSize: 16 }}>
            {/* Feedback 2.10: the promise above now has a page behind it. */}
            <Link to="/frameworks" style={{ color: 'var(--acc)', fontWeight: 600 }}>
              See which obligations we support, and how →
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
