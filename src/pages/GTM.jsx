import { Button, Tabs, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ExportOutlined } from '@ant-design/icons'
import { isLearnHost, MAIN_SITE } from '../hostMode'

const { Title, Paragraph, Text } = Typography

const GTM_SCENES = [
  { t: '0:00', scene: 'Hook', screen: '“Your teams are already using AI. Do you know what’s leaving?”',
    vo: 'Your teams are already using AI. The question isn’t whether — it’s what’s leaving your perimeter when they do.' },
  { t: '0:08', scene: 'The problem', screen: 'Licence gap · blocking backfires · no evidence',
    vo: 'Enterprise AI licences cover people in a browser — not your applications and agents calling model APIs directly. Traditional DLP just blocks, so people switch to personal devices. And when the auditor asks, there’s no evidence either way.' },
  { t: '0:20', scene: 'Brand reveal', screen: 'GovernVeil — AI data-egress control & evidence. Self-hosted.',
    vo: 'GovernVeil is AI data-egress control and evidence — self-hosted, running entirely inside your own environment.' },
  { t: '0:27', scene: 'How it works', screen: 'Apps / people → gateway (access check + detection ladder) → provider',
    vo: 'Point your apps at one base URL. Every request passes an access check and a local detection ladder — one policy-adaptive model, every policy written as a plain-language question. Each request ends in a verdict — and every verdict is audited.' },
  { t: '0:43', scene: 'Verdicts in action', screen: 'Clean → allow · SSN in prompt → redact · injection → block',
    vo: 'A clean request is forwarded untouched in milliseconds. A prompt carrying a customer’s Social Security number goes out with the PII stripped — the real value never leaves. And a prompt-injection attempt is blocked cold, with a 403 that never crosses your perimeter.' },
  { t: '0:58', scene: 'The audit log', screen: 'Who · route · policy · verdict · latency — each entry’s hash chains to the last',
    vo: 'Every one of those verdicts lands in the audit log: who, what, which policy, the verdict, the latency. Each entry carries the previous entry’s hash — tamper with one line and the chain breaks. Export it straight to your SIEM.' },
  { t: '1:11', scene: 'Proof', screen: '0 false positives · millisecond checks · control-mapped evidence',
    vo: 'The benchmarks are in the repo — re-run them yourself. Zero false positives on a hard PII lookalike set — order IDs and license keys shaped like real identifiers. Millisecond-scale checks, with the methodology published. Evidence mapped to the controls your auditor actually names.' },
  { t: '1:21', scene: 'Close', screen: '“See it govern a real prompt in 90 seconds.” · Book a pilot · governveil.com',
    vo: 'See it govern a real prompt in ninety seconds. Book a pilot at governveil dot com.' },
]

export default function GTM() {
  const learn = isLearnHost()
  const pilotHref = learn ? `${MAIN_SITE}/#/pilot` : '/pilot'

  return (
    <>
      <section className="ed-hero learn-hero">
        <div className="wrap">
          <Text className="eyebrow-label">Go-to-market · the explainer</Text>
          <Title className="fig-h1" style={{ maxWidth: 780 }}>
            The whole story, in ninety seconds.
          </Title>
          <Paragraph className="fig-lede" style={{ maxWidth: 720 }}>
            The problem, how GovernVeil sits in the request path, three live verdicts, the
            tamper-evident audit log, and the proof — one explainer reel. Watch it, or read the
            shot-by-shot storyboard and voiceover.
          </Paragraph>
        </div>
      </section>

      <section className="ed-section">
        <div className="wrap ed-top">
          <Tabs
            className="gtm-tabs"
            defaultActiveKey="watch"
            items={[
              {
                key: 'watch',
                label: 'Watch (90s)',
                children: (
                  <>
                    <div className="gtm-video">
                      <iframe
                        src="/gtm/explainer.html"
                        title="GovernVeil GTM explainer"
                        loading="lazy"
                        allowFullScreen
                      />
                    </div>
                    <div className="gtm-controls">
                      <a href="/gtm/explainer.html" target="_blank" rel="noreferrer">
                        Open fullscreen <ExportOutlined />
                      </a>
                      <Text type="secondary">
                        In the reel: <b>Play</b> to start · <b>Space</b> pause · <b>←/→</b> jump
                        scenes · <b>R</b> restart · <b>H</b> hide controls.
                      </Text>
                    </div>
                  </>
                ),
              },
              {
                key: 'storyboard',
                label: 'Storyboard & voiceover',
                children: (
                  <ol className="gtm-board">
                    {GTM_SCENES.map((s) => (
                      <li key={s.t} className="gtm-scene">
                        <div className="gtm-scene-head">
                          <span className="gtm-time">{s.t}</span>
                          <Text strong>{s.scene}</Text>
                        </div>
                        <div className="gtm-screen"><span className="gtm-lbl">On screen</span>{s.screen}</div>
                        <Paragraph className="gtm-vo"><span className="gtm-lbl">Voiceover</span>{s.vo}</Paragraph>
                      </li>
                    ))}
                  </ol>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="band-red ed-cta">
        <div className="wrap">
          <Title level={2} className="ed-huge on-red">Now see it govern a real prompt<br />in 90 seconds.</Title>
          {learn ? (
            <a href={pilotHref}><Button size="large" className="btn-on-red">Book a design-partner pilot</Button></a>
          ) : (
            <Link to="/pilot"><Button size="large" className="btn-on-red">Book a design-partner pilot</Button></Link>
          )}
          <Paragraph className="cta-note">3–5 design-partner slots per cohort.</Paragraph>
        </div>
      </section>
    </>
  )
}
