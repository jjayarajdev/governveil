import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import App from './App'
import './site.css'
/* The old design system is archived with the pages that used it — its
   stylesheets are no longer imported, so none of it ships. The files stay on
   disk and in git history. */
import './gv-v3.css'
import './gv-v3-shell.css'

const theme = {
  token: {
    colorPrimary: '#1677ff',
    colorInfo: '#1677ff',
    colorTextBase: '#201e1d',
    colorLink: '#1677ff',
    borderRadius: 2,
    fontSize: 15,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  components: {
    Layout: {
      headerBg: 'rgba(243,242,242,0.92)',
      bodyBg: '#f3f2f2',
      footerBg: '#201e1d',
    },
    Menu: {
      horizontalItemSelectedColor: '#1677ff',
      activeBarHeight: 2,
    },
    Card: {
      paddingLG: 28,
    },
    Button: {
      fontWeight: 700,
      primaryShadow: 'none',
      defaultBorderColor: '#201e1d',
      defaultColor: '#201e1d',
    },
  },
}

/* Clean URLs. HashRouter was the original choice; Cloudflare Pages serves
   index.html for every path (verified: /platform, /benchmark and an unknown
   path all return the app bundle), so the fragment buys nothing and costs
   indexing — Google reads /#/platform as the same URL as /.

   Every link shared while the site was on HashRouter carries one, so a
   legacy `#/path` is rewritten to `/path` BEFORE React mounts. Doing it here
   rather than in a component means the router never sees the hash and no
   extra history entry is pushed. The redirect map in App.jsx then handles
   /v3, /interview and the rest on top of this. */
{
  const { hash, pathname, search } = window.location
  if (hash.startsWith('#/')) {
    const target = hash.slice(1) || '/'
    if (pathname === '/' || pathname === '') {
      window.history.replaceState(null, '', target + search)
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
