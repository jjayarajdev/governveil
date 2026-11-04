import { useEffect, useRef, useState } from 'react'
import { useNoIndex, hit } from './unlisted'

/* /demo — reached only by scanning the card. Not in the nav, the mega-menu,
   the footer or any page; robots.txt disallows it and the page sets noindex
   while UNLISTED is true. Because nothing links here, every view is a scan.

   The film is the real asset. Two cuts were supplied, 16:9 and 9:16, and the
   right one is chosen ONCE at mount rather than on every resize — switching
   source mid-playback reloads the video and loses the viewer's place, which
   is worse than a slightly letterboxed frame after a device is rotated.

   It does not autoplay. The file carries narration, so a browser would block
   autoplay with sound anyway; and at a trade stand, audio that starts by
   itself is worse than a play button. preload="metadata" also means a phone
   on conference wifi fetches a few kilobytes, not twelve megabytes, until
   someone actually asks for it. */

const OTHERS = [
  { id: 'applications', n: '02', s: 'your applications', t: 'One line, then eight steps',
    d: 'A base-URL change, and the eight steps every request then descends.', m: '107 sec' },
  { id: 'apis', n: '03', s: 'your enterprise APIs', t: 'An API call, governed',
    d: 'Five callers on a claims API: two allowed, two masked, two refused.', m: '90 sec' },
  { id: 'agents', n: '04', s: 'your agents', t: 'Agent tool calls, governed',
    d: 'An agent judged three times — at discovery, before the call, and before it reads the result.', m: '110 sec' },
]

export default function DemoAU() {
  const v = useRef(null)
  const done = useRef(false)
  // portrait phones get the 9:16 cut; decided once, see the note above
  const [portrait] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-aspect-ratio: 1/1)').matches)

  useEffect(() => useNoIndex(), [])
  useEffect(() => { hit('view') }, [])

  /* "finished" means watched to the end, not merely started */
  useEffect(() => {
    const el = v.current
    if (!el) return undefined
    const onTime = () => {
      if (!done.current && el.duration && el.currentTime / el.duration > 0.9) {
        done.current = true
        hit('finish', 'gpt')
      }
    }
    el.addEventListener('timeupdate', onTime)
    return () => el.removeEventListener('timeupdate', onTime)
  }, [])

  const src = portrait ? '/demo/gpt-mobile.mp4' : '/demo/gpt-desktop.mp4'
  const poster = portrait ? '/demo/poster-9x16.jpg' : '/demo/poster-16x9.jpg'

  return (
    <main id="main">
      <section className="wrap" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <p className="q">Scanned from a card · welcome</p>
        <h1 className="h1x" style={{ maxWidth: 1080 }}>
          Trace a prompt, live<span style={{ color: 'var(--acc)' }}>.</span>
        </h1>
        <p className="lead" style={{ maxWidth: 780, marginTop: 20 }}>
          One prompt, typed into a public assistant, carrying a tax file number and a
          Medicare number. Watch it get caught, masked and signed — decided inside the
          network, before anything reaches the provider.
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 56 }}>
        <video
          ref={v}
          controls
          playsInline
          preload="metadata"
          poster={poster}
          onPlay={() => hit('play', 'gpt')}
          style={{
            width: '100%', maxWidth: portrait ? 520 : '100%', display: 'block',
            margin: '0 auto', borderRadius: 16, background: '#0E1411',
            aspectRatio: portrait ? '9 / 16' : '16 / 9',
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser cannot play this video.
          {' '}<a href={src}>Download it instead</a>.
        </video>
        <p className="mono" style={{ fontSize: 13, color: '#4A534E', marginTop: 16, textAlign: 'center' }}>
          1 min 28 sec · has narration · the on-screen captions carry it without sound
        </p>
      </section>

      <section className="alt">
        <div className="wrap sec">
          <p className="eb">The other three surfaces</p>
          <h2 className="h2x" style={{ marginTop: 12, marginBottom: 10 }}>
            The same engine, three more ways in<span style={{ color: 'var(--acc)' }}>.</span>
          </h2>
          <p className="body" style={{ margin: '0 0 36px', maxWidth: 760 }}>
            That was a person in a browser. Your applications, your enterprise APIs and
            your agents reach the same engine and land on the same ledger.
          </p>

          <div className="g3" style={{ gap: 20 }}>
            {OTHERS.map(({ id, n, s, t, d, m }) => (
              <a key={id} href={`/demo/${id}`} onClick={() => hit('play', id)}
                 style={{ display: 'flex', flexDirection: 'column', gap: 10, textDecoration: 'none',
                          background: '#FFFFFF', border: '1px solid #D3D8D3', borderRadius: 16, padding: 28 }}>
                <span className="mono" style={{ fontSize: 12, letterSpacing: '.1em', color: 'var(--acc)' }}>
                  {n} · {s.toUpperCase()}
                </span>
                <b style={{ fontSize: 23, letterSpacing: '-.02em' }}>{t}</b>
                <span style={{ fontSize: 16, lineHeight: 1.5, color: '#4A534E' }}>{d}</span>
                <span className="mono" style={{ fontSize: 13, color: '#4A534E', marginTop: 'auto', paddingTop: 12 }}>
                  {m} · plays in your browser →
                </span>
              </a>
            ))}
          </div>
          <p className="mono" style={{ fontSize: 13, color: '#4A534E', marginTop: 24 }}>
            Those three are illustrations of the governed path, not recordings.
          </p>
        </div>
      </section>

      <section className="dk">
        <div className="wrap sec">
          <div className="pair">
            <h2 className="h2x">Want to see it do this to your own traffic?</h2>
            <div>
              <p className="body" style={{ margin: 0, color: '#C2CBC5' }}>
                Five weeks, in your environment, against your real AI use. Free for the
                first three regulated Australian organisations — paid after that.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
                <a href="/pilot" className="btnp" onClick={() => hit('cta', 'pilot')}>How the pilot works</a>
                <a href="/connect" className="btns" onClick={() => hit('cta', 'connect')}
                   style={{ color: '#F4F5F2', borderColor: '#4A534E' }}>Book a health check</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
