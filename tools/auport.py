#!/usr/bin/env python3
import re, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from aujsx import convert

SRC  = pathlib.Path('/Users/jjayaraj/Downloads/GovernVeil-website-AU/site-au')
DEST = pathlib.Path('/Users/jjayaraj/workspaces/studios/governveil-website/src/gv/au')
DEST.mkdir(parents=True, exist_ok=True)

# design file -> (route, component, page key)
PAGES = [
    ('index',        '/',             'HomeAU',        'home'),
    ('platform',     '/platform',     'PlatformAU',    'platform'),
    ('how-it-works', '/how-it-works', 'HowItWorksAU',  'howitworks'),
    ('agents',       '/agents',       'AgentsAU',      'agents'),
    ('runtime',      '/runtime',      'RuntimeAU',     'runtime'),
    ('security',     '/security',     'SecurityAU',    'security'),
    ('benchmark',    '/benchmark',    'BenchmarkAU',   'benchmark'),
    ('partners',     '/pilot',        'PilotAU',       'pilot'),
    ('about',        '/about',        'AboutAU',       'about'),
]
ROUTE = {f: r for f, r, _, _ in PAGES}
route_of = lambda stem: ROUTE.get(stem, '/' + stem)

# ── rename: design partner -> pilot ───────────────────────────────────────
# Applied to every page before the per-page CORRECTIONS. Jay's call, 2 Nov:
# "design partner" has no procurement category in an Australian bank or super
# fund, where "pilot" does. What the old word carried for free — why a serious
# vendor gives five weeks away — is replaced by stating the commercial terms
# outright: free for the first three, paid after that. That is a better answer
# than the word was.
#
# Whole PHRASES, not the bare word: a blind substitution produces "Become a
# pilot", which is a job in aviation.
RENAMES = [
    # calls to action
    ('Apply to be a design partner',        'Apply for a pilot'),
    ('Become a design partner',             'Apply for a pilot'),
    ('How the design partnership works \u2192', 'How the pilot works \u2192'),
    ('The design-partner window \u2192',    'The pilot programme \u2192'),

    # eyebrows and headings
    ('Design-partner window \u00b7 now open', 'Three free pilot places \u00b7 now open'),
    ('Q \u00b7 Why a design-partner window?', 'Q \u00b7 Why is the pilot free?'),
    ('Design-partner pilot \u00b7 early access', 'Pilot \u00b7 early access'),
    ('STEP 2 \u00b7 OPENS AFTER OUR FIRST DESIGN PARTNERS',
     'STEP 2 \u00b7 OPENS AFTER THE FIRST THREE PILOTS'),
    ('Design partnership',                  'The pilot'),

    # the terms line, repeated on every page's apply band
    ('Free, 4 to 6 weeks, in your environment with your data. 3 to 5 places '
     'for regulated Australian organisations.',
     'Five weeks in your environment, with your data. Free for the first '
     'three regulated Australian organisations \u2014 paid after that.'),

    # the agents page carries the same sentence with a trailing clause, so the
    # generic form above cannot match it
    ('Free, 4 to 6 weeks, in your environment with your data. 3 to 5 places '
     'for regulated Australian organisations \u2014 and for AI vendors who want '
     'independent evidence that what they ship is governed.',
     'Five weeks in your environment, with your data. Free for the first '
     'three regulated Australian organisations \u2014 and for AI vendors who want '
     'independent evidence that what they ship is governed. Paid after that.'),

    ('Free, 4 to 6 weeks, 3 to 5 organisations. We prove GovernVeil in your '
     'environment and build what you tell us is missing.',
     'Five weeks, free for the first three organisations. We prove GovernVeil '
     'in your environment and build what you tell us is missing.'),

    # prose
    ('our design-partner window is open to prove it in regulated Australian '
     'environments.',
     'the first three pilots are open to prove it in regulated Australian '
     'environments.'),
    ('Design partners help build an Australian test set',
     'Pilot organisations help build an Australian test set'),
    ('on terms shaped by what design partners teach us. Design partners who go '
     'ahead get it at a discount.',
     'on terms shaped by what the first pilots teach us. Organisations that go '
     'ahead get it at a discount.'),
    ('The design partnership is free.', 'The first three pilots are free.'),
    ('Design partners get our full assurance register',
     'Pilot organisations get our full assurance register'),
    ('Join our free 4 to 6 week design-partner pilot.',
     'Join our free five-week pilot.'),
    ('3 to 5 places per cohort.', 'Three free places, then paid.'),

    # leftovers of the old "design-partner window" framing
    ('That\u2019s what this window is for.', 'That\u2019s what the pilot is for.'),
    ('Q \u00b7 What happens after the window?', 'Q \u00b7 What happens after the five weeks?'),
]


# ── removal: "Book a call to see the architecture" ────────────────────────
# Jay's call, 2 Nov. Phrase-only on the AU site (.com never used it).
#
# NOT a blind delete. The phrase sits in three different roles, and in two of
# them it is the ONLY call to action in its block:
#
#   secondary next to "Apply for a pilot"  -> delete outright (9 places)
#   the PRIMARY in the About form          -> delete, and promote the
#                                             surviving button to primary
#   the PRIMARY hero CTA on three pages    -> retitle to "Apply for a pilot";
#                                             deleting would leave those heroes
#                                             with only a nav link and nothing
#                                             to convert on
BOOKCALL = [
    # the plain secondary — in forms and in two hero pairs
    ('<button type="button" className="btns">Book a call to see the architecture</button>', ''),
    ('<a href="#apply" className="btns">Book a call to see the architecture</a>', ''),
    ('<button type="button" className="btns" style={{"background": "transparent", '
     '"font": "inherit", "fontWeight": 600, "cursor": "pointer"}}>'
     'Book a call to see the architecture</button>', ''),

    # About's form: the phrase WAS the primary, so promote the other button
    ('<button type="button" className="btnp">Book a call to see the architecture</button>'
     '<button type="button" className="btns">Apply for a pilot</button>',
     '<button type="button" className="btnp">Apply for a pilot</button>'),

    # three hero primaries: retitle, keep the #apply target
    ('<a href="#apply" className="btnp">Book a call to see the architecture</a>',
     '<a href="#apply" className="btnp">Apply for a pilot</a>'),
]


# ── injections ────────────────────────────────────────────────────────────
# Hand-written components spliced into a generated page after a known anchor.
# The hand-off has no five-week timeline to port — Jay set that structure on
# 2 Nov — so it lives in its own component and is placed here rather than
# pasted into generated output a regeneration would overwrite.
INJECTS = []


# ── corrections ───────────────────────────────────────────────────────────
# Applied after conversion, so a regeneration keeps them. Each one is a claim
# the design states more strongly than the product supports; the reason is the
# point of recording them here rather than hand-editing the output.
CORRECTIONS = [
    (
        # services/gateway/internal/egress/egress.go:102 logs "observe mode —
        # set EGRESS_ENFORCE=true to block", so enforcement is opt-in and OFF
        # by default. governveil.com already says so on its Trust page; this
        # brings .com.au into line rather than claiming the stronger thing.
        'security',
        'The allow-list is enforced, not just observed.',
        'Denied, or merely observed and logged \u2014 it ships in observe mode '
        'and you turn enforcement on.',
    ),
    (
        # Jay confirmed 2 Nov: cut the amber "[... Jay to confirm]" notes. They
        # were working notes left in the hand-off, not missing answers — each
        # of the three FAQ answers is complete and accurate without one, so
        # only the note goes.
        'partners',
        ' <span className="tbc">[Mobile coverage: Jay to confirm]</span>',
        '',
    ),
    (
        'partners',
        ' <span className="tbc">[Timing: Jay to confirm]</span>',
        '',
    ),
    (
        'partners',
        ' <span className="tbc">[Scheduled delivery: Jay to confirm]</span>',
        '',
    ),
    (
        # The hero lead and the terms strip, rewritten for the model Jay set on
        # 2 Nov: five weeks (1 setup / 3 run / 1 analysis), free for the first
        # three organisations, paid for everyone after. Stating "paid after
        # that" on the page is deliberate — a free trial that silently converts
        # is the fastest way to lose a regulated buyer's trust, and saying it
        # up front also pre-qualifies who applies.
        'partners',
        'We\u2019re opening a design-partner window for three to five regulated '
        'Australian organisations. It\u2019s free. For 4 to 6 weeks GovernVeil runs '
        'in your environment, against your real AI use, so together we can test '
        'every claim on this site, find what isn\u2019t right yet, and shape what we '
        'build next.',
        'Five weeks, in your environment, against your real AI use \u2014 one week '
        'to set up, three to run, one to turn what happened into something you '
        'can put in front of your board. The first three organisations go free. '
        'After the five weeks, and for everyone after the first three, it is '
        'paid.',
    ),
    (
        'partners',
        '<div className="card fact"><span className="rl">LENGTH</span><b>4 to 6 weeks</b></div>',
        '<div className="card fact"><span className="rl">LENGTH</span><b>Five weeks</b></div>',
    ),
    (
        'partners',
        '<div className="card fact"><span className="rl">PLACES</span><b>3 to 5 organisations</b></div>',
        '<div className="card fact"><span className="rl">PLACES</span><b>Three, then paid</b></div>',
    ),
    (
        'partners',
        '<div className="card fact"><span className="rl">COST</span><b>Free</b></div>',
        '<div className="card fact"><span className="rl">COST</span><b>Free for the first three</b></div>',
    ),
    (
        # The hand-off already carries a timeline — WEEK 0 Set up through
        # WEEK 6 Report — which I missed when adding a five-week band of my
        # own, leaving /pilot with two that disagreed. This is the one
        # timeline, in the design's own .lp cells, carrying Jay's structure:
        # one week to set up, three to run, one for the analysis.
        'partners',
        '<div className="g6" style={{"marginTop": 40, "borderTop": "2px solid #0E1411"}}>\n      <div className="lp"><i>WEEK 0</i><b>Set up</b><span>Agree three success criteria and the scope.</span></div>\n      <div className="lp" style={{"paddingLeft": 14, "background": "var(--acc)"}}><i style={{"color": "#0E1411"}}>WEEK 1</i><b>Deploy</b><span style={{"color": "#0E1411"}}>Installed in your environment, first prompt caught.</span></div>\n      <div className="lp" style={{"paddingLeft": 14}}><i>WEEKS 1–2</i><b>Observe</b><span>Monitor only: see what would have been stopped.</span></div>\n      <div className="lp" style={{"paddingLeft": 14}}><i>WEEKS 3–4</i><b>Protect</b><span>Turn on the controls you choose.</span></div>\n      <div className="lp" style={{"paddingLeft": 14}}><i>WEEK 5</i><b>Tune</b><span>Adjust policies against your own data.</span></div>\n      <div className="lp" style={{"paddingLeft": 14}}><i>WEEK 6</i><b>Report</b><span>Control-effectiveness report and a go or no-go.</span></div>\n      </div>',
        '<div className="g5 pilot-weeks" style={{"marginTop": 40, "borderTop": "2px solid #0E1411"}}>\n      <div className="lp"><i>WEEK 1</i><b>Set up</b><span>Into your environment. Your AI policy becomes controls. Nothing leaves your perimeter.</span></div>\n      <div className="lp" style={{"paddingLeft": 14, "background": "var(--acc)"}}><i style={{"color": "#0E1411"}}>WEEK 2</i><b>Run</b><span style={{"color": "#0E1411"}}>Real traffic, real people, your own data. Every decision signed to the ledger.</span></div>\n      <div className="lp" style={{"paddingLeft": 14}}><i>WEEK 3</i><b>Run</b><span>Probes challenge every control daily. Policies tuned against what you actually see.</span></div>\n      <div className="lp" style={{"paddingLeft": 14}}><i>WEEK 4</i><b>Run</b><span>Protection on for the controls you choose, with the ledger behind every call.</span></div>\n      <div className="lp" style={{"paddingLeft": 14}}><i>WEEK 5</i><b>Analysis</b><span>A written assessment and a walkthrough: what your people sent, which controls fired, where the gaps are.</span></div>\n      </div>',
    ),
    (
        'partners',
        'Six weeks, start to report. Observe first. Protect when you\u2019re ready.',
        'Five weeks, start to report. One to set up, three to run, one to turn '
        'it into something your board can read.',
    ),
    (
        # design-partner framing that outlived the rename
        'partners',
        'A partnership, not a trial.',
        'A pilot you can put in front of your board.',
    ),
]


def body_of(html):
    """Everything the shell does not own: after </header>, before <footer."""
    a = html.index('</header>') + len('</header>')
    b = html.index('<footer')
    return html[a:b].strip()

def indent(jsx):
    """Re-indent by tag depth so the output is readable rather than one wall."""
    lines, depth = [], 0
    for raw in jsx.split('\n'):
        s = raw.strip()
        if not s: continue
        if re.match(r'^</', s): depth = max(0, depth - 1)
        lines.append('  ' * (depth + 3) + s)
        opens  = len(re.findall(r'<[A-Za-z][^>]*?(?<!/)>', s))
        closes = len(re.findall(r'</[A-Za-z]', s))
        selfc  = len(re.findall(r'/>', s))
        if re.match(r'^</', s): opens = max(0, opens)
        depth += max(-1, opens - closes - selfc) if not re.match(r'^</', s) else 0
        depth = max(0, depth)
    return '\n'.join(lines)

total = 0
for stem, route, comp, key in PAGES:
    html = (SRC / f'{stem}.html').read_text()
    jsx, links = convert(body_of(html), route_of)
    # collapse the blank runs the source carries between sections
    jsx = re.sub(r'\n{3,}', '\n\n', jsx).strip()
    jsx = '\n'.join('      ' + l.strip() if l.strip() else '' for l in jsx.split('\n'))
    for before, after in RENAMES:
        jsx = jsx.replace(before, after)
    for before, after in BOOKCALL:
        jsx = jsx.replace(before, after)
    inject_imports = []
    for page, imp, anchor, repl in INJECTS:
        if page != stem:
            continue
        if jsx.count(anchor) < 1:
            raise SystemExit(f'injection anchor for {stem} not found')
        jsx = jsx.replace(anchor, repl, 1)
        inject_imports.append(imp)
        print(f'  injected into {stem}: {imp}')

    for page, before, after in CORRECTIONS:
        if page != stem:
            continue
        if before not in jsx:
            raise SystemExit(f'correction for {stem} no longer matches: {before!r}')
        jsx = jsx.replace(before, after)
        print(f'  corrected {stem}: {before[:48]}...')
    needs_link = '<Link' in jsx
    head = []
    if needs_link:
        head.append("import { Link } from 'react-router-dom'")
    for imp in inject_imports:
        head.append(f"import PilotWeeks {imp}")
    src = (('\n'.join(head) + '\n\n') if head else '') + f'''/* {comp} — governveil.com.au, ported from site-au/{stem}.html.

   GENERATED by tools/auport.py. The design's markup, converted
   mechanically: class -> className, inline style strings -> objects,
   internal *.html hrefs -> <Link to>, <pre> newlines made explicit.
   Copy changes belong in the design source, not here. */

export default function {comp}() {{
  return (
    <>
{jsx}
    </>
  )
}}
'''
    (DEST / f'{comp}.jsx').write_text(src)
    total += links
    print(f'{comp:16} {route:16} {len(src):7,} bytes  {links:2} internal links')
print(f'\n{len(PAGES)} components, {total} links rewritten')
