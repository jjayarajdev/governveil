import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppAU from './AppAU'
/* The SAME stylesheet governveil.com uses. That is what makes the type
   scale identical rather than a second copy that drifts; the AU-only shell
   rules live in gv-au-shell.css. */
import './gv-v3.css'
import './gv-au-shell.css'

/* No antd and no site.css here: the Learn and GTM pages are .com only, so the
   AU bundle carries the design system and nothing else. */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppAU />
    </BrowserRouter>
  </React.StrictMode>,
)
