import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import HomeV3 from './gv/v3/Home'
import ShellV3 from './gv/v3/Shell'
import PlatformV3 from './gv/v3/PlatformV3'
import HowItWorksV3 from './gv/v3/HowItWorksV3'
import AgentsV3 from './gv/v3/AgentsV3'
import RuntimeV3 from './gv/v3/RuntimeV3'
import TrustV3 from './gv/v3/TrustV3'
import BenchmarkV3 from './gv/v3/BenchmarkV3'
import PilotV3 from './gv/v3/PilotV3'
import AboutV3 from './gv/v3/AboutV3'
import Learn from './pages/Learn'
import GTM from './pages/GTM'
import { isLearnHost } from './hostMode'


/* Paths that were public before iteration 3 became the site. Kept as
   redirects, not as duplicate routes: a link shared in the last few weeks
   should land where it meant to. */
const LEGACY = {
  '/v3': '/', '/interview': '/', '/v2': '/',
  ...Object.fromEntries(['platform', 'product', 'mcp', 'guard', 'security',
    'benchmark', 'pilot', 'about'].flatMap((r) => [
      [`/v3/${r}`, `/${r}`], [`/interview/${r}`, `/${r}`], [`/v2/${r}`, `/${r}`],
    ])),
  // no iteration-3 equivalent; nearest page that covers the ground
  '/features': '/product',
  '/journey': '/product',
  '/interview/journey': '/product',
  '/v2/journey': '/product',
  '/compare': '/benchmark',
}

const TITLES = {
  '/': 'GovernVeil — the evidence layer for enterprise AI',
  '/platform': 'Platform | GovernVeil',
  '/product': 'How it works | GovernVeil',
  '/mcp': 'Agents | GovernVeil',
  '/guard': 'Runtime security | GovernVeil',
  '/security': 'Trust & residency | GovernVeil',
  '/benchmark': 'Benchmark | GovernVeil',
  '/pilot': 'Book a design-partner pilot | GovernVeil',
  '/about': 'About | GovernVeil',
  '/learn': 'What is GovernVeil? AI data-egress control and evidence, explained',
  '/gtm': 'GovernVeil in 90 seconds — the explainer',
}

/* The old preview paths resolve to the same titles as their canonical ones. */
for (const p of ['/interview', '/v2']) {
  TITLES[p] = TITLES['/']
  for (const r of ['platform', 'journey', 'mcp', 'guard', 'product', 'security']) {
    TITLES[`${p}/${r}`] = TITLES[`/${r}`]
  }
}

// Pricing and Compare are deliberately unrouted — see src/gv/pages/Pricing.jsx
// and Compare.jsx, which stay on disk unimported (so Vite ships neither) until
// they are put back. /pricing and /compare fall through to Home via the * route.
//
// The two antd pages. Everything else — including an unmatched path, which
// falls through to Home — is a revamp page and gets the GvLayout chrome.
const ANTD_ROUTES = ['/learn', '/gtm']

export default function App() {
  const { pathname } = useLocation()
  const learn = isLearnHost()

  useEffect(() => {
    document.title =
      learn && pathname === '/' ? TITLES['/learn'] : TITLES[pathname] || TITLES['/']
    window.scrollTo(0, 0)
  }, [pathname, learn])

  // learn.governveil.com keeps its own antd chrome throughout.
  if (learn) {
    return (
      <SiteLayout>
        <Routes>
          <Route path="/gtm" element={<GTM />} />
          <Route path="*" element={<Learn />} />
        </Routes>
      </SiteLayout>
    )
  }

  /* Iteration 3 renders its own shell and its own design system. It must
     NOT go inside GvLayout: that brings the old nav and footer, the `.gv`
     tokens, and the lattice pseudo-elements, which paint over it. */
  if (ANTD_ROUTES.includes(pathname)) {
    return (
      <SiteLayout>
        <Routes>
          <Route path="/learn" element={<Learn />} />
          <Route path="/gtm" element={<GTM />} />
        </Routes>
      </SiteLayout>
    )
  }

  /* The iteration-3 design IS the site. Everything renders in its own shell;
     GvLayout and the `.gv` stylesheets are no longer on any route. */
  return (
    <ShellV3>
      <Routes>
        <Route path="/" element={<HomeV3 />} />
        <Route path="/platform" element={<PlatformV3 />} />
        <Route path="/product" element={<HowItWorksV3 />} />
        <Route path="/mcp" element={<AgentsV3 />} />
        <Route path="/guard" element={<RuntimeV3 />} />
        <Route path="/security" element={<TrustV3 />} />
        <Route path="/benchmark" element={<BenchmarkV3 />} />
        <Route path="/pilot" element={<PilotV3 />} />
        <Route path="/about" element={<AboutV3 />} />

        {/* Paths that were public before the swap. A shared link should land
            where it meant to, not on the home page, so these redirect rather
            than fall through to the catch-all. /features and /journey have no
            iteration-3 equivalent and go to the nearest page that does. */}
        {Object.entries(LEGACY).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}

        <Route path="*" element={<HomeV3 />} />
      </Routes>
    </ShellV3>
  )
}
