import { useEffect } from 'react'
import { useNoIndex, hit } from './unlisted'

/* /demo — reached only by scanning the card. Not in the nav, the mega-menu,
   the footer or any page; robots.txt disallows it and the page sets noindex
   while UNLISTED is true. Because nothing links here, every view is a scan.

   The recorded product demo goes in the slot at the top. Until it exists the
   page leads with the four surface walk-throughs, so a scan at the booth
   lands on something to watch rather than a holding page. */

const DEMOS = [
  { id: 'people',       n: '01', t: 'A prompt, governed',
    s: 'chatgpt.com', d: 'A tax file number pasted into a public assistant, masked before it leaves the browser.', m: '90 sec' },
  { id: 'applications', n: '02', t: 'One line, then eight steps',
    s: 'your applications', d: 'A base-URL change, and the eight steps every request then descends.', m: '107 sec' },
  { id: 'apis',         n: '03', t: 'An API call, governed',
    s: 'your enterprise APIs', d: 'Five callers on a claims API: two allowed, two masked, two refused.', m: '90 sec' },
  { id: 'agents',       n: '04', t: 'Agent tool calls, governed',
    s: 'your agents', d: 'An agent judged three times — at discovery, before the call, and before it reads the result.', m: '110 sec' },
]

export default function DemoAU() {
  useEffect(() => useNoIndex(), [])
  useEffect(() => { hit('view') }, [])

  return (
    <main id="main">
      <section className="wrap" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <p className="q">Scanned from a card · welcome</p>
        <h1 className="h1x" style={{ maxWidth: 1100 }}>
          Trace a prompt, live<span style={{ color: 'var(--acc)' }}>.</span>
        </h1>
        <p className="lead" style={{ maxWidth: 820, marginTop: 24 }}>
          Four surfaces, one engine, one ledger. Pick the one that looks like your
          estate and watch a real request travel it — allowed, masked or blocked,
          and signed before the reply.
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 96 }}>
        <div className="g2" style={{ gap: 20 }}>
          {DEMOS.map(({ id, n, t, s, d, m }) => (
            <a
              key={id}
              href={`/demo/${id}`}
              onClick={() => hit('play', id)}
              style={{
                display: 'flex', flexDirection: 'column', gap: 10, textDecoration: 'none',
                background: '#FFFFFF', border: '1px solid #D3D8D3', borderRadius: 16,
                padding: 32,
              }}
            >
              <span className="mono" style={{ fontSize: 12, letterSpacing: '.1em', color: 'var(--acc)' }}>
                {n} · {s.toUpperCase()}
              </span>
              <b style={{ fontSize: 26, letterSpacing: '-.02em' }}>{t}</b>
              <span style={{ fontSize: 17, lineHeight: 1.5, color: '#4A534E' }}>{d}</span>
              <span className="mono" style={{ fontSize: 13, color: '#4A534E', marginTop: 'auto', paddingTop: 14 }}>
                {m} · plays in your browser →
              </span>
            </a>
          ))}
        </div>

        <p className="mono" style={{ fontSize: 13, color: '#4A534E', marginTop: 28 }}>
          These are illustrations of the governed path, not screen recordings. The
          recorded run of the product itself goes here next.
        </p>
      </section>

      <section className="alt">
        <div className="wrap sec">
          <div className="pair">
            <h2 className="h2x">Want to see it do this to your own traffic?</h2>
            <div>
              <p className="body" style={{ margin: 0 }}>
                Five weeks, in your environment, against your real AI use. Free for
                the first three regulated Australian organisations — paid after that.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
                <a href="/pilot" className="btnp" onClick={() => hit('cta', 'pilot')}>
                  How the pilot works
                </a>
                <a href="/connect" className="btns" onClick={() => hit('cta', 'connect')}>
                  Book a health check
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
