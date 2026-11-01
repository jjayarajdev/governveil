#!/usr/bin/env python3
"""HTML -> JSX for the nine governveil.com.au design pages.

Uses HTMLParser rather than regex on the whole document. The regex version of
this bit rewrote the word "checked" inside prose ("checked at the reverse
proxy" -> 'checked={true} at ...'), because a boolean-attribute pattern has no
way to know it is outside a tag. The parser does.
"""
import re, sys, pathlib
from html.parser import HTMLParser

VOID = {'area','base','br','col','embed','hr','img','input','link','meta',
        'param','source','track','wbr','path','rect','circle','line','ellipse',
        'polygon','polyline','stop','use'}

# HTMLParser lowercases attribute names; SVG and a few HTML ones need the case
# (or the React name) putting back.
RENAME = {
    'class': 'className', 'for': 'htmlFor', 'autocomplete': 'autoComplete',
    'charset': 'charSet', 'tabindex': 'tabIndex', 'colspan': 'colSpan',
    'rowspan': 'rowSpan', 'maxlength': 'maxLength', 'readonly': 'readOnly',
    'srcset': 'srcSet', 'crossorigin': 'crossOrigin', 'novalidate': 'noValidate',
    'viewbox': 'viewBox', 'patternunits': 'patternUnits',
    'patterntransform': 'patternTransform', 'gradientunits': 'gradientUnits',
    'clippath': 'clipPath', 'clip-path': 'clipPath',
    'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin', 'stroke-dasharray': 'strokeDasharray',
    'stroke-opacity': 'strokeOpacity', 'fill-rule': 'fillRule',
    'fill-opacity': 'fillOpacity', 'text-anchor': 'textAnchor',
    'font-family': 'fontFamily', 'font-size': 'fontSize',
    'font-weight': 'fontWeight', 'dominant-baseline': 'dominantBaseline',
    'marker-end': 'markerEnd', 'stop-color': 'stopColor',
}
BOOL = {'hidden','checked','selected','disabled','required','open','readonly','multiple','autofocus'}
UNITLESS = {'zIndex','opacity','flex','flexGrow','flexShrink','order','lineHeight',
            'fontWeight','zoom','gridRow','gridColumn'}

def camel(prop):
    prop = prop.strip()
    if prop.startswith('--'):
        return prop                       # custom property: keep verbatim
    return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), prop)

def style_obj(css):
    """`a: b; c: d` -> a JS object literal. Splits only on semicolons that are
    not inside url(...) or a quoted string."""
    decls, depth, buf, quote = [], 0, '', None
    for ch in css:
        if quote:
            buf += ch
            if ch == quote: quote = None
            continue
        if ch in '"\'': quote = ch; buf += ch; continue
        if ch == '(': depth += 1
        elif ch == ')': depth -= 1
        if ch == ';' and depth == 0:
            decls.append(buf); buf = ''
        else:
            buf += ch
    decls.append(buf)
    out = []
    for d in decls:
        if ':' not in d: continue
        k, v = d.split(':', 1)
        k, v = camel(k), v.strip()
        if not k or not v: continue
        # bare px -> number, the way the design's own inline styles read
        if re.fullmatch(r'-?\d+px', v):
            out.append(f'"{k}": {v[:-2]}')
        elif re.fullmatch(r'-?\d+', v) and k in UNITLESS:
            out.append(f'"{k}": {v}')
        else:
            out.append(f'"{k}": {json_str(v)}')
    return '{' + ', '.join(out) + '}'

def json_str(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'

def esc_text(t):
    """JSX text: braces are code, angle brackets open tags. Entities pass
    through — JSX understands &amp; &nbsp; &middot; and the rest."""
    return t.replace('{', '&#123;').replace('}', '&#125;') \
            .replace('<', '&lt;').replace('>', '&gt;')

class ToJsx(HTMLParser):
    def __init__(self, route_of):
        super().__init__(convert_charrefs=False)
        self.out, self.route_of, self.pre = [], route_of, 0
        self.links = 0

    # --- tags -------------------------------------------------------------
    def handle_starttag(self, tag, attrs, self_closing=False):
        d = dict(attrs)
        link_to = None
        if tag == 'a' and 'href' in d:
            href = d['href'] or ''
            m = re.fullmatch(r'([a-z0-9-]+)\.html(#[\w-]+)?', href)
            if m:
                link_to = self.route_of(m.group(1)) + (m.group(2) or '')
                d.pop('href')
        name = 'Link' if link_to else tag
        parts = [name]
        if link_to:
            parts.append(f'to="{link_to}"')
            self.links += 1
        for k, v in attrs:
            if link_to and k == 'href': continue
            kl = k.lower()
            if kl == 'style' and v is not None:
                parts.append(f'style={{{style_obj(v)}}}'); continue
            jk = RENAME.get(kl, k if (k.startswith('data-') or k.startswith('aria-')) else kl)
            if v is None:
                parts.append(jk if jk in BOOL else f'{jk}=""')
            elif jk in BOOL and v in ('', jk, 'true'):
                parts.append(jk)
            else:
                parts.append(f'{jk}={json_str(v)}')
        close = ' />' if (tag in VOID or self_closing) else '>'
        self.out.append('<' + ' '.join(parts) + close)
        if tag == 'pre': self.pre += 1

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs, self_closing=True)

    def handle_endtag(self, tag):
        if tag in VOID: return
        if tag == 'pre': self.pre -= 1
        last = self.out[-1] if self.out else ''
        # <a href="x.html"> became <Link>; close it as one
        if tag == 'a':
            depth = 0
            for chunk in reversed(self.out):
                if chunk.startswith('</a>') or chunk.startswith('</Link>'): depth += 1
                elif chunk.startswith('<a ') or chunk.startswith('<a>'):
                    if depth == 0: self.out.append('</a>'); return
                    depth -= 1
                elif chunk.startswith('<Link'):
                    if depth == 0: self.out.append('</Link>'); return
                    depth -= 1
            self.out.append('</a>'); return
        self.out.append(f'</{tag}>')

    # --- text -------------------------------------------------------------
    def handle_data(self, data):
        if self.pre:
            # JSX collapses literal newlines inside <pre>; make them explicit
            if '\n' in data:
                keep = data.strip('\n') if data.strip() else data
                segs = keep.split('\n')
                self.out.append("{'" + "\\n".join(s.replace("\\","\\\\").replace("'","\\'") for s in segs) + "'}")
                return
        self.out.append(esc_text(data))

    def handle_entityref(self, name): self.out.append(f'&{name};')
    def handle_charref(self, name):   self.out.append(f'&#{name};')
    def handle_comment(self, data):   pass
    def handle_decl(self, decl):      pass

def convert(fragment, route_of):
    p = ToJsx(route_of)
    p.feed(fragment)
    p.close()
    return ''.join(p.out), p.links
