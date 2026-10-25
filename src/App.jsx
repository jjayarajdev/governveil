import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import GvLayout from './gv/GvLayout'
import Home from './gv/pages/Home'
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
