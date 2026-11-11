/* Makes every form on both sites actually submit.
 *
 * Event delegation from the shell root rather than props on each form,
 * because the twenty forms live in files generated from the design hand-off
 * (src/gv/au/* by tools/auport.py, src/gv/v3/* by the earlier port). Editing
 * those by hand means the next regeneration silently reverts the site to
 * inert buttons, which is exactly the failure this is fixing.
 *
 * The design's submit buttons are `type="button"`, so there is no native
 * submit event to hook: the click is the signal. Anchors styled as buttons
 * (`<a class="btnp">`) are navigation and are left alone.
 *
 * Fields are read by id SUFFIX. Every page prefixes its own ids — pau-email,
 * bm3-email, hau-name — but the suffixes are consistent across both sites,
 * which is what makes one handler enough.
 */

const SUFFIX = {
  '-name': 'name',
  '-email': 'email',
  '-hero': 'email',   // the hero capture forms are email-only
  '-co': 'org',
  '-org': 'org',
  '-role': 'role',
  '-size': 'size',
  '-region': 'region',
  '-sector': 'sector',
  '-q': 'question',
}

function readForm(form) {
  const out = {}
  for (const el of form.querySelectorAll('input, textarea, select')) {
    /* Shared questions (EnquiryFields.jsx) name their field outright. A
       checkbox group is several inputs and one answer, so it collects. */
    const field = el.dataset.field
    if (field) {
      if (el.type === 'checkbox') {
        if (el.checked) (out[field] ||= []).push(el.value)
      } else if (el.type === 'radio') {
        if (el.checked) out[field] = el.value
      } else {
        const v = (el.value || '').trim()
        if (v) out[field] = v
      }
      continue
    }
    const id = el.id || ''
    const key = Object.entries(SUFFIX).find(([s]) => id.endsWith(s))?.[1]
    if (!key) continue
    const v = (el.value || '').trim()
    // a <select> still on its placeholder reports the placeholder's value
    if (!v || (el.tagName === 'SELECT' && el.selectedIndex === 0)) continue
    out[key] = v
  }
  return out
}

function setStatus(form, text, tone) {
  let el = form.querySelector('[data-form-status]')
  if (!el) {
    el = document.createElement('p')
    el.setAttribute('data-form-status', '')
    el.setAttribute('role', 'status')
    el.style.cssText = 'margin:0;font-size:14px;line-height:1.5'
    form.appendChild(el)
  }
  el.style.color = tone === 'bad' ? '#B83E0E' : tone === 'good' ? '#1F6F43' : 'inherit'
  el.textContent = text
}

/* Opt-in: only forms that mark fields `required` or carry a required
   checkbox group are checked here, so the other forms behave as before.
   The browser's own messages and focus handling do the reporting. */
function validate(form) {
  for (const group of form.querySelectorAll('[data-required-group]')) {
    const boxes = [...group.querySelectorAll('input[type="checkbox"]')]
    const none = boxes.length && !boxes.some((b) => b.checked)
    boxes.forEach((b) => b.setCustomValidity(''))
    if (none) boxes[0].setCustomValidity('Select at least one option.')
  }
  return form.reportValidity()
}

async function submit(form, button) {
  if (!validate(form)) {
    setStatus(form, 'Please complete the highlighted fields.', 'bad')
    return
  }
  const data = readForm(form)

  if (!data.email) {
    setStatus(form, 'Please add a work email so we can reply.', 'bad')
    form.querySelector('input[type="email"], input[id$="-email"], input[id$="-hero"]')?.focus()
    return
  }

  const label = button.textContent.trim()
  button.disabled = true
  const was = button.textContent
  button.textContent = 'Sending…'
  setStatus(form, '', null)

  try {
    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...data,
        intent: label,
        page: location.pathname,
        website: form.querySelector('[name="website"]')?.value || '',
      }),
    })
    const body = await res.json().catch(() => ({}))

    if (res.ok && body.ok) {
      form.replaceChildren()
      setStatus(form, data.follow_up === 'call' && data.phone
        ? `Thank you — we have your details and will call you on ${data.phone}.`
        : `Thank you — we have your details and will reply to ${data.email}.`, 'good')
      return
    }
    setStatus(form, body.error || 'Something went wrong. Please try again.', 'bad')
  } catch {
    setStatus(form, 'We could not reach the server. Please check your connection and try again.', 'bad')
  } finally {
    if (document.contains(button)) {
      button.disabled = false
      button.textContent = was
    }
  }
}

/* A field no person sees and no real browser fills, but a naive bot does.
   Injected rather than written into the markup so the generated page files
   stay a faithful copy of the design. */
function addHoneypot(form) {
  if (form.querySelector('[name="website"]')) return
  const wrap = document.createElement('div')
  wrap.setAttribute('aria-hidden', 'true')
  wrap.style.cssText =
    'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap'
  const input = document.createElement('input')
  Object.assign(input, { type: 'text', name: 'website', tabIndex: -1, autocomplete: 'off' })
  wrap.appendChild(input)
  form.appendChild(wrap)
}

export function wireForms(root) {
  if (!root) return undefined

  const seed = () => root.querySelectorAll('form').forEach(addHoneypot)
  seed()
  // routes swap the page under the same root, so re-seed as content changes
  const mo = new MutationObserver(seed)
  mo.observe(root, { childList: true, subtree: true })

  const onClick = (e) => {
    const button = e.target.closest('button.btnp, button.btns')
    if (!button) return
    const form = button.closest('form')
    if (!form) return
    e.preventDefault()
    submit(form, button)
  }

  // Enter in a text input would otherwise reload the page
  const onSubmit = (e) => {
    const form = e.target.closest('form')
    if (!form) return
    e.preventDefault()
    const button = form.querySelector('button.btnp') || form.querySelector('button.btns')
    if (button) submit(form, button)
  }

  root.addEventListener('click', onClick)
  root.addEventListener('submit', onSubmit)
  return () => {
    mo.disconnect()
    root.removeEventListener('click', onClick)
    root.removeEventListener('submit', onSubmit)
  }
}
