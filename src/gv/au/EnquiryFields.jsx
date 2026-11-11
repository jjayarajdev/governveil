import { useState } from 'react'

/* The questions /connect and /pilot#request share. One definition, so the two
   forms cannot drift: the concern list is the finalised questionnaire, in its
   exact wording and order (2026-11-11).

   formWire.js reads these by `data-field` rather than by id suffix, because a
   checkbox group is several inputs that make one answer. Inputs revealed
   conditionally ("Other", the phone number) are rendered only when shown, so
   `required` on them is only ever enforced when they are on screen. */

export const CONCERNS = [
  'Employees sharing sensitive information with AI tools',
  'Customer or employee personal information being exposed',
  'Confidential business data leaving the organisation',
  'Lack of consistent AI security policies and enforcement',
  'Insufficient audit evidence of AI governance decisions',
  'Not sure whether existing controls are adequate',
  'Other',
]

export const CALL_TIMES = ['Morning (9am–12pm)', 'Afternoon (12pm–5pm)', 'Any time']

/* A box ticked anywhere in the group clears the group's error. */
const clearGroup = (e) => {
  e.currentTarget.closest('fieldset')
    ?.querySelectorAll('input').forEach((i) => i.setCustomValidity(''))
}

export function ConcernsField({ prefix }) {
  const [other, setOther] = useState(false)
  return (
    <fieldset className="gvf-group" data-required-group="concerns">
      <legend>What’s your biggest concern about AI data protection?</legend>
      <p className="gvf-help" id={`${prefix}-concerns-help`}>Select all that apply.</p>
      <div className="gvf-checks">
        {CONCERNS.map((c, i) => (
          <label key={c} className="gvf-check">
            <input
              type="checkbox"
              name="concerns"
              value={c}
              data-field="concerns"
              aria-describedby={`${prefix}-concerns-help`}
              onChange={(e) => { clearGroup(e); if (i === CONCERNS.length - 1) setOther(e.target.checked) }}
            />
            <span>{c}</span>
          </label>
        ))}
      </div>
      {other && (
        <div className="gvf-reveal">
          <label htmlFor={`${prefix}-concerns-other`}>Tell us more <span className="gvf-opt">(optional)</span></label>
          <input id={`${prefix}-concerns-other`} type="text" data-field="concerns_other" maxLength={500} />
        </div>
      )}
    </fieldset>
  )
}

export function FollowUpField({ prefix }) {
  const [call, setCall] = useState(false)
  return (
    <fieldset className="gvf-group">
      <legend>How would you like us to follow up?</legend>
      <div className="gvf-seg" role="presentation">
        {[['email', 'Email me'], ['call', 'Request a call back']].map(([v, t]) => (
          <label key={v} className="gvf-check gvf-pill">
            <input
              type="radio"
              name={`${prefix}-follow`}
              value={v}
              data-field="follow_up"
              defaultChecked={v === 'email'}
              onChange={() => setCall(v === 'call')}
            />
            <span>{t}</span>
          </label>
        ))}
      </div>
      {call && (
        <div className="gvf-reveal g2" style={{ gap: 16 }}>
          <div>
            <label htmlFor={`${prefix}-phone`}>Phone</label>
            <input
              id={`${prefix}-phone`}
              type="tel"
              autoComplete="tel"
              data-field="phone"
              required
              pattern="[0-9 +()\-]{8,20}"
              placeholder="04xx xxx xxx"
              title="A phone number, digits and spaces"
            />
          </div>
          <div>
            <label htmlFor={`${prefix}-calltime`}>Best time to call <span className="gvf-opt">(Sydney time)</span></label>
            <select id={`${prefix}-calltime`} data-field="call_time" defaultValue={CALL_TIMES[2]}>
              {CALL_TIMES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      )}
    </fieldset>
  )
}
