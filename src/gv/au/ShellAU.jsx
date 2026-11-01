import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Mark, Wordmark } from '../v3/Logo'

/* The governveil.com.au shell: early-access bar, header with the Product
   mega-menu, footer. One component instead of the nine copies the static
   hand-off carries — the only structural liberty taken with the design.

   The AU routes keep the design's own file names, unlike the .com port: no
   .com.au URL has been shared yet, so there is nothing to stay compatible
   with and /how-it-works beats /product as a path.

   "Book a call" is an on-page anchor, not a route: every AU page carries its
   own #apply section, which is why the design wrote it that way. */

const MEGA = [
  ['Govern · in your network', [
    ['/how-it-works', 'How it works', 'policy-to-proof loop · eight steps'],
    ['/agents', 'Agent tool calls', '/mcp/v1/* · judged three times'],
    ['/runtime', 'Runtime security', 'prompts · responses · Australian identifiers'],
  ]],
  ['Prove · to your board and APRA', [
    ['/security', 'Security & residency', 'signed attestation · assurance roadmap'],
    ['/benchmark', 'Benchmark & probes', 're-run it yourself · challenged daily'],
    ['/partners', 'Design partners', 'free · 4–6 weeks · 3–5 places'],
  ]],
]

const NAV = [
  ['/platform', 'Platform'],
  ['/benchmark', 'Benchmark'],
  ['/security', 'Security'],
  ['/about', 'About'],
  ['/partners', 'Design partners'],
]

/* Each design page sets its own .h1x, .h2x and .pair — 54px on home, 72 on
   runtime. Those rules are scoped to `.v3.p-<page>` in gv-au.css, so the root
   has to carry the page's key or every page inherits whichever came last. */
const PAGE_KEY = {
  '/': 'home', '/platform': 'platform', '/how-it-works': 'howitworks',
  '/agents': 'agents', '/runtime': 'runtime', '/security': 'security',
  '/benchmark': 'benchmark', '/partners': 'partners', '/about': 'about',
}

export default function ShellAU({ children }) {
  const [mega, setMega] = useState(false)
  const { pathname } = useLocation()
  const wrap = useRef(null)

  useEffect(() => setMega(false), [pathname])
  useEffect(() => {
    if (!mega) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setMega(false) }
    const onDown = (e) => { if (!wrap.current?.contains(e.target)) setMega(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [mega])

  return (
    <div className={`v3 au p-${PAGE_KEY[pathname] || 'home'}`}>
      <a className="skip" href="#main">Skip to content</a>

      <Link className="announce" to="/partners">
        <span className="mono announce-tag">EARLY ACCESS</span>
        Design-partner window now open: 3 to 5 places for regulated Australian
        organisations. <span style={{ textDecoration: 'underline' }}>Apply →</span>
      </Link>

      <header className="hd" ref={wrap}>
        <div className="wrap hd-in">
          <Link className="logo" to="/" aria-label="GovernVeil Australia — home">
            <Mark size={30} />
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="nav-links">
            <button
              type="button"
              className={`navbtn${mega ? ' on' : ''}`}
              aria-expanded={mega}
              aria-controls="mega"
              onClick={() => setMega((v) => !v)}
            >
              Product
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"
                fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2.5 4.5 6 8l3.5-3.5" />
              </svg>
            </button>
            {NAV.map(([to, label]) => (
              <NavLink key={to} to={to} end>{label}</NavLink>
            ))}
          </nav>

          <a className="hd-cta" href="#apply">Book a call</a>
        </div>

        <div hidden={!mega}>
          <div id="mega" className="mega mega-p">
            <div className="wrap g3" style={{ paddingTop: 32, paddingBottom: 32, gap: 40 }}>
              {MEGA.map(([heading, items]) => (
                <div key={heading}>
                  <p className="eb" style={{ fontSize: 11, marginBottom: 14 }}>{heading}</p>
                  {items.map(([to, title, sub]) => (
                    <Link to={to} key={to}><b>{title}</b><span>{sub}</span></Link>
                  ))}
                </div>
              ))}
              <Link to="/platform" className="mega-card">
                <span className="eb" style={{ fontSize: 11, color: '#9DA8A1' }}>Platform overview</span>
                <b style={{ fontSize: 22, lineHeight: 1.25 }}>
                  Four surfaces, one engine, one ledger — in your Australian region.
                </b>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--acc)' }}>
                  See the architecture →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="dk foot" style={{ borderTop: '1px solid #2A332E', color: '#C2CBC5' }}>
        <div className="wrap g4" style={{ paddingTop: 48, paddingBottom: 32, fontSize: 14, gap: 24 }}>
          <div>
            <div className="logo">
              <Mark size={30} tone="light" />
              <Wordmark />
            </div>
            <p style={{ margin: '10px 0 18px', lineHeight: 1.5 }}>
              Australian-owned. Self-hosted. Your data never leaves your perimeter.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <span className="badge">AUSTRALIAN-OWNED</span>
              <span className="badge">IP HELD IN AUSTRALIA</span>
              <span className="badge">SELF-HOSTED</span>
            </div>
          </div>

          {[
            ['Govern', [['/how-it-works', 'How it works'], ['/agents', 'Agent tool calls'],
              ['/runtime', 'Runtime security'], ['/platform', 'Platform overview']]],
            ['Prove', [['/security', 'Security & residency'], ['/benchmark', 'Benchmark'],
              ['/partners', 'Design partners'], ['/about', 'About']]],
          ].map(([heading, links]) => (
            <div key={heading} className="foot-col">
              <span className="eb" style={{ fontSize: 11 }}>{heading}</span>
              {links.map(([to, label]) => <Link to={to} key={to}>{label}</Link>)}
            </div>
          ))}

          <div className="foot-col">
            <span className="eb" style={{ fontSize: 11 }}>Contact</span>
            <a href="mailto:contact@governveil.com.au">contact@governveil.com.au</a>
            <a href="#privacy">Privacy policy</a>
            <a href="https://claude.ai/new?q=Summarise%20what%20governveil.com.au%20does">
              Summarise with Claude ↗
            </a>
            <a href="https://governveil.com/">Outside Australia? governveil.com ↗</a>
          </div>
        </div>

        {/* Acknowledgement of Country, as the design supplies it. */}
        <div className="wrap foot-ack">
          GovernVeil acknowledges the Gadigal people of the Eora Nation, the
          Traditional Custodians of the land on which we work in Sydney, and
          pays respect to Elders past and present.
        </div>

        <div className="wrap mono foot-legal">
          <span>© 2026 GovernVeil Pty Ltd · ABN 94 703 419 194</span>
          <span>Deployments in your own Australian region, e.g. ap-southeast-2 (Sydney)</span>
        </div>
      </footer>
    </div>
  )
}
