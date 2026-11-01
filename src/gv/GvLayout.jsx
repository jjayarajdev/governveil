import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { readVariant, storeVariant } from './variant'
import { readRegion } from '../region'
import { REGION_CONTENT } from './regions'

const FOOTER = [
  ['Product', [
    ['How it works', '/product'],
    ['Features', '/features'],
  ]],
  ['Proof', [
    ['Benchmark', '/benchmark'],
    ['Security & residency', '/security'],
  ]],
]

export function Brand({ to = '/' }) {
  return (
    <Link className="brand" to={to}>
      <span className="brand-mark"><span /></span>
      <span className="brand-name">Govern<i>Veil</i></span>
    </Link>
  )
}

const SUN_RAYS = [
  [12, 2, 12, 4], [12, 20, 12, 22], [4.9, 4.9, 6.3, 6.3], [17.7, 17.7, 19.1, 19.1],
  [2, 12, 4, 12], [20, 12, 22, 12], [4.9, 19.1, 6.3, 17.7], [17.7, 6.3, 19.1, 4.9],
]

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
    >
      {name === 'moon' ? (
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      ) : (
        <>
          <circle cx="12" cy="12" r="4.2" />
          {SUN_RAYS.map(([x1, y1, x2, y2]) => (
            <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </>
      )}
    </svg>
  )
}

/* Light and dark are the two design variants the site shipped with. They were
   labelled A and B while they were candidates on the review board; to a visitor
   that reads as nothing, so the control is a plain theme toggle. It shows the
   theme you would be switching to, which is what the label promises. */
function Themer({ variant, onChange }) {
  const next = variant === 'dark' ? 'light' : 'dark'
  const label = `Switch to ${next} theme`
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => onChange(next)}
      aria-label={label}
      title={label}
    >
      <Icon name={next === 'dark' ? 'moon' : 'sun'} />
    </button>
  )
}

export default function GvLayout({ children }) {
  const [variant, setVariant] = useState(readVariant)
  const { nav, ctaLabel, entity } = REGION_CONTENT[readRegion()]
  const { pathname } = useLocation()

  /* Branch-only. Inside the preview the nav becomes the experience's own —
     the demonstrations are the point, and routing a visitor back to the
     marketing pages on the first click is how the recomposition looked like it
     had vanished the last time. */
  const previewRoot = ['/v2', '/interview'].find(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  )
  const inPreview = Boolean(previewRoot)
  const PREVIEW_NAV = [
    ['/platform', 'Overview'],
    ['/journey', 'The request'],
    ['/mcp', 'Agents'],
    ['/guard', 'Runtime security'],
    ['/product', 'How it works'],
    ['/security', 'Security'],
    ['', 'The questions'],
  ]
  const navItems = inPreview
    ? PREVIEW_NAV.map(([to, label]) => [`${previewRoot}${to}`, label])
    : nav

  // The tokens live on <html data-gv>, so the page ground and any overscroll
  // match. The attribute is removed on unmount, which is what keeps the antd
  // Learn and GTM pages out of this stylesheet entirely.
  useEffect(() => {
    document.documentElement.setAttribute('data-gv', variant)
    // local A/B only: ?design=almanac flips to the Hallmark restyle so the two
    // can be compared without a rebuild. Not a shipping feature.
    const design = /[?&]design=([a-z-]+)/.exec(window.location.search + window.location.hash)
    if (design) document.documentElement.setAttribute('data-design', design[1])
    else document.documentElement.removeAttribute('data-design')
    return () => {
      document.documentElement.removeAttribute('data-gv')
      document.documentElement.removeAttribute('data-design')
    }
  }, [variant])

  const choose = (v) => {
    setVariant(v)
    storeVariant(v)
  }

  return (
    <div className="gv">
      <a className="skip" href="#main">Skip to content</a>

      <header className="nav">
        <div className="nav-in">
          <Brand to={inPreview ? `${previewRoot}/platform` : '/'} />
          <nav className="nav-links" aria-label="Primary">
            {/* NavLink sets aria-current="page" itself; the nav styling hangs
                off that rather than off a class. */}
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} end>{label}</NavLink>
            ))}
          </nav>
          <div className="nav-end">
            <Themer variant={variant} onChange={choose} />
            <Link className="btn btn-primary btn-sm" to="/pilot">{ctaLabel}</Link>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-in">
            <div>
              <Brand />
              <p className="small dim" style={{ maxWidth: '34ch' }}>
                Self-hosted AI data-egress control and evidence. Your prompts never
                leave your perimeter for a verdict.
              </p>
            </div>
            {FOOTER.map(([heading, links]) => (
              <div key={heading}>
                <h4>{heading}</h4>
                <ul>
                  {links.map(([label, to]) => (
                    <li key={to}><Link to={to}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/pilot">Design-partner pilot</Link></li>
                {entity.parent && (
                  <li><a href={entity.parent[1]} rel="noopener">{entity.parent[0]}</a></li>
                )}
                <li><a href={`mailto:${entity.email}`}>{entity.email}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-base">
            <span>{entity.copyright}</span>
            <span>{entity.tagline}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
