import { Link } from 'react-router-dom'

/* The pieces of shape 06 · Conversational FAQ, shared by every page that takes
   the interview form. A page supplies the questions; the arc is the acts. */

export function Act({ n, title, children }) {
  return (
    <>
      <div className="act">
        <div className="wrap act-in">
          <span className="act-n">{n}</span>
          <h2 className="act-t">{title}</h2>
        </div>
      </div>
      {children}
    </>
  )
}

export function Pair({ q, children, more, link }) {
  return (
    <section className="qa">
      <div className="wrap qa-in">
        <h3 className="qa-q">{q}</h3>
        <div className="qa-a">
          {children}
          {more && (
            <details className="qa-more">
              <summary>The mechanism</summary>
              <div className="qa-more-body">{more}</div>
            </details>
          )}
          {link && <p><Link className="link" to={link[1]}>{link[0]}</Link></p>}
        </div>
      </div>
    </section>
  )
}

/* The opening: the page's premise as a question, answered in a word or a line,
   with the proof directly under it. */
export function Opening({ q, answer, children }) {
  return (
    <section className="qa qa-hero">
      <div className="wrap qa-in">
        <h1 className="qa-q qa-q-lead">{q}</h1>
        <div className="qa-a">
          {answer && <p className="qa-answer">{answer}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}

/* A read-down list of term and gloss — verdicts, routes, figures, fields.
   The interview's answer to a card grid. */
export function Rows({ children }) {
  return <div className="route-row">{children}</div>
}

export function Row({ k, children }) {
  return <div><span className="mono">{k}</span><span>{children}</span></div>
}
