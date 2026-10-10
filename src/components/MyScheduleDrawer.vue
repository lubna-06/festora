<template>
  <transition name="drawer-slide">
    <div v-if="isScheduleDrawerOpen" class="drawer-overlay" @click.self="closeScheduleDrawer">
      <div class="drawer-panel">
        <!-- Drawer Header -->
        <div class="drawer-header">
          <div class="drawer-header-left">
            <span class="drawer-bolt">⚡</span>
            <div>
              <h3 class="drawer-title">My Fest Dashboard</h3>
              <p class="drawer-sub">Digital Pass, Registrations & Saved Events</p>
            </div>
          </div>
          <button class="drawer-close" @click="closeScheduleDrawer">✕</button>
        </div>

        <!-- Drawer Content Tabs / Sections -->
        <div class="drawer-body">
          <!-- 1. DIGITAL PASS SECTION -->
          <div class="section-box">
            <div class="box-title-row">
              <span class="box-title">🎫 FESTIVAL DIGITAL BADGE</span>
              <span v-if="userPass" class="status-live-pill">ACTIVATED</span>
            </div>

            <!-- If user has a pass: Show Holographic Badge -->
            <div v-if="userPass" class="festival-badge-card">
              <div class="badge-holo-layer"></div>
              
              <div class="badge-top">
                <div class="badge-brand">
                  <span class="brand-bolt">⚡</span>
                  <span class="brand-text">FESTORA 2026</span>
                </div>
                <span class="badge-tier-tag">{{ userPass.tierName }}</span>
              </div>

              <div class="badge-body">
                <div class="attendee-details">
                  <h4 class="attendee-name">{{ userPass.attendee.name }}</h4>
                  <p class="attendee-college">{{ userPass.attendee.college }}</p>
                  <p class="attendee-meta">Email: {{ userPass.attendee.email }}</p>
                  <div class="pass-code-pill">
                    <span>TOKEN:</span>
                    <code>{{ userPass.passId }}</code>
                  </div>
                </div>

                <!-- QR Code Visual -->
                <div class="qr-container" title="Scan at Festival Gates">
                  <!-- Vector QR Code pattern -->
                  <svg class="qr-svg" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="#ffffff" rx="6" />
                    <!-- Outer positioning markers -->
                    <rect x="8" y="8" width="28" height="28" fill="#120e27" rx="3" />
                    <rect x="14" y="14" width="16" height="16" fill="#ffffff" />
                    <rect x="18" y="18" width="8" height="8" fill="#7c3aed" />

                    <rect x="64" y="8" width="28" height="28" fill="#120e27" rx="3" />
                    <rect x="70" y="14" width="16" height="16" fill="#ffffff" />
                    <rect x="74" y="18" width="8" height="8" fill="#7c3aed" />

                    <rect x="8" y="64" width="28" height="28" fill="#120e27" rx="3" />
                    <rect x="14" y="70" width="16" height="16" fill="#ffffff" />
                    <rect x="18" y="74" width="8" height="8" fill="#7c3aed" />

                    <!-- Data dots -->
                    <rect x="42" y="12" width="6" height="6" fill="#120e27" />
                    <rect x="52" y="16" width="6" height="6" fill="#120e27" />
                    <rect x="44" y="26" width="10" height="6" fill="#120e27" />
                    <rect x="12" y="42" width="8" height="8" fill="#120e27" />
                    <rect x="26" y="46" width="12" height="6" fill="#7c3aed" />
                    <rect x="44" y="42" width="14" height="14" fill="#120e27" />
                    <rect x="64" y="44" width="8" height="6" fill="#120e27" />
                    <rect x="78" y="42" width="12" height="8" fill="#120e27" />
                    <rect x="42" y="64" width="8" height="12" fill="#7c3aed" />
                    <rect x="56" y="68" width="14" height="6" fill="#120e27" />
                    <rect x="48" y="82" width="16" height="8" fill="#120e27" />
                    <rect x="72" y="78" width="18" height="14" fill="#120e27" />
                  </svg>
                  <span class="qr-scan-label">SCAN AT GATE</span>
                </div>
              </div>

              <div class="badge-footer">
                <span class="pro-access-indicator">🌟 {{ userPass.proNightAccess }}</span>
                <button class="btn-print" @click="handlePrintBadge">🖨️ Print Badge</button>
              </div>
            </div>

            <!-- If NO pass yet: CTA prompt -->
            <div v-else class="no-pass-banner">
              <span class="no-pass-icon">🎫</span>
              <div class="no-pass-text">
                <h5>No festival wristband issued yet</h5>
                <p>Claim your pass now to secure guaranteed admission to campus competitions and pro concerts.</p>
              </div>
              <button class="btn-primary" @click="openPassModal(null)">
                Get Pass Now
              </button>
            </div>
          </div>

          <!-- 2. REGISTERED EVENTS SECTION -->
          <div class="section-box">
            <div class="box-title-row">
              <span class="box-title">⚡ REGISTERED EVENTS ({{ registeredEvents.length }})</span>
            </div>

            <div v-if="registeredEvents.length > 0" class="reg-list">
              <div 
                v-for="item in registeredEvents" 
                :key="item.registrationId"
                class="reg-item-card"
              >
                <div class="reg-item-header">
                  <div>
                    <h5 class="reg-item-title">{{ item.eventTitle }}</h5>
                    <span class="reg-item-venue">📍 {{ item.venue }}</span>
                  </div>
                  <span class="reg-id-badge">{{ item.registrationId }}</span>
                </div>

                <div class="reg-item-details">
                  <span>⏰ {{ item.date }} • {{ item.time }}</span>
                  <span>👤 {{ item.attendee.name }}</span>
                </div>

                <div class="reg-item-actions">
                  <button class="btn-cancel-item" @click="unregisterEvent(item.eventId)">
                    Release Slot
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="empty-list-box">
              <span class="empty-icon">🎭</span>
              <p>You haven't registered for any competitions yet.</p>
              <a href="#events" class="empty-cta" @click="closeScheduleDrawer">
                Browse 35+ Competitions →
              </a>
            </div>
          </div>

          <!-- 3. BOOKMARKED FAVORITES SECTION -->
          <div class="section-box" v-if="favoriteEvents.length > 0">
            <div class="box-title-row">
              <span class="box-title">❤️ BOOKMARKED FOR LATER ({{ favoriteEvents.length }})</span>
            </div>

            <div class="fav-mini-grid">
              <div 
                v-for="fav in favoriteEvents" 
                :key="fav.id"
                class="fav-mini-card"
                @click="openEventModal(fav)"
              >
                <img :src="fav.image" :alt="fav.title" class="fav-mini-thumb" />
                <div class="fav-mini-info">
                  <span class="fav-mini-title">{{ fav.title }}</span>
                  <span class="fav-mini-meta">{{ fav.day }} • {{ fav.venue }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { EVENTS } from '../data/eventsData'
import { useFestoraState, showToast } from '../composables/useFestoraState'

const { 
  isScheduleDrawerOpen, 
  closeScheduleDrawer, 
  userPass, 
  registeredEvents, 
  favorites, 
  openPassModal, 
  openEventModal,
  unregisterEvent 
} = useFestoraState()

const favoriteEvents = computed(() => {
  return EVENTS.filter(e => favorites.value.includes(e.id))
})

const handlePrintBadge = () => {
  showToast('Preparing digital pass for download...', 'info')
  window.print()
}
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(4, 2, 12, 0.82);
  backdrop-filter: blur(12px);
  z-index: 1300;
  display: flex;
  justify-content: flex-end;
}

.drawer-panel {
  width: 100%;
  max-width: 520px;
  height: 100%;
  background: #0d0a21;
  border-left: 1px solid rgba(168, 85, 247, 0.3);
  display: flex;
  flex-direction: column;
  box-shadow: -15px 0 50px rgba(0, 0, 0, 0.85);
}

.drawer-header {
  padding: 22px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.drawer-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.drawer-bolt {
  font-size: 1.5rem;
  background: rgba(168, 85, 247, 0.2);
  padding: 6px;
  border-radius: 8px;
}

.drawer-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffffff;
}

.drawer-sub {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.drawer-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.drawer-close:hover {
  background: rgba(236, 72, 153, 0.7);
}

.drawer-body {
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.section-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.box-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-title {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--accent-lavender);
}

.status-live-pill {
  font-size: 0.7rem;
  font-weight: 800;
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.5);
  color: #86efac;
  padding: 2px 8px;
  border-radius: 999px;
}

/* Holographic Festival Pass Badge */
.festival-badge-card {
  position: relative;
  background: linear-gradient(135deg, #1b1240 0%, #29124a 50%, #150d30 100%);
  border: 1px solid rgba(236, 72, 153, 0.4);
  border-radius: var(--radius-xl);
  padding: 22px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), inset 0 0 25px rgba(168, 85, 247, 0.2);
  overflow: hidden;
}

.badge-holo-layer {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 60%
  );
  pointer-events: none;
  animation: holoSweep 6s infinite linear;
}

@keyframes holoSweep {
  0% { transform: translate(-20%, -20%) rotate(0deg); }
  100% { transform: translate(20%, 20%) rotate(360deg); }
}

.badge-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
}

.badge-brand {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.05rem;
  color: #ffffff;
  letter-spacing: 0.06em;
}

.badge-tier-tag {
  background: var(--grad-accent-btn);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: 0.06em;
}

.badge-body {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.attendee-details {
  flex: 1;
}

.attendee-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 3px;
}

.attendee-college {
  font-size: 0.85rem;
  color: var(--accent-lavender);
  margin-bottom: 4px;
}

.attendee-meta {
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-bottom: 10px;
}

.pass-code-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.4);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.pass-code-pill code {
  color: #f472b6;
  font-weight: 800;
}

.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.qr-svg {
  width: 82px;
  height: 82px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.qr-scan-label {
  font-size: 0.62rem;
  font-weight: 800;
  color: var(--text-dim);
  letter-spacing: 0.08em;
}

.badge-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
}

.pro-access-indicator {
  font-size: 0.76rem;
  color: #fbcfe8;
  font-weight: 600;
}

.btn-print {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.08);
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn-print:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
}

/* No pass banner */
.no-pass-banner {
  background: rgba(255, 255, 255, 0.025);
  border: 1px dashed rgba(168, 85, 247, 0.35);
  border-radius: var(--radius-lg);
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.no-pass-icon {
  font-size: 2.2rem;
}

.no-pass-text h5 {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.no-pass-text p {
  color: var(--text-muted);
  font-size: 0.82rem;
  line-height: 1.45;
}

/* Registration List */
.reg-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reg-item-card {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reg-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.reg-item-title {
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
}

.reg-item-venue {
  font-size: 0.78rem;
  color: var(--text-dim);
}

.reg-id-badge {
  font-family: monospace;
  font-size: 0.78rem;
  font-weight: 800;
  color: #86efac;
  background: rgba(34, 197, 94, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
}

.reg-item-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--text-muted);
}

.reg-item-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
}

.btn-cancel-item {
  font-size: 0.75rem;
  color: #f87171;
  background: rgba(239, 68, 68, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-cancel-item:hover {
  background: rgba(239, 68, 68, 0.25);
  color: #ffffff;
}

/* Empty list box */
.empty-list-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: 24px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.88rem;
}

.empty-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 6px;
}

.empty-cta {
  display: inline-block;
  margin-top: 8px;
  color: var(--accent-lavender);
  font-weight: 700;
  font-size: 0.85rem;
}

/* Fav mini grid */
.fav-mini-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fav-mini-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.fav-mini-card:hover {
  background: rgba(168, 85, 247, 0.12);
  border-color: rgba(168, 85, 247, 0.3);
}

.fav-mini-thumb {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
}

.fav-mini-info {
  display: flex;
  flex-direction: column;
}

.fav-mini-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #ffffff;
}

.fav-mini-meta {
  font-size: 0.74rem;
  color: var(--text-muted);
}

/* Animation */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
