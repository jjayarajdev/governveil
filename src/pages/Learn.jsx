import { Button, Col, Collapse, Row, Space, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined, ExportOutlined } from '@ant-design/icons'
import Reveal from '../components/Reveal'

const { Title, Paragraph, Text } = Typography

function Kicker({ children }) {
  return <Text className="eyebrow-label">{children}</Text>
}

/* An embedded, interactive Archify diagram (pan / zoom / present mode preserved). */
function Diagram({ src, title, caption, height = 540 }) {
  return (
    <figure className="dgm-frame">
      <iframe src={`/diagrams/${src}`} title={title} loading="lazy" style={{ height }} />
      <figcaption className="dgm-cap">
        <span>{caption}</span>
        <a href={`/diagrams/${src}`} target="_blank" rel="noreferrer">
          Open full <ExportOutlined />
        </a>
      </figcaption>
    </figure>
  )
}

/* ---------- intro ---------- */

function Intro() {
  return (
    <section className="ed-hero learn-hero">
      <div className="wrap">
        <Kicker>The GovernVeil field guide</Kicker>
        <Title className="fig-h1" style={{ maxWidth: 780 }}>
          How AI governance actually works — from one prompt to a court-ready record.
        </Title>
        <Paragraph className="fig-lede" style={{ maxWidth: 720 }}>
          Not a brochure. Seven chapters that trace a real request through a real
          system: what inspects it, how a decision is made, why the order of
          operations <em>is</em> the guarantee, and how every action becomes
          evidence. Each chapter is built around the same interactive diagrams our
          engineers work from — open, pan, and zoom them as you read.
        </Paragraph>
        <ol className="syllabus">
          <li><a href="#big-picture"><b>01</b> The big picture — where GovernVeil sits, and why</a></li>
          <li><a href="#request"><b>02</b> Life of a request — the eleven steps of enforcement</a></li>
          <li><a href="#evidence"><b>03</b> From detection to evidence — the data pipeline</a></li>
          <li><a href="#masking"><b>04</b> Reversible masking, up close — the core mechanism</a></li>
          <li><a href="#vendors"><b>05</b> Governing vendors &amp; agents — a credential’s whole life</a></li>
          <li><a href="#documents"><b>06</b> Files are prompts too — the upload runbook</a></li>
          <li><a href="#responsible"><b>07</b> Responsible AI — the principles, as mechanisms</a></li>
        </ol>
      </div>
    </section>
  )
}

/* ---------- chapter shell ---------- */

function Chapter({ id, num, kicker, title, lead, children }) {
  return (
    <section className="ed-section chapter" id={id}>
      <div className="wrap ed-top">
        <div className="ch-head">
          <span className="ch-num">{num}</span>
          <div>
            <Kicker>{kicker}</Kicker>
            <Title level={2} className="ed-h2" style={{ marginTop: 4 }}>{title}</Title>
          </div>
        </div>
        <Paragraph className="learn-lead">{lead}</Paragraph>
        {children}
      </div>
    </section>
  )
}

function Point({ n, title, children }) {
  return (
    <div className="cap-ed">
      <div className="cap-line">
        <Text className="cap-num">{n}</Text>
        <Title level={4}>{title}</Title>
      </div>
      <Paragraph>{children}</Paragraph>
    </div>
  )
}

function Why({ children }) {
  return (
    <div className="why-box">
      <Text className="why-tag">Why it’s built this way</Text>
      <Paragraph style={{ marginBottom: 0 }}>{children}</Paragraph>
    </div>
  )
}

/* ================================================================= */

export default function Learn() {
  return (
    <>
      <Intro />

      {/* 01 ------------------------------------------------------- */}
      <Chapter
        id="big-picture" num="01" kicker="Chapter 1 · Architecture"
        title="Where GovernVeil sits, and why"
        lead="GovernVeil is a checkpoint every AI request passes through — running inside your own network. It is one gateway with two enforcement planes over a single detection ladder, and it never lets a prompt reach an outside model before a decision is made and recorded."
      >
        <Reveal>
          <Diagram src="gateway-architecture.html" title="Gateway architecture"
            caption="The gateway topology — apps → gateway → fast-path / ML / policy / ledger → providers, all inside your VPC." />
        </Reveal>
        <Row gutter={[48, 32]} style={{ marginTop: 8 }}>
          <Col xs={24} md={8}><Reveal><Point n="A" title="Two planes, one ladder">
            The <b>access plane</b> gates <em>who</em> may call <em>which</em> enterprise API by role and scope, before a request is forwarded. The <b>content plane</b> inspects the <em>payload</em>. Both draw on the same detection ladder, so policy is consistent across them.
          </Point></Reveal></Col>
          <Col xs={24} md={8}><Reveal delay={0.05}><Point n="B" title="A Go reverse proxy">
            The gateway is an OpenAI-compatible reverse proxy on <Text code>:8080</Text>. Your apps keep speaking the API they already use; you change a base URL, not your code. Agents, SDKs, and the browser guard all funnel through it.
          </Point></Reveal></Col>
          <Col xs={24} md={8}><Reveal delay={0.1}><Point n="C" title="Everything in your VPC">
            Fast-path filters, ML detectors, the policy engine, and the audit ledger all run inside your boundary. There is no vendor cloud in the path — which is what makes “where does the prompt go for a verdict?” answerable with <em>nowhere</em>.
          </Point></Reveal></Col>
        </Row>
        <Why>
          Placing detection <em>and</em> evidence inside the same boundary as the proxy is a deliberate choice: it makes data residency a property of the architecture, not a promise in a contract. Nothing is sent out to be scored, so the same deployment works air-gapped.
        </Why>
      </Chapter>

      {/* 02 ------------------------------------------------------- */}
      <Chapter
        id="request" num="02" kicker="Chapter 2 · The request path"
        title="Life of a request — eleven steps"
        lead="Follow a single prompt from an app to the model and back. The sequence matters: each step happens in a specific order because the order is what turns “we inspected it” into “we can prove it, and nothing sensitive ever left.”"
      >
        <Reveal>
          <Diagram src="request-lifecycle.html" title="Enforcement request lifecycle" height={560}
            caption="One prompt, end to end: scan → escalate → decide → sign → forward masked → restore." />
        </Reveal>
        <Row gutter={[48, 28]} style={{ marginTop: 8 }}>
          <Col xs={24} md={12}><Reveal><Point n="1–3" title="Fast path first (a few ms)">
            The app POSTs <Text code>/v1/chat/completions</Text>. The gateway runs a <b>regex / keyword DLP scan</b> first — cheap and instant. Obvious identifiers and secrets are caught here before any expensive model runs. In our example it returns a <b>PII hit</b>.
          </Point></Reveal></Col>
          <Col xs={24} md={12}><Reveal delay={0.05}><Point n="4–5" title="Escalate to ML — selectively">
            Only when it needs to does the gateway <b>escalate</b> to the transformer detectors for PII, prompt-injection, harm, and toxicity <b>scores</b>. Running the model selectively — not on every token of every request — is the cost and latency lever.
          </Point></Reveal></Col>
          <Col xs={24} md={12}><Reveal><Point n="6–7" title="One policy decision">
            Signals from the fast path and scores from the ML ladder go to the <b>policy engine</b>, which evaluates the rule chain and returns a single action: <b>allow / review / redact / block</b>. Here: <Text code>redact</Text>.
          </Point></Reveal></Col>
          <Col xs={24} md={12}><Reveal delay={0.05}><Point n="8" title="Sign before you send">
            The decision is <b>appended to the audit ledger, signed and hash-chained — before the request is forwarded</b>. This is the evidence invariant: nothing reaches a provider until the record of what we decided already exists.
          </Point></Reveal></Col>
          <Col xs={24} md={12}><Reveal><Point n="9–10" title="Forward masked">
            The gateway forwards to the provider with the sensitive span replaced by a surrogate. <b>The provider sees the stand-in, never the real value.</b> The completion comes back.
          </Point></Reveal></Col>
          <Col xs={24} md={12}><Reveal delay={0.05}><Point n="11" title="Restore on return">
            On the way back to the authorised caller, surrogates are swapped for the real values — a full round trip — and the app gets a normal <Text code>200</Text>. The work completed; nothing sensitive left the perimeter.
          </Point></Reveal></Col>
        </Row>
        <Why>
          Read steps 8 → 9 again. Signing <em>before</em> forwarding is not an implementation detail — it is the whole point. A system that forwards first and logs later can lose the record exactly when it matters. Sign-before-send means the evidence can never be “missing” for a request that actually happened.
        </Why>
      </Chapter>

      {/* 03 ------------------------------------------------------- */}
      <Chapter
        id="evidence" num="03" kicker="Chapter 3 · Detection → evidence"
        title="How a verdict becomes a record you can defend"
        lead="A decision is only useful if it leaves a trail. This is the pipeline that turns each request into two things at once: a tamper-evident audit record, and an operational stream your team can watch."
      >
        <Reveal>
          <Diagram src="detection-dataflow.html" title="Detection and evidence data flow"
            caption="Five stages — Ingest → Inspect → Decide → Store → Consume — and where the two data stores diverge." />
        </Reveal>
        <Row gutter={[48, 28]} style={{ marginTop: 8 }}>
          <Col xs={24} md={12}><Reveal><Point n="1" title="Ingest & Inspect">
            The prompt plus its context enters, and is inspected two ways in parallel: the <b>fast-path filter</b> (regex DLP) and, on escalation, the <b>ML detector ladder</b> (the transformer). Cheap-and-certain runs always; expensive-and-nuanced runs when warranted.
          </Point></Reveal></Col>
          <Col xs={24} md={12}><Reveal delay={0.05}><Point n="2" title="Decide">
            The <b>policy engine</b> folds the fast-path signals and ML scores into one signed decision. This is the single place “what should happen” is resolved — so every downstream record agrees.
          </Point></Reveal></Col>
          <Col xs={24} md={12}><Reveal><Point n="3" title="Store — two destinations">
            The signed decision lands in <Text code>audit_logs</Text> — the <b>hash-chained ledger</b>, the record of truth. Interceptions also fan out to <Text code>dlp_alerts</Text> — the <b>operational stream</b>. Same event, two shapes.
          </Point></Reveal></Col>
          <Col xs={24} md={12}><Reveal delay={0.05}><Point n="4" title="Consume">
            The <b>console</b> reads the ledger for review and export; <b>analytics</b> computes windowed statistics from the ledger and categorises the alert stream. Evidence for auditors; trends for operators.
          </Point></Reveal></Col>
        </Row>
        <Why>
          Two stores, two jobs. <Text code>audit_logs</Text> is immutable and hash-chained because its consumer is an auditor who needs to trust that nothing was altered after the fact. <Text code>dlp_alerts</Text> is a fast, mutable stream because its consumer is an analyst who needs to see what’s happening now. Conflating them would weaken both.
        </Why>
      </Chapter>

      {/* 04 ------------------------------------------------------- */}
      <Chapter
        id="masking" num="04" kicker="Chapter 4 · The core mechanism"
        title="Reversible masking, up close"
        lead="Most tools give you a choice: let the sensitive prompt through, or block the user and stop the work. Reversible masking refuses that trade-off. Here is exactly how it protects the data without breaking the task."
      >
        <Row gutter={[48, 28]}>
          <Col xs={24} md={12}><Reveal><Point n="1" title="Format-preserving surrogates">
            A sensitive value is replaced with a realistic stand-in <em>of the same shape</em> — a PAN becomes another valid-looking PAN, an email another email. The model still reasons over structure (“this is an identifier”, “this is a recipient”), so the answer is still useful.
          </Point></Reveal></Col>
          <Col xs={24} md={12}><Reveal delay={0.05}><Point n="2" title="Deterministic, per conversation">
            The same real value always maps to the same surrogate (via a keyed derivation), so if a value appears twice the model sees consistency, not two unrelated tokens. Coherence is preserved without the real data.
          </Point></Reveal></Col>
          <Col xs={24} md={12}><Reveal><Point n="3" title="Persist-before-emit">
            The surrogate → real mapping is written to a durable vault, <b>encrypted (AES-256-GCM), before anything is forwarded</b>. If that write fails, the system falls back to destructive redaction — so a value can never be masked-but-unrecoverable. Nothing masked leaves without its mapping safely stored.
          </Point></Reveal></Col>
          <Col xs={24} md={12}><Reveal delay={0.05}><Point n="4" title="Restore — and where it stops">
            On your applications’ API calls, the response is rehydrated: surrogates swap back to real values for the authorised caller — a full round trip. For browser / shadow-AI use, masking is <b>outbound-only</b> (stand-ins stay on screen). We label which path restores, plainly. <Tag className="roadmap-inline">restore path: API today</Tag>
          </Point></Reveal></Col>
        </Row>
        <Why>
          The persist-before-emit invariant is the quiet hero. It means reversibility is a guarantee, not a hope: the only way a surrogate can leave the perimeter is if its mapping is already encrypted and stored. Privacy and recoverability stop being in tension.
        </Why>
      </Chapter>

      {/* 05 ------------------------------------------------------- */}
      <Chapter
        id="vendors" num="05" kicker="Chapter 5 · Access governance"
        title="A credential’s whole life — not fire-and-forget"
        lead="Third-party AI vendors and agents get credentials into your systems. The risk isn’t the day you issue one — it’s the 300 days after, when it’s forgotten, over-used, or quietly compromised. GovernVeil tracks every grant through its full lifecycle."
      >
        <Reveal>
          <Diagram src="vendor-grant.html" title="Vendor grant lifecycle" height={560}
            caption="Eleven states across four lanes — grant, idle-and-watch, incident response, and the terminal exits." />
        </Reveal>
        <Row gutter={[48, 28]} style={{ marginTop: 8 }}>
          <Col xs={24} md={8}><Reveal><Point n="→" title="The healthy path">
            <b>Issued → Active → Monitored → Attested → Governed.</b> A credential is minted, starts carrying attributed traffic, builds a usage baseline, passes a re-attestation gate, and settles into “within policy.” Each step is a checkpoint, not a rubber stamp.
          </Point></Reveal></Col>
          <Col xs={24} md={8}><Reveal delay={0.05}><Point n="⏸" title="Idle & watch">
            A grant idle for <b>60 days</b> goes <b>Dormant</b>, then auto-expires to <b>Lapsed</b> — forgotten credentials close themselves. A usage <b>spike</b> moves a governed grant to <b>Flagged / Watched</b>, and a review can return it to <b>Cleared</b>.
          </Point></Reveal></Col>
          <Col xs={24} md={8}><Reveal delay={0.1}><Point n="⚑" title="Incident response">
            Anomalous use opens an <b>Incident</b> with a <b>14-day clock</b> — a forcing function, so nothing lingers unresolved. The <b>kill-switch</b> moves it straight to <b>Revoked</b>, enforced inline in well under a millisecond.
          </Point></Reveal></Col>
        </Row>
        <Why>
          Two mechanisms do the heavy lifting: <b>dormancy</b> (idle grants expire themselves, shrinking the attack surface no one is watching) and the <b>incident clock</b> (an open incident must be resolved, not ignored). Together they turn access governance from a one-time approval into a living control.
        </Why>
      </Chapter>

      {/* 06 ------------------------------------------------------- */}
      <Chapter
        id="documents" num="06" kicker="Chapter 6 · Document safety"
        title="Files are prompts too"
        lead="A user doesn’t only type into AI — they upload. A document can carry what a prompt can’t: hidden text, Office/OOXML tricks, macros, embedded PDF JavaScript. This runbook stops a poisoned file before it reaches an LLM or a RAG pipeline."
      >
        <Reveal>
          <Diagram src="document-review.html" title="Document quarantine runbook"
            caption="Three phases — parse + scan → score + route → reviewer decision — with a quarantine lane for risky files." />
        </Reveal>
        <Row gutter={[48, 28]} style={{ marginTop: 8 }}>
          <Col xs={24} md={8}><Reveal><Point n="1" title="Parse + scan">
            An uploaded file inside an AI request is parsed structurally, its payload swept for hidden/active content, and its text checked for PII — before it is ever handed to a model.
          </Point></Reveal></Col>
          <Col xs={24} md={8}><Reveal delay={0.05}><Point n="2" title="Score + route">
            A risk verdict routes the file: <b>clean → Allow</b> (forwarded normally), <b>risky → Quarantine</b> and on to a human reviewer. The safe path stays fast; only the ambiguous stops.
          </Point></Reveal></Col>
          <Col xs={24} md={8}><Reveal delay={0.1}><Point n="3" title="Reviewer decision">
            The reviewer <b>Releases</b> (a logged decision) or <b>Blocks</b> (the file is retained and held). Either way the outcome is recorded — the same evidence discipline as the request path.
          </Point></Reveal></Col>
        </Row>
        <Why>
          The default for an ambiguous file is <em>quarantine</em>, not <em>allow</em> — but with a fast human path so it doesn’t stall real work. Fail toward caution, then let a person resolve it quickly.
        </Why>
      </Chapter>

      {/* 07 ------------------------------------------------------- */}
      <Chapter
        id="responsible" num="07" kicker="Chapter 7 · Responsible AI"
        title="The principles, as mechanisms"
        lead="“Responsible AI” is usually a slide. Everything in the previous six chapters adds up to it as running software — each principle the board asks about maps to a mechanism you can point at."
      >
        <Reveal>
          <Diagram src="responsible-ai.html" title="Responsible AI by design"
            caption="A prompt flowing through the controls, all inside your environment, each mapped to a principle." />
        </Reveal>
        <Row gutter={[48, 24]} style={{ marginTop: 8 }}>
          {[
            ['Sovereign', 'Local inference in your environment (Ch.1) — the prompt is scored nowhere but here.'],
            ['Private', 'Reversible masking (Ch.4) — data protected before the model, restored for the authorised caller.'],
            ['Explainable', 'Every verdict carries a reason, the detector that fired, and a confidence (Ch.2–3).'],
            ['Accountable', 'The signed, hash-chained ledger (Ch.2–3) — a record you can defend.'],
            ['Overseen', 'Graduated verdicts, a review queue, the incident clock and kill-switch (Ch.5–6).'],
          ].map(([k, v], i) => (
            <Col xs={24} md={12} key={k}><Reveal delay={(i % 2) * 0.05}>
              <Title level={5} className="ed-t3" style={{ marginBottom: 4 }}>{k}</Title>
              <Paragraph className="ed-body" style={{ marginBottom: 0 }}>{v}</Paragraph>
            </Reveal></Col>
          ))}
        </Row>
      </Chapter>

      {/* recap FAQ + glossary ------------------------------------- */}
      <section className="ed-section">
        <div className="wrap ed-top">
          <Kicker>Loose ends</Kicker>
          <Title level={2} className="ed-h2" style={{ maxWidth: 520 }}>Questions &amp; terms.</Title>
          <Reveal>
            <Collapse bordered={false} expandIconPosition="end" className="learn-faq"
              style={{ marginTop: 16, background: 'transparent' }}
              items={[
                { key: '1', label: <Text strong>Does this replace ChatGPT Enterprise or Copilot?</Text>,
                  children: <Paragraph className="ed-body" style={{ marginBottom: 0 }}>No — it’s additive. Those cover people in a browser; GovernVeil covers your applications and agents calling model APIs directly, plus the personal accounts staff still use.</Paragraph> },
                { key: '2', label: <Text strong>Will it break my users’ workflows?</Text>,
                  children: <Paragraph className="ed-body" style={{ marginBottom: 0 }}>That’s the design (Ch.4): it redacts the sensitive value and lets the work continue, rather than walling the user off.</Paragraph> },
                { key: '3', label: <Text strong>Can it run air-gapped?</Text>,
                  children: <Paragraph className="ed-body" style={{ marginBottom: 0 }}>Yes — detection and evidence both run inside your boundary (Ch.1), so there is no external dependency in the request path.</Paragraph> },
                { key: '4', label: <Text strong>Glossary: the words behind the category</Text>,
                  children: (
                    <div className="ed-body">
                      <p><b>Reversible masking</b> — swap a sensitive value for a realistic stand-in, then restore it for the authorised caller. <b>Shadow AI</b> — AI tools used outside IT’s visibility. <b>Sovereignty / residency</b> — prompts and the AI that inspects them stay inside your boundary. <b>Graduated verdicts</b> — allow / review / redact / block, not on/off. <b>Hash-chained ledger</b> — each audit entry cryptographically linked to the last, so records can’t be altered after the fact. <b>Dormancy / incident clock</b> — idle grants expire; open incidents must be resolved.</p>
                    </div>
                  ) },
              ]} />
          </Reveal>
        </div>
      </section>

      {/* CTA ------------------------------------------------------ */}
      <section className="band-red ed-cta">
        <div className="wrap">
          <Title level={2} className="ed-huge on-red">Now see it govern a real prompt<br />in 90 seconds.</Title>
          <Link to="/pilot"><Button size="large" className="btn-on-red">Book a design-partner pilot</Button></Link>
          <Paragraph className="cta-note">3–5 design-partner slots per cohort.</Paragraph>
        </div>
      </section>
    </>
  )
}
