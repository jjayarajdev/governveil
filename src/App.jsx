import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import Home from './pages/Home'
import Product from './pages/Product'
import Features from './pages/Features'
import Learn from './pages/Learn'
import GTM from './pages/GTM'
import Pilot from './pages/Pilot'
import About from './pages/About'
import { isLearnHost } from './hostMode'

const TITLES = {
  '/': 'GovernVeil: self-hosted AI data-egress control and evidence',
  '/product': 'How GovernVeil works',
  '/features': 'GovernVeil features',
  '/learn': 'What is GovernVeil? AI governance, explained',
  '/gtm': 'GovernVeil in 90 seconds — the explainer',
  '/pilot': 'Book a design-partner pilot | GovernVeil',
  '/about': 'About | GovernVeil',
}

export default function App() {
  const { pathname } = useLocation()
  const learn = isLearnHost()

  useEffect(() => {
    document.title =
      learn && pathname === '/' ? TITLES['/learn'] : TITLES[pathname] || TITLES['/']
    window.scrollTo(0, 0)
  }, [pathname, learn])

  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={learn ? <Learn /> : <Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/features" element={<Features />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/gtm" element={<GTM />} />
        <Route path="/pilot" element={<Pilot />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={learn ? <Learn /> : <Home />} />
      </Routes>
    </SiteLayout>
  )
}
