document.body.classList.add('js');

// Mobile nav
const nav = document.getElementById('nav');
const toggle = document.querySelector('.nav-toggle');
if (nav && toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveals
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  }
}

// Pointer spotlight on cards
document.querySelectorAll('.bento-cell, .feature-card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

// Journey theater: narrates the life of one API call as a looping sequence.
// The packet travels out through the gateway stations, crosses the perimeter
// carrying only surrogates, and comes home restored. Static summary under
// reduced motion.
const journey = document.getElementById('journey');
if (journey) {
  const packet = journey.querySelector('.j-packet');
  const fill = journey.querySelector('.j-fill');
  const pre = journey.querySelector('.j-payload pre');
  const cap = journey.querySelector('.j-caption');
  const audit = journey.querySelector('.j-audit');
  const stations = Array.from(journey.querySelectorAll('.j-st'));

  // Example values throughout.
  const PAY = {
    ask: '"Summarise renewal risk for <span class="s">Meridian Trust</span>,\n account <span class="s">IN-4471-0392</span>"',
    flagged: '"Summarise renewal risk for <span class="s flag">Meridian Trust</span>,\n account <span class="s flag">IN-4471-0392</span>"',
    masked: '"Summarise renewal risk for <span class="m">Halberd Mutual</span>,\n account <span class="m">IN-9083-5517</span>"',
    ansMask: '"<span class="m">Halberd Mutual</span> renewal risk is moderate.\n Account <span class="m">IN-9083-5517</span> shows two lapsed periods."',
    ansReal: '"<span class="ok">Meridian Trust</span> renewal risk is moderate.\n Account <span class="ok">IN-4471-0392</span> shows two lapsed periods."'
  };

  const STEPS = [
    { pos: 0, pay: 'ask',     cap: 'claims-app calls POST /v1/chat/completions' },
    { pos: 1, pay: 'ask',     cap: 'fast path scan: patterns, secrets, injections. 3 ms' },
    { pos: 2, pay: 'flagged', cap: 'local models score it inside your VPC. PII found' },
    { pos: 3, pay: 'masked',  cap: 'verdict: mask. two values become surrogates' },
    { pos: 4, pay: 'masked',  cap: 'only the surrogates cross your perimeter' },
    { pos: 4, pay: 'ansMask', cap: 'the model answers, still seeing stand-ins' },
    { pos: 0, pay: 'ansReal', cap: 'restored at the edge. your analyst sees the real names' },
    { pos: 0, pay: 'ansReal', cap: 'evidence written, ready for your auditor', audit: true }
  ];

  const setPayload = (key) => {
    if (pre.dataset.state === key) return;
    pre.classList.add('fading');
    setTimeout(() => {
      pre.innerHTML = PAY[key];
      pre.dataset.state = key;
      pre.classList.remove('fading');
    }, 240);
  };

  if (reduceMotion) {
    stations.forEach((el) => el.classList.add('active'));
    fill.style.width = '100%';
    packet.style.display = 'none';
    pre.innerHTML = PAY.masked;
    pre.dataset.state = 'masked';
    cap.textContent = 'scanned, masked, answered, restored, evidenced';
    audit.classList.add('show');
  } else {
    let i = -1;
    const tick = () => {
      i = (i + 1) % STEPS.length;
      const st = STEPS[i];
      const pct = (st.pos / (stations.length - 1)) * 100;
      packet.style.left = pct + '%';
      fill.style.width = pct + '%';
      stations.forEach((el, idx) => el.classList.toggle('active', idx === st.pos));
      setPayload(st.pay);
      cap.textContent = st.cap;
      audit.classList.toggle('show', !!st.audit);
    };
    tick();
    setInterval(tick, 2400);
  }
}

// Browser theater: an analyst types into claude.ai, the extension flags the
// member ID locally, masks it before send, and the reply comes back restored.
// Static summary frame under reduced motion.
const bwin = document.getElementById('bwin');
if (bwin) {
  const userEl = bwin.querySelector('.bwin-user');
  const replyEl = bwin.querySelector('.bwin-reply');
  const note = bwin.querySelector('.bwin-note');
  const cap = bwin.querySelector('.bw-caption');

  // Example values throughout.
  const ID_REAL = 'SGV-88231';
  const ID_MASK = 'KRW-55107';
  const BEFORE = 'Draft an appeal for member ';
  const AFTER = ', cardiology claim.';
  const userState = (cls, id) =>
    BEFORE + '<span class="' + cls + '">' + id + '</span>' + AFTER;
  const replyState = (cls, id) =>
    'Draft ready for member <span class="' + cls + '">' + id + '</span>. The denial cites section 4.2; grounds for appeal are strong.';

  if (reduceMotion) {
    userEl.innerHTML = userState('bwin-mask', ID_MASK);
    replyEl.innerHTML = replyState('bwin-mask', ID_MASK);
    replyEl.classList.add('show');
    note.classList.add('show');
    cap.textContent = 'masked before send. stand-ins stay on screen';
  } else {
    const FULL = BEFORE + ID_REAL + AFTER;
    let timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    const run = () => {
      timers.forEach(clearTimeout);
      timers = [];
      replyEl.classList.remove('show');
      note.classList.remove('show');
      userEl.innerHTML = '<span class="bw-caret" aria-hidden="true"></span>';
      cap.textContent = 'an analyst types into claude.ai';

      // Type the message character by character.
      let n = 0;
      const type = () => {
        n += 1;
        userEl.innerHTML = FULL.slice(0, n) + '<span class="bw-caret" aria-hidden="true"></span>';
        if (n < FULL.length) timers.push(setTimeout(type, 34));
      };
      later(type, 500);
      const typed = 500 + FULL.length * 34;

      later(() => {
        userEl.innerHTML = userState('bw-flag', ID_REAL);
        cap.textContent = 'the extension scores it locally, in the tab';
      }, typed + 900);
      later(() => {
        userEl.innerHTML = userState('bwin-mask', ID_MASK);
        note.classList.add('show');
        cap.textContent = 'masked before send. the real ID never leaves the tab';
      }, typed + 2700);
      later(() => {
        replyEl.innerHTML = replyState('bwin-mask', ID_MASK);
        replyEl.classList.add('show');
        cap.textContent = 'claude answers using the stand-in. it stays on screen';
      }, typed + 4700);
      later(() => {
        cap.textContent = 'nothing real left the tab. evidence written: masked (1 span)';
      }, typed + 7100);
      later(run, typed + 10200);
    };
    run();
  }
}

// Tamper-evident chain theater: entries append, each carrying the previous
// fingerprint; then one gets edited and the chain breaks loudly.
// Static broken-state summary under reduced motion.
const chain = document.getElementById('chain');
if (chain) {
  const rows = Array.from(chain.querySelectorAll('.ch-row'));
  const links = Array.from(chain.querySelectorAll('.ch-link'));
  const cap = chain.querySelector('.bw-caption');
  const linkLabels = links.map((l) => l.textContent);

  const finalState = () => {
    rows.forEach((r) => r.classList.add('show'));
    links.forEach((l) => l.classList.add('show'));
    rows[1].classList.add('tampered');
    links[1].classList.add('broken');
    links[1].textContent = 'mismatch';
    cap.textContent = 'an edited entry breaks the chain. verification fails loudly';
  };

  if (reduceMotion) {
    finalState();
  } else {
    let timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const run = () => {
      timers.forEach(clearTimeout);
      timers = [];
      rows.forEach((r) => r.classList.remove('show', 'tampered'));
      links.forEach((l, i) => { l.classList.remove('show', 'broken'); l.textContent = linkLabels[i]; });
      cap.textContent = 'entries append, each carrying the previous fingerprint';
      later(() => rows[0].classList.add('show'), 400);
      later(() => { links[0].classList.add('show'); rows[1].classList.add('show'); }, 1100);
      later(() => { links[1].classList.add('show'); rows[2].classList.add('show'); }, 1800);
      later(() => { cap.textContent = 'now suppose someone edits an old entry'; }, 3600);
      later(() => rows[1].classList.add('tampered'), 4600);
      later(() => {
        links[1].classList.add('broken');
        links[1].textContent = 'mismatch';
        cap.textContent = 'the fingerprints stop matching. verification fails loudly';
      }, 5500);
      later(run, 9200);
    };
    run();
  }
}

// Kill-switch vignette: one grant flips between active and revoked,
// showing inline containment. Static (revoked) under reduced motion.
const killRow = document.querySelector('[data-kill-row]');
if (killRow) {
  if (reduceMotion) {
    killRow.classList.add('revoked');
  } else {
    setTimeout(() => {
      killRow.classList.add('revoked');
      setInterval(() => killRow.classList.toggle('revoked'), 3400);
    }, 1600);
  }
}

// Count-up stat: animates from data-count-from to data-count-to on first view.
// Optional data-decimals and data-suffix (default '%').
document.querySelectorAll('[data-count-to]').forEach((el) => {
  const to = parseFloat(el.dataset.countTo);
  const from = parseFloat(el.dataset.countFrom || '0');
  const dec = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : '%';
  const fmt = (v) => v.toFixed(dec) + suffix;
  const done = () => { el.textContent = fmt(to); };
  if (reduceMotion || !('IntersectionObserver' in window)) { done(); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(el);
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick); else done();
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  io.observe(el);
});

// Hero headline word-stagger: wrap words (and the grad-word span, kept whole)
// in indexed .hw spans. No-JS and reduced-motion paths keep plain text.
const stag = document.querySelector('[data-stagger]');
if (stag && !reduceMotion) {
  const parts = [];
  stag.childNodes.forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) {
      n.textContent.split(/(\s+)/).forEach((w) => {
        if (w.trim()) parts.push({ word: w });
        else if (w) parts.push({ space: w });
      });
    } else {
      parts.push({ el: n });
    }
  });
  stag.textContent = '';
  let wi = 0;
  parts.forEach((pt) => {
    if (pt.space) { stag.appendChild(document.createTextNode(pt.space)); return; }
    const span = document.createElement('span');
    span.className = 'hw';
    span.style.setProperty('--wi', wi++);
    if (pt.word) span.textContent = pt.word; else span.appendChild(pt.el);
    stag.appendChild(span);
  });
}

// Hero masking demo: the provider-side values flip from real to surrogate,
// showing the swap the gateway performs. Static (masked) under reduced motion.
const flips = document.querySelectorAll('.exchange .flip');
if (flips.length && !reduceMotion) {
  let masked = true;
  setInterval(() => {
    flips.forEach((el) => el.classList.add('fading'));
    setTimeout(() => {
      masked = !masked;
      flips.forEach((el) => {
        el.textContent = masked ? el.dataset.mask : el.dataset.real;
        el.classList.toggle('m', masked);
        el.classList.toggle('s', !masked);
        el.classList.remove('fading');
      });
    }, 300);
  }, 3600);
}
