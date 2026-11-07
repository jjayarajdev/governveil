import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Mark, Wordmark } from '../v3/Logo'
import { wireForms } from '../../formWire'

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
    ['/frameworks', 'Frameworks', 'CPS 234 · ISM · Privacy Act · ISO 42001'],
    ['/pilot', 'Pilot', 'five weeks · in your environment'],
  ]],
]

const NAV = [
  ['/platform', 'Platform'],
  ['/benchmark', 'Benchmark'],
  ['/security', 'Security'],
  ['/about', 'About'],
  ['/pilot', 'Pilot'],
]

/* The key stamped on the root selects the page's type scale out of
   gv-v3.css, which both sites share. The AU ROUTES keep their own names
   (/how-it-works, not /product) because they are live and read better, so
   the route and the key differ — that mapping is the whole point of this
   table. */
const PAGE_KEY = {
  '/': 'home', '/platform': 'platform', '/how-it-works': 'product',
  '/agents': 'mcp', '/runtime': 'guard', '/security': 'security',
  '/benchmark': 'benchmark', '/pilot': 'pilot', '/about': 'about',
  /* /frameworks borrows the security scope: same tables, same type scale. */
  '/frameworks': 'security',
}

export default function ShellAU({ children }) {
  const [mega, setMega] = useState(false)
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()
  const wrap = useRef(null)
  const page = useRef(null)

  useEffect(() => { setMega(false); setMenu(false) }, [pathname])

  /* The design's forms are inert markup; this is what makes them submit.
     Delegated from the root so it covers every form on every route without
     the generated page files having to know about it. */
  useEffect(() => wireForms(page.current), [])
  useEffect(() => {
    if (!mega && !menu) return undefined
    const close = () => { setMega(false); setMenu(false) }
    const onKey = (e) => { if (e.key === 'Escape') close() }
    const onDown = (e) => { if (!wrap.current?.contains(e.target)) close() }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [mega, menu])

  return (
    <div className={`v3 au p-${PAGE_KEY[pathname] || 'home'}`} ref={page}>
      <a className="skip" href="#main">Skip to content</a>

      <Link className="announce" to="/pilot">
        <span className="mono announce-tag">LAUNCH OFFER</span>
        The first three pilots are free for Australian organisations.{' '}
        <span style={{ textDecoration: 'underline' }}>How the pilot works →</span>
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

          {/* One ask, everywhere: the printed card, the LinkedIn post and this
              button all promise the same free health check, and all land on
              /connect. Requesting a pilot is the quieter second link. */}
          <Link className="hd-cta" to="/connect">Book a free health check</Link>

          <button
            type="button"
            className={`navtoggle${menu ? ' on' : ''}`}
            aria-expanded={menu}
            aria-controls="mobilenav"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            onClick={() => { setMenu((v) => !v); setMega(false) }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menu
                ? <><path d="M5 5l12 12" /><path d="M17 5L5 17" /></>
                : <><path d="M3 6h16" /><path d="M3 11h16" /><path d="M3 16h16" /></>}
            </svg>
          </button>
        </div>

        {/* The phone menu. Below 900px the wrapped nav cost 198px of header
            before a word of the page; this is the same links behind one
            44px target. */}
        <nav id="mobilenav" className="mobilenav" aria-label="Primary" hidden={!menu}>
          <div className="wrap">
            <Link className="mobilenav-cta" to="/connect">Book a free health check</Link>
            {NAV.map(([to, label]) => (
              <NavLink key={to} to={to} end>{label}</NavLink>
            ))}
            {/* The row nav and the Product menu overlap on /pilot; on one
                phone list the same link twice reads as a mistake. */}
            {MEGA.map(([heading, items]) => {
              const rest = items.filter(([to]) => !NAV.some(([n]) => n === to))
              return rest.length === 0 ? null : (
                <div key={heading}>
                  <p className="eb mobilenav-h">{heading}</p>
                  {rest.map(([to, title]) => (
                    <NavLink key={to} to={to} end>{title}</NavLink>
                  ))}
                </div>
              )
            })}
          </div>
        </nav>

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
              ['/pilot', 'Pilot'], ['/about', 'About']]],
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
