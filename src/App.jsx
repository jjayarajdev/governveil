import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import GvLayout from './gv/GvLayout'
import Home from './gv/pages/Home'
import HomeInterview from './gv/pages/HomeInterview'
import SecurityInterview from './gv/pages/SecurityInterview'
import ProductFlow from './gv/pages/ProductFlow'
import Journey from './gv/pages/Journey'
import Mcp from './gv/pages/Mcp'
import Platform from './gv/pages/Platform'
import Product from './gv/pages/Product'
import Features from './gv/pages/Features'
import Benchmark from './gv/pages/Benchmark'
import Security from './gv/pages/Security'
import Pilot from './gv/pages/Pilot'
import About from './gv/pages/About'
import Learn from './pages/Learn'
import GTM from './pages/GTM'
import { isLearnHost } from './hostMode'

const TITLES = {
  '/': 'GovernVeil: self-hosted AI data-egress control and evidence',
  '/product': 'How GovernVeil works',
  '/features': 'GovernVeil features',
  '/benchmark': 'The GovernVeil detection benchmark',
  '/security': 'Security & residency | GovernVeil',
  '/learn': 'What is GovernVeil? AI data-egress control and evidence, explained',
  '/gtm': 'GovernVeil in 90 seconds — the explainer',
  '/pilot': 'Book a design-partner pilot | GovernVeil',
  '/about': 'About | GovernVeil',
  '/v2': 'GovernVeil: self-hosted AI data-egress control and evidence',
  '/v2/security': 'Security & residency | GovernVeil',
  '/v2/product': 'How GovernVeil works',
  '/v2/journey': 'Watch one request travel the gateway | GovernVeil',
  '/interview/journey': 'Watch one request travel the gateway | GovernVeil',
  '/v2/mcp': 'Governing an agent’s tool calls | GovernVeil',
  '/interview/mcp': 'Governing an agent’s tool calls | GovernVeil',
  '/platform': 'GovernVeil — see it work',
  '/interview/platform': 'GovernVeil — see it work',
  '/v2/platform': 'GovernVeil — see it work',
  '/interview': 'GovernVeil: self-hosted AI data-egress control and evidence',
  '/interview/security': 'Security & residency | GovernVeil',
  '/interview/product': 'How GovernVeil works',
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
        <Route path="/" element={<Home />} />
        {/* branch-only: the Conversational-FAQ recomposition, for comparison */}
        {/* branch-only: the recomposition. Shapes differ by page on purpose —
            Home and Security are interviews, Product is a narrative workflow. */}
        <Route path="/v2" element={<HomeInterview />} />
        <Route path="/v2/security" element={<SecurityInterview />} />
        <Route path="/v2/product" element={<ProductFlow />} />
        <Route path="/v2/journey" element={<Journey />} />
        <Route path="/interview/journey" element={<Journey />} />
        <Route path="/v2/mcp" element={<Mcp />} />
        <Route path="/interview/mcp" element={<Mcp />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/interview/platform" element={<Platform />} />
        <Route path="/v2/platform" element={<Platform />} />
        {/* the paths these were first shown at — a renamed preview URL that
            silently falls through to the old page is worse than no rename */}
        <Route path="/interview" element={<HomeInterview />} />
        <Route path="/interview/security" element={<SecurityInterview />} />
        <Route path="/interview/product" element={<ProductFlow />} />
        <Route path="/product" element={<Product />} />
        <Route path="/features" element={<Features />} />
        <Route path="/benchmark" element={<Benchmark />} />
        <Route path="/security" element={<Security />} />
        <Route path="/pilot" element={<Pilot />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </GvLayout>
  )
}
