import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import App from './App'
import './site.css'

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
