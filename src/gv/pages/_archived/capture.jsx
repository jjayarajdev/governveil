/* A framed product capture.

   Wraps the existing <Shot> sources — every file under
   public/assets/img/product/web/ is a screenshot of the running console, not
   a mock-up — in a window chrome, because the frame is what says "this is an
   application" rather than "this is a picture".

   `where` is the console route the capture was taken on. It goes in the
   chrome's address slot, so a reader can tell which page they are looking at
   without the caption having to carry it. */

/* `crop` zooms into the part of the console that carries the point.

   A 1100px console scaled into a ~470px column renders its text at about
   five pixels — it reads as grey noise, which is worse than no image. So a
   capture declares the region worth showing: `scale` is how much bigger than
   the frame the image is drawn, `x`/`y` shift it (percentages of the image),
   and `h` fixes the frame height so the crop is stable at every width.
   Without `crop` the whole capture is shown, which is right when the shape
   of the page is the point rather than the rows. */
export function Capture({
  src, alt, where, width = 1100, height = 688, x2 = true, bleed = false,
  crop = null, children,
}) {
  const base = `/assets/img/product/web/${src}`
  const cropStyle = crop
    ? { width: `${crop.scale * 100}%`, maxWidth: 'none',
        transform: `translate(${crop.x || 0}%, ${crop.y || 0}%)` }
    : undefined
  return (
    <figure className={`cap${bleed ? ' cap-bleed' : ''}${crop ? ' cap-crop' : ''}`}>
      <div className="cap-frame">
        <div className="cap-bar">
          <span className="cap-dot" /><span className="cap-dot" /><span className="cap-dot" />
          <span className="cap-where">{where}</span>
        </div>
        <div className="cap-win" style={crop ? { height: crop.h || 320 } : undefined}>
        <img
          style={cropStyle}
          src={`${base}.webp`}
          srcSet={x2 ? `${base}.webp ${width}w, ${base}@2x.webp ${width * 2}w` : undefined}
          sizes={x2 ? '(max-width: 980px) 100vw, 640px' : undefined}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
        </div>
      </div>
      {children && <figcaption>{children}</figcaption>}
    </figure>
  )
}

/* A measured value, drawn. `pct` is what fills the track; `value` is what the
   reader sees. Both come from the caller, so nothing is computed into a claim
   here — the page supplies numbers that trace to a committed run. */
export function Bars({ rows }) {
  return (
    <div className="bars">
      {rows.map(([k, value, pct, low]) => (
        <div className={`bar-row${low ? ' is-low' : ''}`} key={k}>
          <span className="bar-k">{k}</span>
          <span className="bar-v">{value}</span>
          <span className="bar-t"><span className="bar-f" style={{ width: `${pct}%` }} /></span>
        </div>
      ))}
    </div>
  )
}
