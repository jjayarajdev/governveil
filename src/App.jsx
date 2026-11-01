import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import GvLayout from './gv/GvLayout'
import HomeInterview from './gv/pages/HomeInterview'
import SecurityInterview from './gv/pages/SecurityInterview'
import ProductFlow from './gv/pages/ProductFlow'
import Journey from './gv/pages/Journey'
import Mcp from './gv/pages/Mcp'
import Platform from './gv/pages/Platform'
import Guard from './gv/pages/Guard'
import Features from './gv/pages/Features'
import Benchmark from './gv/pages/Benchmark'
import Pilot from './gv/pages/Pilot'
import About from './gv/pages/About'
import Learn from './pages/Learn'
import GTM from './pages/GTM'
import { isLearnHost } from './hostMode'

const TITLES = {
  '/': 'GovernVeil: self-hosted AI data-egress control and evidence',
  '/platform': 'GovernVeil — see it work',
  '/journey': 'Watch one request travel the gateway | GovernVeil',
  '/mcp': 'Governing an agent\u2019s tool calls | GovernVeil',
  '/guard': 'Runtime security | GovernVeil',
  '/product': 'How GovernVeil works',
  '/security': 'Security & residency | GovernVeil',
  '/features': 'GovernVeil features',
  '/benchmark': 'The GovernVeil detection benchmark',
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

  return (
    <GvLayout>
      <Routes>
        {/* The interview set IS the site. These are the canonical paths. */}
        <Route path="/" element={<HomeInterview />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/mcp" element={<Mcp />} />
        <Route path="/guard" element={<Guard />} />
        <Route path="/product" element={<ProductFlow />} />
        <Route path="/security" element={<SecurityInterview />} />

        {/* Carried over unchanged — the interview set has no equivalent. */}
        <Route path="/features" element={<Features />} />
        <Route path="/benchmark" element={<Benchmark />} />
        <Route path="/pilot" element={<Pilot />} />
        <Route path="/about" element={<About />} />

        {/* The preview paths these were shown at for weeks. Kept as aliases
            rather than removed: links to them are already out in the world,
            and a shared URL that 404s or silently lands somewhere else is
            worse than a duplicate. */}
        <Route path="/interview" element={<HomeInterview />} />
        <Route path="/interview/platform" element={<Platform />} />
        <Route path="/interview/journey" element={<Journey />} />
        <Route path="/interview/mcp" element={<Mcp />} />
        <Route path="/interview/guard" element={<Guard />} />
        <Route path="/interview/product" element={<ProductFlow />} />
        <Route path="/interview/security" element={<SecurityInterview />} />
        <Route path="/v2" element={<HomeInterview />} />
        <Route path="/v2/platform" element={<Platform />} />
        <Route path="/v2/journey" element={<Journey />} />
        <Route path="/v2/mcp" element={<Mcp />} />
        <Route path="/v2/guard" element={<Guard />} />
        <Route path="/v2/product" element={<ProductFlow />} />
        <Route path="/v2/security" element={<SecurityInterview />} />

        <Route path="*" element={<HomeInterview />} />
      </Routes>
    </GvLayout>
  )
}
