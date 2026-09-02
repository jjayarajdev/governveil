import { chromium } from 'playwright-core'

const routes = ['/', '/product', '/features', '/pilot', '/about']
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const errors = []
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})
page.on('pageerror', (e) => errors.push(String(e)))

for (const r of routes) {
  await page.goto(`http://localhost:4173/#${r}`, { waitUntil: 'networkidle' })
  await page.evaluate(() =>
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in')),
  )
  await page.waitForTimeout(400)
  const name = r === '/' ? 'home' : r.slice(1)
  await page.screenshot({ path: `/tmp/gv-${name}.png`, fullPage: true })
  console.log(`snapped ${name}`)
}

console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
