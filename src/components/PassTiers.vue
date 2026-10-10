<template>
  <section id="passes" class="passes-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-eyebrow">
          <span>🎟️ FESTIVAL WRISTBANDS & ACCESS</span>
        </div>
        <h2 class="section-title">
          CHOOSE YOUR <span>FESTORA PASS</span>
        </h2>
        <p class="section-desc">
          Get campus-wide access, enter world-class competitions, or elevate your festival experience with VIP backstage perks.
        </p>
      </div>

      <!-- Passes Tier Grid -->
      <div class="passes-grid">
        <div 
          v-for="tier in PASS_TIERS" 
          :key="tier.id"
          class="pass-card glass-panel"
          :class="{ 
            'is-popular': tier.isPopular,
            'is-active-tier': userPass?.tierId === tier.id 
          }"
        >
          <!-- Popular / Active Ribbon -->
          <div v-if="userPass?.tierId === tier.id" class="tier-ribbon active-ribbon">
            CURRENT PASS ✓
          </div>
          <div v-else-if="tier.isPopular" class="tier-ribbon">
            MOST POPULAR
          </div>

          <!-- Header -->
          <div class="tier-header">
            <span class="tier-badge" :style="{ borderColor: tier.color, color: tier.color }">
              {{ tier.badge }}
            </span>
            <h3 class="tier-name">{{ tier.name }}</h3>
            <p class="tier-sub">{{ tier.subtitle }}</p>

            <div class="tier-price-row">
              <span class="price-val">{{ tier.price }}</span>
              <span class="price-period" v-if="tier.priceNum > 0">/ attendee</span>
              <span class="price-period" v-else>free forever</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="tier-divider"></div>

          <!-- Pro Night Access Highlight -->
          <div class="pro-access-box">
            <span class="pro-label">🎵 Pro Concert Nights Access:</span>
            <span class="pro-detail">{{ tier.proNightAccess }}</span>
          </div>

          <!-- Features List -->
          <ul class="tier-features">
            <li v-for="(feat, fIdx) in tier.features" :key="fIdx">
              <span class="feat-check">✓</span>
              <span>{{ feat }}</span>
            </li>
          </ul>

          <!-- CTA Button -->
          <div class="tier-cta-box">
            <button 
              v-if="userPass?.tierId === tier.id"
              class="btn-current-pass w-full"
              @click="openScheduleDrawer"
            >
              <span>View My Digital Badge 🎫</span>
            </button>
            <button 
              v-else
              class="btn-primary w-full"
              :class="{ 'btn-gold-glow': tier.isPopular }"
              @click="openPassModal(tier)"
            >
              <span>{{ tier.ctaText }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PASS_TIERS } from '../data/eventsData'
import { useFestoraState } from '../composables/useFestoraState'

const { userPass, openPassModal, openScheduleDrawer } = useFestoraState()
</script>

<style scoped>
.passes-section {
  padding: 100px 0;
  position: relative;
}

.passes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  align-items: stretch;
}

.pass-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  padding: 36px 30px;
  background: rgba(16, 12, 38, 0.7);
  border: 1px solid rgba(168, 85, 247, 0.22);
  position: relative;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.pass-card:hover {
  transform: translateY(-8px);
  border-color: rgba(192, 132, 252, 0.5);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7), 0 0 30px rgba(139, 92, 246, 0.25);
}

.pass-card.is-popular {
  background: linear-gradient(180deg, rgba(29, 19, 65, 0.9) 0%, rgba(16, 12, 38, 0.95) 100%);
  border-color: var(--accent-violet);
  box-shadow: 0 15px 40px rgba(139, 92, 246, 0.25);
  transform: scale(1.03);
}

.pass-card.is-popular:hover {
  transform: scale(1.03) translateY(-8px);
}

.pass-card.is-active-tier {
  border-color: #22c55e;
  box-shadow: 0 0 30px rgba(34, 197, 94, 0.3);
}

/* Ribbons */
.tier-ribbon {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--grad-accent-btn);
  color: #ffffff;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  padding: 5px 16px;
  border-radius: 999px;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.5);
}

.active-ribbon {
  background: #16a34a;
  box-shadow: 0 4px 15px rgba(22, 163, 74, 0.6);
}

/* Header */
.tier-header {
  margin-bottom: 20px;
}

.tier-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid;
  margin-bottom: 12px;
}

.tier-name {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 4px;
}

.tier-sub {
  font-size: 0.86rem;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.tier-price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price-val {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
}

.price-period {
  font-size: 0.82rem;
  color: var(--text-dim);
}

.tier-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin-bottom: 20px;
}

/* Pro Access Box */
.pro-access-box {
  background: rgba(168, 85, 247, 0.12);
  border: 1px dashed rgba(168, 85, 247, 0.35);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  margin-bottom: 22px;
}

.pro-label {
  display: block;
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--accent-lavender);
  margin-bottom: 3px;
}

.pro-detail {
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff;
}

/* Features */
.tier-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
  flex: 1;
}

.tier-features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.feat-check {
  color: var(--accent-lavender);
  font-weight: 900;
  flex-shrink: 0;
  margin-top: 1px;
}

/* CTA */
.tier-cta-box {
  margin-top: auto;
}

.btn-current-pass {
  padding: 13px 20px;
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.5);
  color: #86efac;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.92rem;
  transition: all 0.2s ease;
}

.btn-current-pass:hover {
  background: rgba(34, 197, 94, 0.35);
  color: #ffffff;
}

.w-full {
  width: 100%;
}

@media (max-width: 992px) {
  .passes-grid {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin: 0 auto;
  }

  .pass-card.is-popular {
    transform: none;
  }
}
</style>
