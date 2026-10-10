<template>
  <transition name="modal-fade">
    <div v-if="event" class="modal-backdrop" @click.self="closeEventModal">
      <div class="modal-dialog">
        <!-- Close Button -->
        <button class="modal-close-btn" @click="closeEventModal" title="Close modal">✕</button>

        <!-- Modal Header with Image -->
        <div class="modal-header-banner">
          <img :src="event.image" :alt="event.title" class="banner-img" />
          <div class="banner-overlay"></div>

          <div class="banner-meta">
            <div class="banner-tags">
              <span class="pill-badge pill-purple">{{ event.category }}</span>
              <span class="pill-badge pill-day">{{ event.day }} • {{ event.date }}</span>
              <span class="pill-badge pill-green" v-if="registered">Registered ✓</span>
            </div>
            <h2 class="modal-title">{{ event.title }}</h2>
            <p class="modal-subtitle">{{ event.subtitle }}</p>
          </div>
        </div>

        <!-- Modal Content Scroll Area -->
        <div class="modal-body">
          <!-- Key Specs Grid -->
          <div class="specs-grid">
            <div class="spec-card">
              <span class="spec-label">🏆 Total Prize Pool</span>
              <span class="spec-val highlight-gold">{{ event.prizePool }}</span>
            </div>
            <div class="spec-card">
              <span class="spec-label">📍 Venue Location</span>
              <span class="spec-val">{{ event.venue }}</span>
            </div>
            <div class="spec-card">
              <span class="spec-label">⏰ Event Timing</span>
              <span class="spec-val">{{ event.time }}</span>
            </div>
            <div class="spec-card">
              <span class="spec-label">👥 Team Formation</span>
              <span class="spec-val">{{ event.teamType }}</span>
            </div>
          </div>

          <!-- Description -->
          <div class="content-block">
            <h4 class="block-title">About The Competition</h4>
            <p class="block-text">{{ event.description }}</p>
          </div>

          <!-- Official Rules & Guidelines -->
          <div class="content-block">
            <h4 class="block-title">Rules & Regulations</h4>
            <ul class="rules-list">
              <li v-for="(rule, idx) in event.rules" :key="idx">
                <span class="bullet-dot"></span>
                <span>{{ rule }}</span>
              </li>
            </ul>
          </div>

          <!-- Judging Criteria -->
          <div class="content-block" v-if="event.judgingCriteria">
            <h4 class="block-title">Judging Criteria</h4>
            <div class="criteria-chips">
              <span v-for="(crit, idx) in event.judgingCriteria" :key="idx" class="crit-chip">
                ⚖️ {{ crit }}
              </span>
            </div>
          </div>

          <!-- Event Coordinators -->
          <div class="content-block" v-if="event.coordinators">
            <h4 class="block-title">Student Coordinators</h4>
            <div class="coordinators-grid">
              <div v-for="(coord, idx) in event.coordinators" :key="idx" class="coord-card">
                <span class="coord-avatar">👤</span>
                <div class="coord-info">
                  <span class="coord-name">{{ coord.name }}</span>
                  <a :href="'tel:' + coord.phone" class="coord-phone">{{ coord.phone }}</a>
                </div>
              </div>
            </div>
          </div>

          <!-- REGISTRATION SECTION -->
          <div class="registration-section">
            <!-- If already registered -->
            <div v-if="registered" class="registered-status-box">
              <div class="status-top">
                <span class="status-check">🎉</span>
                <div>
                  <h4 class="status-title">You are registered for this event!</h4>
                  <p class="status-sub">Show your registration token at the venue reporting desk.</p>
                </div>
              </div>

              <div class="token-banner">
                <span class="token-label">YOUR REGISTRATION ID:</span>
                <span class="token-code">{{ currentReg?.registrationId }}</span>
              </div>

              <div class="registered-actions">
                <button class="btn-secondary" @click="openScheduleDrawer">
                  <span>View in My Schedule</span>
                </button>
                <button class="btn-cancel-reg" @click="handleCancelRegistration">
                  <span>Cancel Registration</span>
                </button>
              </div>
            </div>

            <!-- If not registered: Show Registration Form -->
            <div v-else class="reg-form-box">
              <div class="reg-form-header">
                <h4 class="reg-title">Register for {{ event.title }}</h4>
                <p class="reg-sub">Entry Fee: <strong style="color: #a78bfa;">{{ event.entryFee }}</strong> • Only {{ Math.max(0, event.maxSlots - event.registeredCount) }} slots remaining</p>
              </div>

              <form @submit.prevent="handleSubmitRegistration" class="reg-form">
                <div class="form-grid">
                  <div class="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      v-model="form.fullName" 
                      placeholder="e.g. Alex Johnson" 
                      required 
                      class="form-input" 
                    />
                  </div>

                  <div class="form-group">
                    <label>College / University *</label>
                    <input 
                      type="text" 
                      v-model="form.college" 
                      placeholder="e.g. Metropolis Institute of Tech" 
                      required 
                      class="form-input" 
                    />
                  </div>

                  <div class="form-group">
                    <label>Student Email *</label>
                    <input 
                      type="email" 
                      v-model="form.email" 
                      placeholder="e.g. alex@student.edu" 
                      required 
                      class="form-input" 
                    />
                  </div>

                  <div class="form-group">
                    <label>WhatsApp / Phone *</label>
                    <input 
                      type="tel" 
                      v-model="form.phone" 
                      placeholder="e.g. +91 98765 43210" 
                      required 
                      class="form-input" 
                    />
                  </div>
                </div>

                <div class="form-group" v-if="event.teamType !== 'Solo'">
                  <label>Team / Band / Crew Name</label>
                  <input 
                    type="text" 
                    v-model="form.teamName" 
                    placeholder="e.g. The Velocity Crew" 
                    class="form-input" 
                  />
                </div>

                <div class="form-submit-row">
                  <p class="form-disclaimer">By registering, you agree to comply with FESTORA 2026 festival code of conduct and reporting deadlines.</p>
                  <button type="submit" class="btn-primary form-submit-btn" :disabled="isSubmitting">
                    <span v-if="!isSubmitting">Confirm Registration ⚡</span>
                    <span v-else>Registering...</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useFestoraState } from '../composables/useFestoraState'

const { 
  selectedEventModal: event, 
  closeEventModal, 
  isRegistered, 
  getRegistration, 
  registerForEvent, 
  unregisterEvent,
  openScheduleDrawer,
  userProfile 
} = useFestoraState()

const isSubmitting = ref(false)

const form = ref({
  fullName: '',
  email: '',
  college: '',
  phone: '',
  teamName: ''
})

// Auto-fill from user profile
watch(event, (val) => {
  if (val) {
    form.value.fullName = userProfile.value.fullName || ''
    form.value.email = userProfile.value.email || ''
    form.value.college = userProfile.value.college || ''
    form.value.phone = userProfile.value.phone || ''
    form.value.teamName = ''
  }
}, { immediate: true })

const registered = computed(() => {
  return event.value ? isRegistered(event.value.id) : false
})

const currentReg = computed(() => {
  return event.value ? getRegistration(event.value.id) : null
})

const handleSubmitRegistration = async () => {
  if (!event.value) return
  isSubmitting.value = true
  const success = await registerForEvent(event.value, form.value)
  isSubmitting.value = false
  if (success) {
    // Keep modal open to show confirmed state or close
  }
}

const handleCancelRegistration = async () => {
  if (!event.value) return
  await unregisterEvent(event.value.id)
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(4, 2, 12, 0.85);
  backdrop-filter: blur(14px);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.modal-dialog {
  width: 100%;
  max-width: 780px;
  max-height: 90vh;
  background: #0f0c24;
  border: 1px solid rgba(168, 85, 247, 0.35);
  border-radius: var(--radius-xl);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(139, 92, 246, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.modal-close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  z-index: 10;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  transform: scale(1.15);
  background: rgba(236, 72, 153, 0.8);
}

/* Banner Header */
.modal-header-banner {
  position: relative;
  width: 100%;
  height: 250px;
  flex-shrink: 0;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(8, 6, 18, 0.2) 0%, rgba(15, 12, 36, 0.98) 100%);
}

.banner-meta {
  position: absolute;
  bottom: 20px;
  left: 24px;
  right: 24px;
  z-index: 2;
}

.banner-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.pill-day {
  background: rgba(10, 8, 22, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.modal-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.2vw, 2.1rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 4px;
}

.modal-subtitle {
  color: var(--accent-lavender);
  font-size: 0.95rem;
}

/* Modal Body */
.modal-body {
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Specs Grid */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.spec-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.spec-val {
  font-size: 0.92rem;
  font-weight: 700;
  color: #f1f5f9;
}

.highlight-gold {
  color: #fbbf24;
  font-family: var(--font-display);
  font-size: 1.05rem;
}

/* Content Blocks */
.content-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.block-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 800;
  color: #ffffff;
  border-left: 3px solid var(--accent-purple);
  padding-left: 10px;
  letter-spacing: 0.02em;
}

.block-text {
  color: var(--text-secondary);
  font-size: 0.94rem;
  line-height: 1.6;
}

.rules-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rules-list li {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.bullet-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-violet);
  flex-shrink: 0;
}

.criteria-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.crit-chip {
  background: rgba(168, 85, 247, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.28);
  color: var(--accent-lavender);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
}

.coordinators-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.coord-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
}

.coord-avatar {
  font-size: 1.4rem;
}

.coord-info {
  display: flex;
  flex-direction: column;
}

.coord-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: #ffffff;
}

.coord-phone {
  font-size: 0.82rem;
  color: var(--accent-lavender);
}

/* Registration Section */
.registration-section {
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.registered-status-box {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.4);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.status-top {
  display: flex;
  align-items: center;
  gap: 14px;
}

.status-check {
  font-size: 2rem;
}

.status-title {
  color: #86efac;
  font-weight: 800;
  font-size: 1.1rem;
}

.status-sub {
  color: var(--text-muted);
  font-size: 0.88rem;
}

.token-banner {
  background: rgba(0, 0, 0, 0.4);
  border: 1px dashed rgba(34, 197, 94, 0.5);
  border-radius: var(--radius-md);
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.token-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
}

.token-code {
  font-family: monospace;
  font-size: 1.15rem;
  font-weight: 800;
  color: #86efac;
  letter-spacing: 0.08em;
}

.registered-actions {
  display: flex;
  gap: 12px;
}

.btn-cancel-reg {
  padding: 10px 20px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-cancel-reg:hover {
  background: rgba(239, 68, 68, 0.3);
  color: #ffffff;
}

/* Registration Form */
.reg-form-box {
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: var(--radius-lg);
  padding: 22px;
}

.reg-form-header {
  margin-bottom: 18px;
}

.reg-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 4px;
}

.reg-sub {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-input {
  width: 100%;
  padding: 11px 14px;
  background: rgba(8, 6, 18, 0.85);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: var(--radius-sm);
  color: #ffffff;
  font-size: 0.92rem;
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;
}

.form-input:focus {
  border-color: var(--accent-violet);
  box-shadow: 0 0 14px rgba(168, 85, 247, 0.35);
}

.form-submit-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 18px;
  flex-wrap: wrap;
}

.form-disclaimer {
  font-size: 0.78rem;
  color: var(--text-dim);
  max-width: 380px;
  line-height: 1.4;
}

.form-submit-btn {
  padding: 12px 28px;
  font-size: 0.95rem;
}

/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .specs-grid {
    grid-template-columns: 1fr 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .coordinators-grid {
    grid-template-columns: 1fr;
  }

  .form-submit-row {
    flex-direction: column;
    align-items: stretch;
  }

  .form-submit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
