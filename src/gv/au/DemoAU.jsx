import { useEffect, useRef, useState } from 'react'
import { useNoIndex, hit } from './unlisted'

/* /demo — reached only by scanning the card. Unlisted: not in the nav, the
   mega-menu, the footer or any page, noindex while UNLISTED is true, and
   disallowed in robots.txt. Because nothing links here, every view is a scan.

   Four tiles, 2x2. Each one has to read as a video at a glance and from
   arm's length at a stand — so each carries a real still from its own film,
   a play badge and a duration, and the whole tile is the target rather than
   a link buried in it.

   The GPT film is the recorded one and opens in a player over the page.
   The other three are still illustrations and open in a new tab; swap each
   `kind` to 'video' as its film lands and it moves to the player with no
   other change. */

const TILES = [
  { id: 'gpt', film: 'gpt', n: '01', s: 'A person, in a browser',
    t: 'A prompt, governed', m: '1:28',
    d: 'A tax file number pasted into a public assistant — caught, masked and signed before it reaches the provider.' },
  { id: 'applications', kind: 'page', n: '02', s: 'Your applications',
    t: 'One line, then eight steps', m: '1:47',
    d: 'A base-URL change, and the eight steps every request then descends.' },
  { id: 'apis', film: 'api', n: '03', s: 'Your enterprise APIs',
    t: 'An API call, governed', m: '1:29',
    d: 'A claims API behind the gateway: scope checked, unknown callers denied by default, the reply masked on the way back.' },
  { id: 'agents', kind: 'page', n: '04', s: 'Your agents',
    t: 'Agent tool calls, governed', m: '1:52',
    d: 'An agent judged three times — at discovery, before the call, and before it reads the result.' },
]

function PlayBadge() {
  return (
    <span aria-hidden="true" style={{
      position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
      width: 74, height: 74, borderRadius: '50%', background: 'rgba(14,20,17,.82)',
      display: 'grid', placeItems: 'center', boxShadow: '0 6px 26px rgba(14,20,17,.3)',
    }}>
      <svg width="26" height="30" viewBox="0 0 26 30" fill="#F4F5F2" aria-hidden="true">
        <path d="M25 15 0 30V0z" />
      </svg>
    </span>
  )
}

export default function DemoAU() {
  const [open, setOpen] = useState(null)   // the film id, or null
  const [muted, setMuted] = useState(false)
  const v = useRef(null)
  const done = useRef(false)
  const [portrait] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-aspect-ratio: 1/1)').matches)

  useEffect(() => useNoIndex(), [])
  useEffect(() => { hit('view') }, [])

  // Escape closes the player, and the page behind it must not scroll
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null) }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open])

  /* Browsers block autoplay with sound, so a tile press would otherwise open
     a stopped player and ask for a second press. Try with sound; if that is
     refused, play muted and offer the sound back. The film carries on-screen
     captions, so muted still reads. */
  useEffect(() => {
    if (!open) return
    const el = v.current
    if (!el) return
    el.muted = false
    el.play().catch(() => {
      el.muted = true
      setMuted(true)
      el.play().catch(() => {})
    })
  }, [open])

  // "finished" means watched, not merely started
  const onTime = () => {
    const el = v.current
    if (el && !done.current && el.duration && el.currentTime / el.duration > 0.9) {
      done.current = true
      hit('finish', 'gpt')
    }
  }

  const src = open ? `/demo/${open}-${portrait ? 'mobile' : 'desktop'}.mp4` : null

  return (
    <main id="main">
      <section className="wrap" style={{ paddingTop: 64, paddingBottom: 36 }}>
        <p className="q">Scanned from a card · welcome</p>
        <h1 className="h1x" style={{ maxWidth: 1060 }}>
          Trace a prompt, live<span style={{ color: 'var(--acc)' }}>.</span>
        </h1>
        <p className="lead" style={{ maxWidth: 800, marginTop: 20 }}>
          Four surfaces, one engine, one ledger. Pick the one that looks like your
          estate and watch a real request travel it — allowed, masked or blocked,
          and signed before the reply.
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 88 }}>
        <div className="g2" style={{ gap: 24 }}>
          {TILES.map((x) => {
            const isVideo = !!x.film
            const inner = (
              <>
                <span style={{ position: 'relative', display: 'block', borderRadius: 14, overflow: 'hidden', background: '#EBEDE8' }}>
                  <img src={`/demo/tile-${x.id}.jpg`} alt="" loading="lazy"
                       style={{ display: 'block', width: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }} />
                  <PlayBadge />
                  <span className="mono" style={{
                    position: 'absolute', right: 12, bottom: 12, fontSize: 13,
                    background: 'rgba(14,20,17,.84)', color: '#F4F5F2',
                    padding: '4px 9px', borderRadius: 5,
                  }}>{x.m}</span>
                  {!isVideo && (
                    <span className="mono" style={{
                      position: 'absolute', left: 12, top: 12, fontSize: 12, letterSpacing: '.06em',
                      background: 'rgba(244,245,242,.94)', color: '#4A534E',
                      padding: '4px 9px', borderRadius: 5,
                    }}>ILLUSTRATION</span>
                  )}
                </span>
                <span className="mono" style={{ fontSize: 12, letterSpacing: '.1em', color: 'var(--acc)', marginTop: 18, display: 'block' }}>
                  {x.n} · {x.s.toUpperCase()}
                </span>
                <b style={{ fontSize: 25, letterSpacing: '-.02em', display: 'block', marginTop: 8 }}>{x.t}</b>
                <span style={{ fontSize: 16.5, lineHeight: 1.5, color: '#4A534E', display: 'block', marginTop: 8 }}>{x.d}</span>
                <span className="mono" style={{ fontSize: 13, color: '#0E1411', display: 'block', marginTop: 14, fontWeight: 600 }}>
                  {isVideo ? 'Play the film →' : 'Play the walk-through →'}
                </span>
              </>
            )
            const style = {
              display: 'block', textDecoration: 'none', color: 'inherit', textAlign: 'left',
              background: '#FFFFFF', border: '1px solid #D3D8D3', borderRadius: 18,
              padding: 16, font: 'inherit', cursor: 'pointer', width: '100%',
            }
            return isVideo ? (
              <button key={x.id} type="button" style={style}
                      onClick={() => { hit('play', x.id); done.current = false; setOpen(x.film) }}>{inner}</button>
            ) : (
              <a key={x.id} href={`/demo/${x.id}`} target="_blank" rel="noopener" style={style}
                 onClick={() => hit('play', x.id)}>{inner}</a>
            )
          })}
        </div>

        <p className="mono" style={{ fontSize: 13, color: '#4A534E', marginTop: 26 }}>
          Two recorded films and two illustrations of the governed path. The remaining
          two films are in production and drop into the same tiles.
        </p>
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

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Demonstration"
             onClick={(e) => { if (e.target === e.currentTarget) setOpen(null) }}
             style={{
               position: 'fixed', inset: 0, background: 'rgba(14,20,17,.93)', zIndex: 40,
               display: 'grid', placeItems: 'center', padding: 24,
             }}>
          <button type="button" onClick={() => setOpen(null)} aria-label="Close"
                  style={{
                    position: 'absolute', top: 18, right: 22, font: 'inherit', fontSize: 15,
                    color: '#F4F5F2', background: 'transparent', border: '1px solid #4A534E',
                    borderRadius: 999, padding: '8px 16px', cursor: 'pointer',
                  }}>Close ✕</button>
          {muted && (
            <button type="button"
                    onClick={() => { const el = v.current; if (el) { el.muted = false; setMuted(false) } }}
                    style={{
                      position: 'absolute', top: 18, left: 22, font: 'inherit', fontSize: 15,
                      fontWeight: 600, color: '#0E1411', background: 'var(--acc)', border: 0,
                      borderRadius: 999, padding: '9px 18px', cursor: 'pointer', zIndex: 1,
                    }}>Tap for sound</button>
          )}
          <video ref={v} controls playsInline onTimeUpdate={onTime}
                 style={{
                   width: '100%', maxWidth: portrait ? 460 : 1320, maxHeight: '86vh',
                   borderRadius: 14, background: '#000', display: 'block',
                 }}>
            <source src={src} type="video/mp4" />
          </video>
        </div>
      )}
    </main>
  )
}
