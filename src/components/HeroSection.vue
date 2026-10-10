<template>
  <section class="hero-section">
    <!-- Ambient Background Glow Elements -->
    <div class="ambient-glow glow-top"></div>
    <div class="ambient-glow glow-right"></div>
    <div class="ambient-glow glow-left"></div>

    <div class="container hero-container">
      <!-- Eyebrow Pill -->
      <div class="hero-eyebrow-wrapper">
        <div class="hero-eyebrow">
          <span class="live-dot"></span>
          <span>THE ANNUAL INTER-COLLEGIATE FESTIVAL • NOV 14–16, 2026</span>
        </div>
      </div>

      <!-- Main Headline & Expressive Accent Phrase -->
      <div class="hero-text-block">
        <h1 class="hero-main-title">
          FEEL THE <span class="text-glow-gradient">ENERGY.</span>
        </h1>
        <p class="hero-accent-phrase">
          “Make memories that echo forever.”
        </p>
        <p class="hero-subtext">
          Where supreme rhythm meets bleeding-edge tech. Over 35 flagship competitions, 
          ₹5,00,000+ prize pool, and three explosive celebrity pro nights under the campus stars.
        </p>
      </div>

      <!-- Hero Call-to-Actions -->
      <div class="hero-cta-group">
        <a href="#events" class="btn-primary hero-btn-main">
          <span>Explore Events</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </a>

        <button class="btn-secondary hero-btn-pass" @click="openPassModal(null)">
          <span>🎟️ Claim Festival Pass</span>
        </button>

        <a href="#pro-nights" class="hero-watch-link">
          <div class="play-icon-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <span>Pro Nights Lineup</span>
        </a>
      </div>

      <!-- Live Festival Countdown Timer -->
      <div class="countdown-panel glass-panel">
        <div class="countdown-header">
          <span class="countdown-tag">COUNTDOWN TO KICK-OFF</span>
          <span class="countdown-date">MAIN GATES OPEN: NOV 14, 2026 • 09:00 AM</span>
        </div>
        <div class="countdown-grid">
          <div class="timer-card">
            <span class="timer-num">{{ countdown.days }}</span>
            <span class="timer-label">DAYS</span>
          </div>
          <span class="timer-colon">:</span>
          <div class="timer-card">
            <span class="timer-num">{{ countdown.hours }}</span>
            <span class="timer-label">HOURS</span>
          </div>
          <span class="timer-colon">:</span>
          <div class="timer-card">
            <span class="timer-num">{{ countdown.minutes }}</span>
            <span class="timer-label">MINUTES</span>
          </div>
          <span class="timer-colon">:</span>
          <div class="timer-card">
            <span class="timer-num">{{ countdown.seconds }}</span>
            <span class="timer-label">SECONDS</span>
          </div>
        </div>
      </div>

      <!-- Festival Highlights Stat Strip -->
      <div class="stats-strip">
        <div class="stat-item">
          <span class="stat-number">35+</span>
          <span class="stat-title">Flagship Events</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">₹5.0L+</span>
          <span class="stat-title">Cash Prizes</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">15K+</span>
          <span class="stat-title">Expected Footfall</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">03</span>
          <span class="stat-title">Concert Nights</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FESTIVAL_INFO } from '../data/eventsData'
import { useFestoraState } from '../composables/useFestoraState'

const { openPassModal } = useFestoraState()

const countdown = ref({
  days: '34',
  hours: '22',
  minutes: '15',
  seconds: '40'
})

let timerInterval = null

const updateCountdown = () => {
  const festDate = new Date(FESTIVAL_INFO.startDate).getTime()
  const now = new Date().getTime()
  const diff = festDate - now

  if (diff <= 0) {
    countdown.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
    return
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24))
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((diff % (1000 * 60)) / 1000)

  countdown.value = {
    days: String(d).padStart(2, '0'),
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0')
  }
}

onMounted(() => {
  updateCountdown()
  timerInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 130px;
  padding-bottom: 70px;
  overflow: hidden;
}

/* Ambient glow blobs */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
}

.glow-top {
  width: 600px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%);
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
}

.glow-right {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%);
  top: 25%;
  right: -120px;
}

.glow-left {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
  top: 40%;
  left: -150px;
}

.hero-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Eyebrow */
.hero-eyebrow-wrapper {
  margin-bottom: 24px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
  background: rgba(168, 85, 247, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--accent-lavender);
  box-shadow: 0 0 25px rgba(168, 85, 247, 0.2);
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
  animation: pulseSubtle 1.8s infinite;
}

/* Typography */
.hero-text-block {
  max-width: 950px;
  margin-bottom: 36px;
}

.hero-main-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7.8vw, 6.2rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.text-glow-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #c084fc 45%, #f472b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  filter: drop-shadow(0 0 35px rgba(168, 85, 247, 0.55));
}

.hero-accent-phrase {
  font-family: var(--font-quote);
  font-style: italic;
  font-size: clamp(1.4rem, 3.2vw, 2.3rem);
  font-weight: 400;
  color: #f5d0fe;
  margin-bottom: 18px;
  letter-spacing: 0.01em;
  text-shadow: 0 0 20px rgba(236, 72, 153, 0.4);
}

.hero-subtext {
  max-width: 680px;
  margin: 0 auto;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  color: var(--text-secondary);
  line-height: 1.65;
}

/* CTA Group */
.hero-cta-group {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 48px;
}

.hero-btn-main {
  padding: 15px 34px;
  font-size: 1.02rem;
}

.hero-btn-pass {
  padding: 15px 30px;
  font-size: 1.02rem;
}

.hero-watch-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  color: var(--accent-lavender);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.hero-watch-link:hover {
  color: #ffffff;
}

.play-icon-box {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-lavender);
  transition: all 0.25s ease;
}

.hero-watch-link:hover .play-icon-box {
  transform: scale(1.15);
  background: var(--accent-purple);
  color: white;
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.6);
}

/* Countdown Panel */
.countdown-panel {
  width: 100%;
  max-width: 660px;
  padding: 24px 32px;
  border-radius: var(--radius-xl);
  margin-bottom: 40px;
  background: rgba(18, 14, 38, 0.6);
  border: 1px solid rgba(168, 85, 247, 0.25);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), inset 0 0 30px rgba(139, 92, 246, 0.1);
}

.countdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.countdown-tag {
  color: #c084fc;
}

.countdown-date {
  color: var(--text-dim);
}

.countdown-grid {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.timer-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
}

.timer-num {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  text-shadow: 0 0 18px rgba(168, 85, 247, 0.5);
}

.timer-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  margin-top: 6px;
}

.timer-colon {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: rgba(168, 85, 247, 0.5);
  margin-top: -16px;
}

/* Stats Strip */
.stats-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 16px 36px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 9999px;
  backdrop-filter: blur(10px);
}

.stat-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.stat-number {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 800;
  color: #ffffff;
}

.stat-title {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
}

/* Media Queries */
@media (max-width: 768px) {
  .hero-section {
    padding-top: 110px;
    padding-bottom: 50px;
  }

  .countdown-panel {
    padding: 18px 20px;
  }

  .countdown-header {
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }

  .stats-strip {
    flex-wrap: wrap;
    gap: 16px;
    border-radius: var(--radius-lg);
    padding: 16px 20px;
  }

  .stat-divider {
    display: none;
  }

  .stat-item {
    flex-direction: column;
    align-items: center;
    width: 42%;
  }
}
</style>
