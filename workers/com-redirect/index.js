// governveil.com and www.governveil.com → governveil.com.au
// Paths that exist on the AU site are kept; .com-only pages land on the closest AU page.
const AU = 'https://governveil.com.au'
const SAME = new Set(['/', '/platform', '/security', '/benchmark', '/pilot', '/about'])
const MAP = { '/product': '/platform', '/guard': '/runtime', '/mcp': '/agents' }

export default {
  fetch(request) {
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/+$/, '') || '/'
    const target = SAME.has(path) ? path : (MAP[path] || '/')
    return Response.redirect(AU + target + url.search, 301)
  },
}
