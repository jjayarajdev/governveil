import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Mark, Wordmark } from './Logo'
import { wireForms } from '../../formWire'

/* The iteration-3 shell: announcement bar, header with the Product mega-menu,
   footer. One component instead of the nine copies the static hand-off
   carries, which is the only structural liberty taken with the design.

   PATHS. The design's files are index/platform/how-it-works/agents/runtime/
   trust/benchmark/pilot/about. The labels are adopted verbatim, but the
   ROUTES keep the paths already public — /product, /mcp, /guard, /security —
   so nothing shared in the last week 404s. "Trust" is the label for
   /security; it is a better word and it costs nothing to use it. */

const MEGA = [
  ['Govern · in your network', [
    ['/product', 'How it works', 'eight steps · /v1 · /gw'],
    ['/mcp', 'Agent tool calls', '/mcp/v1/* · judged three times'],
    ['/guard', 'Runtime security', 'prompts · responses · extension'],
  ]],
  ['Prove · to your auditor', [
    ['/security', 'Trust & residency', 'attestation · ledger · controls'],
    ['/benchmark', 'Benchmark', 'combined-1000 · re-runnable'],
    ['/platform', 'Platform overview', 'the whole shape, one page'],
  ]],
  ['Start', [
    ['/pilot', 'Book a pilot', '8–12 weeks · 3–5 slots'],
    ['/about', 'About', 'who builds it, and why'],
  ]],
]

const NAV = [
  ['/platform', 'Platform'],
  ['/benchmark', 'Benchmark'],
  ['/security', 'Trust'],
  ['/about', 'About'],
]

/* Each design page sets its own .h1x, .h2x and .pair — the hero sizes differ
   by page on purpose (96px on home, 72 on pilot, 120 on runtime). Those rules
   are scoped to `.v3.p-<page>` in the stylesheet, so the root has to carry the
   page's key or every page inherits whichever definition came last. */
const PAGE_KEY = {
  '/': 'home', '/platform': 'platform', '/product': 'product', '/mcp': 'mcp',
  '/guard': 'guard', '/security': 'security', '/benchmark': 'benchmark',
  '/pilot': 'pilot', '/about': 'about',
}

export default function Shell({ children }) {
  const [mega, setMega] = useState(false)
  const { pathname } = useLocation()
  const wrap = useRef(null)
  const page = useRef(null)

  // the menu closes on navigation, on Escape, and on a click outside it
  useEffect(() => setMega(false), [pathname])

  /* The design's forms are inert markup; this is what makes them submit.
     Delegated from the root so it covers every form on every route without
     the generated page files having to know about it. */
  useEffect(() => wireForms(page.current), [])
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
    <div className={`v3 p-${PAGE_KEY[pathname] || 'home'}`} ref={page}>
      <a className="skip" href="#main">Skip to content</a>

      {/* The published miss. Real: DOC-ACCURACY-REPORT.md row of 2026-09-23 —
          a desktop app sent a system prompt first, and user messages carrying
          a PAN, an Aadhaar and an AWS key were forwarded as `allow` while the
          same values in a one-message request blocked. Found live, fixed. */}
      <Link className="announce" to="/benchmark#miss">
        <span className="mono announce-tag">PUBLISHED</span>
        A miss we found by governing a real desktop app — and fixed the same day.{' '}
        <span style={{ textDecoration: 'underline' }}>Read it →</span>
      </Link>

      <header className="hd" ref={wrap}>
        <div className="wrap hd-in">
          <Link className="logo" to="/" aria-label="GovernVeil — home">
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

          <Link className="hd-cta" to="/pilot">Book a pilot</Link>
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
            </div>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="foot">
        <div className="wrap" style={{ paddingTop: 56, paddingBottom: 40 }}>
          <div className="g4" style={{ gap: 32 }}>
            <div>
              <div className="logo">
                <Mark size={30} tone="light" />
                <Wordmark />
              </div>
              <p className="mono" style={{ fontSize: 12, color: '#9DA8A1', marginTop: 14, lineHeight: 1.6 }}>
                Self-hosted AI data-egress<br />control and evidence.
              </p>
            </div>
            {[
              ['Product', [['/product', 'How it works'], ['/mcp', 'Agents'],
                ['/guard', 'Runtime security'], ['/platform', 'Platform']]],
              ['Proof', [['/benchmark', 'Benchmark'], ['/security', 'Trust & residency']]],
              ['Company', [['/about', 'About'], ['/pilot', 'Book a pilot']]],
            ].map(([heading, links]) => (
              <div key={heading}>
                <p className="eb" style={{ color: '#9DA8A1', marginBottom: 14 }}>{heading}</p>
                <ul>
                  {links.map(([to, label]) => (
                    <li key={to}><Link to={to}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mono" style={{ fontSize: 12, color: '#9DA8A1', marginTop: 48 }}>
            © 2026 GovernVeil · from Syntegreti, Hyderabad
          </p>
        </div>
      </footer>
    </div>
  )
}
