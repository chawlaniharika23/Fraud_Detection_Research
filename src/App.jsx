import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'

const transactions = [
  {
    id: 'TXN-7842-19',
    amount: '$4,850.00',
    type: 'International transfer',
    time: '02:14:08 UTC',
    balance: '$5,120.40',
    probability: 0.942,
    risk: 'high',
    explanation: 'The transfer would leave an unusually small balance and arrives at an atypical hour.',
    contributors: ['Large transfer', 'Low remaining balance', 'Unusual hour'],
  },
  {
    id: 'TXN-6241-05',
    amount: '$42.80',
    type: 'Card purchase',
    time: '14:32:41 UTC',
    balance: '$2,406.20',
    probability: 0.028,
    risk: 'low',
    explanation: 'The amount, timing and remaining balance align with this illustrative account pattern.',
    contributors: ['Routine amount', 'Typical hour', 'Balance within range'],
  },
]

const transactionFields = (transaction) => [
  { label: 'TRANSACTION AMOUNT', value: transaction.amount, featured: true },
  { label: 'TRANSACTION ID', value: transaction.id },
  { label: 'TRANSACTION TYPE', value: transaction.type },
  { label: 'TRANSACTION TIME', value: transaction.time },
  { label: 'ACCOUNT BALANCE', value: transaction.balance },
]

function Navbar() {
  return (
    <header className="navbar">
      <a className="wordmark" href="#overview" aria-label="Fraud Detection overview">FRAUD DETECTION<span>.</span></a>
      <nav className="nav-links" aria-label="Main navigation">
        <a href="#overview">Overview</a>
        <a href="#research">Research</a>
        <a href="#about">About</a>
      </nav>
      <a className="nav-cta" href="#research">Explore Dashboard <span aria-hidden="true">↗</span></a>
    </header>
  )
}

function AnimatedField({ field, index, phase, activeSignal, reducedMotion }) {
  const highlighted = activeSignal === index
  return (
    <motion.div
      className={'transaction-field' + (field.featured ? ' featured-field' : '') + (highlighted ? ' is-highlighted' : '')}
      initial={reducedMotion ? false : { opacity: 0, x: index % 2 === 0 ? -12 : 12, y: 5 }}
      animate={{ opacity: highlighted ? 1 : 0.82, x: 0, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.38,
        delay: phase === 'assembly' && !reducedMotion ? 0.28 + index * 0.17 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="field-label">{field.label}</span>
      <span className="field-value">{field.value}</span>
    </motion.div>
  )
}

function ScanningBeam({ active, reducedMotion }) {
  return (
    <motion.div
      className="scanning-beam"
      aria-hidden="true"
      initial={false}
      animate={active && !reducedMotion ? { opacity: [0, 1, 0.9, 0], y: [0, 55, 185, 285] } : { opacity: 0, y: 0 }}
      transition={active && !reducedMotion
        ? { duration: 2.2, ease: [0.4, 0, 0.2, 1], times: [0, 0.08, 0.78, 1] }
        : { duration: reducedMotion ? 0 : 0.2 }}
    />
  )
}

function RiskResult({ transaction, reducedMotion }) {
  const probability = (transaction.probability * 100).toFixed(1)
  return (
    <motion.section
      className={'risk-result risk-' + transaction.risk}
      aria-label="Illustrative analysis result"
      initial={reducedMotion ? false : { opacity: 0, height: 0, y: 10 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, height: 0, y: 7 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="result-topline">
        <span className="result-label">ILLUSTRATIVE CLASSIFICATION</span>
        <span className="probability-label">PROBABILITY <b>{probability}%</b></span>
      </div>
      <div className="result-main">
        <h3>{transaction.risk === 'high' ? 'HIGH RISK' : 'LOW RISK'}</h3>
        <span className="result-marker" aria-hidden="true" />
      </div>
      <p className="result-explanation">{transaction.explanation}</p>
      <div className="contributors">
        <span className="field-label">CONTRIBUTING SIGNALS</span>
        <span className="contributor-list">{transaction.contributors.join('  /  ')}</span>
      </div>
    </motion.section>
  )
}

function TransactionCard({ transaction, phase, activeSignal, score, scoreLabel, reducedMotion }) {
  const analyzing = phase === 'scanning' || phase === 'calculating'
  const fields = transactionFields(transaction)

  return (
    <motion.article
      className={'transaction-card risk-tone-' + transaction.risk}
      layout
      initial={reducedMotion ? false : { opacity: 0, x: 20, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: phase === 'result' ? 1.012 : 1 }}
      exit={reducedMotion ? undefined : { opacity: 0, x: -10, y: -8, scale: 0.99 }}
      transition={{ layout: { duration: reducedMotion ? 0 : 0.48 }, duration: reducedMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Illustrative transaction card"
    >
      <div className="card-heading">
        <div className="card-heading-left">
          <span className={'status-light' + (analyzing ? ' status-active' : '')} />
          <span>TRANSACTION REVIEW</span>
        </div>
        <span className="demo-tag">ILLUSTRATIVE DATA</span>
      </div>

      <div className="transaction-fields">
        {fields.map((field, index) => (
          <AnimatedField
            key={field.label}
            field={field}
            index={index}
            phase={phase}
            activeSignal={activeSignal}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      <ScanningBeam active={phase === 'scanning'} reducedMotion={reducedMotion} />

      <div className="score-section">
        <div className="score-heading">
          <span className="field-label">RISK SCORE</span>
          <motion.span className="score-value">{scoreLabel}</motion.span>
        </div>
        <div className="score-track" aria-label="Illustrative risk probability progress">
          <motion.div className="score-fill" style={{ scaleX: score }} />
        </div>
        <div className="analysis-status" aria-live="polite">
          <span className="status-light" />
          <span>{phase === 'scanning' || phase === 'calculating' ? 'ANALYSING TRANSACTION' : phase === 'result' ? 'ANALYSIS COMPLETE' : phase === 'handoff' ? 'NEXT TRANSACTION' : 'ASSEMBLING TRANSACTION'}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'result' && (
          <RiskResult key={transaction.id} transaction={transaction} reducedMotion={reducedMotion} />
        )}
      </AnimatePresence>
    </motion.article>
  )
}

function TransactionAnimation({ reducedMotion }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [phase, setPhase] = useState('assembly')
  const [activeSignal, setActiveSignal] = useState(-1)
  const [cardVisible, setCardVisible] = useState(true)
  const score = useMotionValue(0)
  const scoreLabel = useTransform(score, (value) => (value * 100).toFixed(1) + '%')
  const transaction = transactions[activeIndex]

  useEffect(() => {
    if (reducedMotion) {
      setPhase('result')
      setActiveSignal(-1)
      setCardVisible(true)
      score.set(transaction.probability)
      return undefined
    }

    const timers = []
    const schedule = (delay, action) => timers.push(window.setTimeout(action, delay))
    setPhase('assembly')
    setActiveSignal(-1)
    setCardVisible(true)
    score.set(0)

    schedule(2200, () => setPhase('scanning'))
    ;[2500, 2920, 3340, 3760, 4180].forEach((time, index) => {
      schedule(time, () => setActiveSignal(index))
    })
    schedule(4450, () => {
      setActiveSignal(-1)
      setPhase('calculating')
    })
    schedule(6250, () => setPhase('result'))
    schedule(11100, () => {
      setPhase('handoff')
      setCardVisible(false)
    })

    return () => timers.forEach(window.clearTimeout)
  }, [activeIndex, reducedMotion, score])

  useEffect(() => {
    if (phase === 'assembly') {
      score.set(0)
      return undefined
    }
    if (phase === 'calculating') {
      const controls = animate(score, transaction.probability, { duration: reducedMotion ? 0 : 1.55, ease: 'easeOut' })
      return () => controls.stop()
    }
    if (phase === 'result' && reducedMotion) score.set(transaction.probability)
    return undefined
  }, [phase, transaction, reducedMotion, score])

  const advanceTransaction = () => {
    setActiveIndex((current) => (current + 1) % transactions.length)
  }

  return (
    <section className="analysis-shell" id="research" aria-label="Illustrative transaction analysis">
      <div className="analysis-topline">
        <span>LIVE TRANSACTION REVIEW</span>
        <span className="system-status"><i />SYSTEM STATUS: OPERATIONAL</span>
      </div>
      <div className={'analysis-stage' + (phase === 'scanning' || phase === 'calculating' ? ' is-active' : '')}>
        <div className="ambient-light" aria-hidden="true" />
        <div className="stage-corner stage-corner-tl" aria-hidden="true" />
        <div className="stage-corner stage-corner-br" aria-hidden="true" />
        <AnimatePresence mode="wait" onExitComplete={advanceTransaction}>
          {cardVisible && (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              phase={phase}
              activeSignal={activeSignal}
              score={score}
              scoreLabel={scoreLabel}
              reducedMotion={reducedMotion}
            />
          )}
        </AnimatePresence>
      </div>
      <p className="prototype-note" id="about">Fraud Detection is a research prototype. All transaction details and risk values shown are illustrative, not trained-model predictions.</p>
    </section>
  )
}

function HeroSection({ reducedMotion }) {
  return (
    <section className="hero" id="overview" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">FINANCIAL INTELLIGENCE <span>/</span> FRAUD DETECTION</p>
        <h1 id="hero-title">Every transaction<br />tells a <em>story.</em></h1>
        <p className="hero-description">An intelligent approach to identifying suspicious financial activity through machine learning.</p>
        <div className="hero-actions">
          <a className="button-primary" href="#research">Explore the Platform <span aria-hidden="true">↗</span></a>
          <a className="button-secondary" href="#research">How It Works <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-footnote"><span className="footnote-rule" />RESEARCH-LED TRANSACTION INTELLIGENCE</div>
      </div>
      <TransactionAnimation reducedMotion={reducedMotion} />
    </section>
  )
}

export default function LandingPage() {
  const reducedMotion = useReducedMotion()
  return (
    <main className="page-shell">
      <Navbar />
      <HeroSection reducedMotion={reducedMotion} />
    </main>
  )
}
