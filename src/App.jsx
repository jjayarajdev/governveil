import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import Home from './pages/Home'
import Product from './pages/Product'
import Features from './pages/Features'
import Pilot from './pages/Pilot'
import About from './pages/About'

const TITLES = {
  '/': 'GovernVeil: self-hosted AI data-egress control and evidence',
  '/product': 'How GovernVeil works',
  '/features': 'GovernVeil features',
  '/pilot': 'Book a design-partner pilot | GovernVeil',
  '/about': 'About | GovernVeil',
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = TITLES[pathname] || TITLES['/']
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pilot" element={<Pilot />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </SiteLayout>
  )
}
