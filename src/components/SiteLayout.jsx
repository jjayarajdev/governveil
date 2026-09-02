import { Layout, Menu, Button, Row, Col, Drawer, Grid } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { isLearnHost, MAIN_SITE } from '../hostMode'

const { Header, Content, Footer } = Layout

const NAV_ITEMS = [
  { key: '/product', label: 'Product' },
  { key: '/features', label: 'Features' },
  { key: '/about', label: 'About' },
]

const FOOTER_COLS = [
  {
    heading: 'Product',
    links: [
      ['Product', '/product'],
      ['Features', '/features'],
    ],
  },
  {
    heading: 'Evaluate',
    links: [['Pilot', '/pilot']],
  },
  {
    heading: 'Company',
    links: [['About', '/about']],
  },
]

function Brand({ learn }) {
  return (
    <Link className="brand" to="/">
      <img src="/assets/img/favicon.svg" alt="" />
      GovernVeil{learn && <span className="brand-sub">Learn</span>}
    </Link>
  )
}

export default function SiteLayout({ children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const screens = Grid.useBreakpoint()
  const learn = isLearnHost()

  const onNav = ({ key }) => {
    navigate(key)
    setOpen(false)
  }

  return (
    <Layout className="page-wrapper">
      <Header className="site-header">
        <div className="wrap header-inner">
          <Brand learn={learn} />
          {learn ? (
            <>
              <a className="learn-mainlink" href={`${MAIN_SITE}/`}>
                Main site ↗
              </a>
              <a className="header-cta" href={`${MAIN_SITE}/#/pilot`}>
                <Button type="primary">Book a pilot</Button>
              </a>
            </>
          ) : (
            <>
              <Menu
                className="header-menu"
                mode="horizontal"
                selectedKeys={[pathname]}
                items={NAV_ITEMS}
                onClick={onNav}
              />
              <Link to="/pilot" className="header-cta">
                <Button type="primary">Book a pilot</Button>
              </Link>
              <Button
                className="header-mobile-trigger"
                type="text"
                icon={<MenuOutlined />}
                aria-label="Menu"
                onClick={() => setOpen(true)}
              />
            </>
          )}
        </div>
      </Header>

      <Drawer
        title="GovernVeil"
        placement="right"
        open={open && !screens.lg}
        onClose={() => setOpen(false)}
        width={280}
      >
        <Menu
          mode="vertical"
          selectedKeys={[pathname]}
          items={[...NAV_ITEMS, { key: '/pilot', label: 'Book a pilot' }]}
          onClick={onNav}
          style={{ borderInlineEnd: 'none' }}
        />
      </Drawer>

      <Content>{children}</Content>

      <Footer className="site-footer ed-footer">
        <div className="wrap foot-row">
          <div className="foot-links">
            {FOOTER_COLS.flatMap((c) => c.links).map(([label, href]) =>
              learn ? (
                <a href={`${MAIN_SITE}/#${href}`} key={label}>{label}</a>
              ) : (
                <Link to={href} key={label}>{label}</Link>
              )
            )}
            <a href="https://syntegreti.com/">Syntegreti</a>
          </div>
          <span>Self-hosted. Your data never leaves your perimeter.</span>
        </div>
      </Footer>
    </Layout>
  )
}
