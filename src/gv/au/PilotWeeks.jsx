/* The five-week shape of the pilot.
 *
 * HAND-WRITTEN, not from the design hand-off — the hand-off describes a
 * "4 to 6 week" window with no internal structure. Jay set the structure on
 * 2 Nov: one week to set up, three to run, one to turn the run into something
 * a board can read. auport.py injects this component into the generated page
 * by anchor, so a regeneration keeps it.
 *
 * Why a timeline rather than another card strip: "five weeks" is a duration,
 * and a duration is not a plan. The thing a sponsor has to defend internally
 * is what lands and when. Week five is the part most vendor pilots skip —
 * they end with the vendor saying it went well.
 */

const WEEKS = [
  {
    span: 'Week 1',
    title: 'Set up',
    body: 'GovernVeil goes into your environment — your cloud account or your own hardware. Your AI policy becomes controls. Nothing leaves your perimeter.',
    out: 'A running gateway and your policy, as controls',
  },
  {
    span: 'Weeks 2–4',
    title: 'Run',
    body: 'Real traffic, real people, your own data. Every prompt, tool call and response is judged in your network and signed to the ledger. Synthetic probes challenge each control daily.',
    out: 'A signed ledger of every decision made',
  },
  {
    span: 'Week 5',
    title: 'Analysis',
    body: 'We turn the five weeks into a written assessment: what your people are actually sending to AI, which controls fired, which did not, and where the gaps are.',
    out: 'A report for your risk committee, and a walkthrough',
  },
]

export default function PilotWeeks() {
  return (
    <section className="wrap sec" aria-labelledby="pilot-weeks">
      <p className="eb">The five weeks</p>
      <h2 className="h2x" id="pilot-weeks" style={{ marginTop: 14, marginBottom: 12 }}>
        One week in, you see a real prompt caught. Five weeks in, you have
        something to show the board<span style={{ color: 'var(--acc)' }}>.</span>
      </h2>
      <p className="body" style={{ margin: '0 0 40px', maxWidth: 760 }}>
        A duration is not a plan. This is what lands, and when.
      </p>

      <ol className="pw">
        {WEEKS.map(({ span, title, body, out }) => (
          <li key={span} className="pw-step">
            <span className="rl pw-span">{span}</span>
            <b className="pw-title">{title}</b>
            <p className="pw-body">{body}</p>
            <p className="pw-out"><span aria-hidden="true">→ </span>{out}</p>
          </li>
        ))}
      </ol>

      <p className="pw-after">
        The first three organisations pay nothing for the five weeks. If you
        carry on afterwards, that is paid — and so is every pilot after the
        first three. We would rather you knew that now than found it out in
        week five.
      </p>
    </section>
  )
}
