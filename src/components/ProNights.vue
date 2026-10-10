<template>
  <section id="pro-nights" class="pronights-section">
    <!-- Ambient glow lights -->
    <div class="pronight-glow-center"></div>

    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-eyebrow">
          <span>⚡ HEADLINER LINEUP</span>
        </div>
        <h2 class="section-title">
          THE CELEBRITY <span>PRO NIGHTS</span>
        </h2>
        <p class="section-desc">
          When the sun sets over Metropolis, the festival comes alive. 
          Experience three legendary evenings of arena sound, world-class laser arrays, and timeless memories.
        </p>
      </div>

      <!-- Pro Nights Showcase Grid -->
      <div class="pronights-grid">
        <div 
          v-for="(night, idx) in PRO_NIGHTS" 
          :key="night.id"
          class="pronight-card glass-panel"
        >
          <!-- Headliner Image with Cinematic Gradients -->
          <div class="pronight-media">
            <img :src="night.image" :alt="night.title" class="pronight-img" loading="lazy" />
            <div class="pronight-overlay"></div>

            <!-- Top Pill Badge -->
            <div class="pronight-top-pills">
              <span class="day-badge">{{ night.day }}</span>
              <span class="spotlight-badge">{{ night.badge }}</span>
            </div>

            <!-- Animated Sound Wave Visualizer Bar -->
            <div class="sound-wave-box">
              <span class="bar bar-1"></span>
              <span class="bar bar-2"></span>
              <span class="bar bar-3"></span>
              <span class="bar bar-4"></span>
              <span class="bar bar-5"></span>
              <span class="wave-text">PRO STAGE 100K WATT SOUND RIG</span>
            </div>
          </div>

          <!-- Content Info -->
          <div class="pronight-body">
            <span class="pronight-genre">{{ night.genre }}</span>
            <h3 class="pronight-title">{{ night.title }}</h3>
            <h4 class="pronight-headliner">FT. {{ night.headliner }}</h4>
            <p class="pronight-desc">{{ night.description }}</p>

            <!-- Metadata info -->
            <div class="pronight-meta">
              <div class="meta-row">
                <span class="meta-icon">📍</span>
                <span>{{ night.venue }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-icon">⏰</span>
                <span>{{ night.time }}</span>
              </div>
            </div>

            <!-- Action CTA -->
            <div class="pronight-cta">
              <button class="btn-primary w-full" @click="openPassModal(null)">
                <span>Reserve Pro Night Pass</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PRO_NIGHTS } from '../data/eventsData'
import { useFestoraState } from '../composables/useFestoraState'

const { openPassModal } = useFestoraState()
</script>

<style scoped>
.pronights-section {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}

.pronight-glow-center {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 500px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(236, 72, 153, 0.12) 40%, transparent 70%);
  filter: blur(140px);
  pointer-events: none;
}

.pronights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.pronight-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: rgba(15, 12, 36, 0.85);
  border: 1px solid rgba(168, 85, 247, 0.25);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.pronight-card:hover {
  transform: translateY(-8px);
  border-color: rgba(236, 72, 153, 0.5);
  box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(236, 72, 153, 0.3);
}

.pronight-media {
  position: relative;
  width: 100%;
  height: 260px;
  overflow: hidden;
}

.pronight-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.pronight-card:hover .pronight-img {
  transform: scale(1.08);
}

.pronight-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(8, 6, 18, 0.25) 0%, rgba(15, 12, 36, 0.98) 100%);
}

.pronight-top-pills {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.day-badge {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  backdrop-filter: blur(8px);
}

.spotlight-badge {
  background: rgba(236, 72, 153, 0.25);
  border: 1px solid rgba(236, 72, 153, 0.6);
  color: #fbcfe8;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.06em;
}

/* Sound Wave Animation */
.sound-wave-box {
  position: absolute;
  bottom: 12px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 2;
}

.sound-wave-box .bar {
  width: 3px;
  background: #c084fc;
  border-radius: 2px;
  animation: equalizer 1.4s ease-in-out infinite alternate;
}

.bar-1 { height: 12px; animation-delay: 0.1s; }
.bar-2 { height: 20px; animation-delay: 0.3s; }
.bar-3 { height: 16px; animation-delay: 0.2s; }
.bar-4 { height: 24px; animation-delay: 0.4s; }
.bar-5 { height: 10px; animation-delay: 0.5s; }

@keyframes equalizer {
  0% { transform: scaleY(0.3); }
  100% { transform: scaleY(1); }
}

.wave-text {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--accent-lavender);
  margin-left: 6px;
}

/* Body */
.pronight-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.pronight-genre {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--accent-pink);
  text-transform: uppercase;
  margin-bottom: 6px;
}

.pronight-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.25;
  margin-bottom: 6px;
}

.pronight-headliner {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: #e9d5ff;
  margin-bottom: 12px;
  text-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
}

.pronight-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 18px;
}

.pronight-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-md);
  margin-bottom: 22px;
  font-size: 0.84rem;
  color: var(--text-secondary);
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pronight-cta {
  margin-top: auto;
}

.w-full {
  width: 100%;
}

@media (max-width: 992px) {
  .pronights-grid {
    grid-template-columns: 1fr;
    max-width: 580px;
    margin: 0 auto;
  }
}
</style>
