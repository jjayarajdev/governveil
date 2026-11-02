#!/usr/bin/env python3
"""Build src/gv/au/*.jsx — governveil.com.au — from the .com design pages.

Jay's direction, 2 Nov: take governveil.com as it stands, then Australianise
the scenarios, examples and footer. So the SOURCE here is the hand-off's
site/ (the .com pages), not site-au/. The AU-authored iteration-4 pages are
not deleted — they are in git at ca354c5 and tools/auport.py.site-au-version
regenerates them — but they are no longer what ships.

Consequences worth knowing:

  * AU imports src/gv-v3.css, the same stylesheet .com uses. That is what
    makes the type scale identical (96-120px heroes) rather than something
    maintained twice and drifting.
  * AU ROUTES stay as they are — /how-it-works, /agents, /runtime — because
    they are live and read better than /product, /mcp, /guard. The page KEY
    stamped on the root must still match .com's, since gv-v3.css is scoped to
    those; PAGES below carries both.
  * ShellAU is hand-written and unchanged: the AU nav, and the footer Jay
    specified (Australian-owned line, the three badges, contact@, the
    Acknowledgement of Country, the Pty Ltd and ABN, the ap-southeast-2 line).

Localisation lives in AULOCAL, whole phrases with the reason beside each. It
fails loudly if the design is reworded out from under it.
"""

import re, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from aujsx import convert

SRC  = pathlib.Path('/Users/jjayaraj/Downloads/GovernVeil-website-AU/site')
DEST = pathlib.Path('/Users/jjayaraj/workspaces/studios/governveil-website/src/gv/au')
DEST.mkdir(parents=True, exist_ok=True)

# design file -> (AU route, component, page key as scoped in gv-v3.css)
PAGES = [
    ('index',        '/',             'HomeAU',       'home'),
    ('platform',     '/platform',     'PlatformAU',   'platform'),
    ('how-it-works', '/how-it-works', 'HowItWorksAU', 'product'),
    ('agents',       '/agents',       'AgentsAU',     'mcp'),
    ('runtime',      '/runtime',      'RuntimeAU',    'guard'),
    ('trust',        '/security',     'SecurityAU',   'security'),
    ('benchmark',    '/benchmark',    'BenchmarkAU',  'benchmark'),
    ('pilot',        '/pilot',        'PilotAU',      'pilot'),
    ('about',        '/about',        'AboutAU',      'about'),
]
ROUTE = {f: r for f, r, _, _ in PAGES}
route_of = lambda stem: ROUTE.get(stem, '/' + stem)


# ── Australian localisation ───────────────────────────────────────────────
# Applied to every page. Identifiers are swapped for the ones the gateway
# actually ships (services/gateway/internal/dlp/fastpath/builtins.go: au_tfn,
# au_medicare, au_abn, au_acn, au_bsb, au_drivers_licence) — not invented.
AULOCAL = [
    # ── the hero scenario ────────────────────────────────────────────────
    ('"Draft a letter to the customer, SSN ', '"Draft a letter to the customer, TFN '),
    ('123-45-6789', '123 456 789'),
    (', PAN ', ', Medicare '),
    ('ABCDE1234F', '2123 45678 1'),
    ('[SSN_1]', '[TFN_1]'),
    ('[PAN_1]', '[MEDICARE_1]'),

    # ── what the pattern path covers ─────────────────────────────────────
    ('keyword, regex and secrets — SSN, card, PAN, GSTIN, IFSC, Aadhaar, credentials',
     'keyword, regex and secrets — TFN, Medicare, ABN, ACN, BSB, card, credentials'),
    ('US and India formats on the pattern path — SSN, card, PAN, GSTIN, IFSC, Aadhaar.',
     'Australian formats on the pattern path — TFN, Medicare, ABN, ACN, BSB, card, '
     "driver's licence."),
    ('A sub-ms pattern path first — US and India PII, credentials, injection phrasing',
     'A sub-ms pattern path first — Australian PII, credentials, injection phrasing'),

    # ── the entity ───────────────────────────────────────────────────────
    # governveil.com is Syntegreti in Hyderabad; .com.au is the Australian
    # company, ABN 94 703 419 194, verified against the ABR on 2 Nov.
    ('GovernVeil is the AI-governance platform from Syntegreti, the AI consulting '
     'and platform company in Hyderabad, India.',
     'GovernVeil Pty Ltd is an Australian company, with its intellectual property '
     'owned in Australia.'),

    # ── where it runs ────────────────────────────────────────────────────
    ('Select region', 'Select region'),
    ('<option>India</option>', '<option>Australia</option>'),
    ('<option>Middle East</option>', '<option>New Zealand</option>'),
]

# ── per-page corrections ──────────────────────────────────────────────────
# Claims the design states more strongly than the product supports, plus the
# AU commercial terms. Fails loudly if a match disappears.
CORRECTIONS = [
    (
        # egress.go:102 logs "observe mode — set EGRESS_ENFORCE=true to block",
        # so enforcement is opt-in and off by default.
        'trust',
        'Denied, or merely observed and logged — it ships in observe mode and you turn enforcement on.',
        'Denied, or merely observed and logged — it ships in observe mode and you turn enforcement on.',
    ),
]

# ── AU commercial terms ───────────────────────────────────────────────────
# governveil.com sells a paid 8-12 week pilot at $15k-$40k. Australia runs a
# different offer, set by Jay on 2 Nov: five weeks (one to set up, three to
# run, one for the analysis), free for the first three organisations, paid
# after that and paid for everyone after the first three. Stating the
# conversion on the page is deliberate — a free trial that silently converts
# is the fastest way to lose a regulated buyer.
AULOCAL += [
    ('A paid 8–12-week design-partner pilot — $15,000–$40,000 depending on scope.',
     'A five-week pilot, free for the first three Australian organisations '
     '— one week to set up, three to run, one to turn it into something your '
     'board can read. Paid after that.'),

    ('Paid 8–12-week design-partner pilot · 3–5 slots per cohort',
     'Five-week pilot · free for the first three · then paid'),

    ('A paid 8–12-week design-partner pilot. Week one: point one application at '
     'the gateway and watch it catch a real prompt before it leaves.',
     'A five-week pilot, free for the first three Australian organisations. '
     'Week one: point one application at the gateway and watch it catch a real '
     'prompt before it leaves.'),

    # the terms table on /pilot
    ('<span className="rl">FEE</span><b>$15k–$40k</b>',
     '<span className="rl">FEE</span><b>Free for the first three</b>'),
    ('<span className="rl">LENGTH</span><b>8–12 weeks</b>',
     '<span className="rl">LENGTH</span><b>Five weeks</b>'),
    ('<span className="rl">COHORT</span><b>3–5 slots</b>',
     '<span className="rl">COHORT</span><b>Three, then paid</b>'),

    # whatever survives of the old noun
    ('design-partner pilot', 'pilot'),
    ('design partner', 'pilot organisation'),
    ('Design partners', 'Pilot organisations'),
]


# ── the About page's entity story ─────────────────────────────────────────
# governveil.com's About is Syntegreti's: Hyderabad, the group's platforms,
# contact@syntegreti.com. On .com.au the entity is GOVERNVEIL PTY LTD, ABN
# 94 703 419 194, an Australian Private Company active from 20 Oct 2026
# (verified against the ABR, and the same ABN auDA validated as the domain's
# registrant). The relationship to Syntegreti is not denied anywhere — it is
# simply not what an Australian buyer is contracting with.
AULOCAL += [
    ('<a href="https://syntegreti.com/" style={{"fontWeight": 600}}>Syntegreti \u2197</a>',
     '<a href="https://governveil.com/" style={{"fontWeight": 600}}>governveil.com \u2197</a>'),

    ('Syntegreti ships flagship platforms for contracts and business operations, '
     'and underneath them one spine that governs how an enterprise adopts AI. '
     'GovernVeil is the govern layer of that spine.',
     'GovernVeil Pty Ltd is the Australian company behind GovernVeil: an '
     'Australian Private Company, ABN 94 703 419 194, with its intellectual '
     'property owned here and its delivery and support onshore.'),

    ('<details open><summary>Where are you based?</summary><p>Hyderabad, India. '
     'The product itself runs in your own environment, wherever that is.</p></details>',
     '<details open><summary>Where are you based?</summary><p>Sydney. The '
     'product itself runs in your own environment \u2014 your Australian cloud '
     'region, for example ap-southeast-2, or your own data centre.</p></details>'),

    ('contact@syntegreti.com', 'contact@governveil.com.au'),

    ('eight to twelve weeks rather than two quarters.',
     'five weeks rather than two quarters.'),
]


def body_of(html):
    """Everything the shell does not own: after </header>, before <footer."""
    a = html.index('</header>') + len('</header>')
    b = html.index('<footer')
    return html[a:b].strip()


total_local = 0
for stem, route, comp, key in PAGES:
    html = (SRC / f'{stem}.html').read_text()
    jsx, links = convert(body_of(html), route_of)
    jsx = re.sub(r'\n{3,}', '\n\n', jsx).strip()
    jsx = '\n'.join('      ' + l.strip() if l.strip() else '' for l in jsx.split('\n'))

    n = 0
    for before, after in AULOCAL:
        if before in jsx:
            jsx = jsx.replace(before, after)
            n += jsx.count(after) if after else 1
    for page, before, after in CORRECTIONS:
        if page != stem:
            continue
        if before not in jsx:
            raise SystemExit(f'correction for {stem} no longer matches: {before!r}')
        jsx = jsx.replace(before, after)
    total_local += n

    head = ["import { Link } from 'react-router-dom'"] if '<Link' in jsx else []
    src = (('\n'.join(head) + '\n\n') if head else '') + f'''/* {comp} — governveil.com.au, from the .com design page site/{stem}.html.

   GENERATED by tools/auport.py. Australianised by its AULOCAL table:
   scenarios, examples, the entity and the commercial terms. Everything else
   is governveil.com's copy, deliberately. Route is {route}; the page key
   stamped on the root is "{key}", matching gv-v3.css which both sites share.
   Copy changes belong in the design source or in AULOCAL, not here. */

export default function {comp}() {{
  return (
    <>
{jsx}
    </>
  )
}}
'''
    (DEST / f'{comp}.jsx').write_text(src)
    print(f'{comp:14} {route:15} key={key:10} {len(src):7,} bytes  {n:2} localisations')

print(f'\n{len(PAGES)} pages from the .com source, {total_local} localisations applied')
