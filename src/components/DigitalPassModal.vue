<template>
  <transition name="modal-fade">
    <div v-if="isPassModalOpen" class="modal-backdrop" @click.self="closePassModal">
      <div class="pass-modal-card">
        <!-- Close Button -->
        <button class="pass-modal-close" @click="closePassModal">✕</button>

        <div class="pass-modal-header">
          <span class="pill-badge pill-purple">🎫 OFFICIAL FESTIVAL PASS ISSUANCE</span>
          <h3 class="modal-heading">Get Your FESTORA 2026 Wristband</h3>
          <p class="modal-sub">Fast-track admission to competitions, stages, and celebrity concerts.</p>
        </div>

        <!-- Tier Selector Tabs -->
        <div class="tier-tabs">
          <button 
            v-for="tier in PASS_TIERS" 
            :key="tier.id"
            class="tier-tab-btn"
            :class="{ 'selected': selectedTier.id === tier.id }"
            @click="selectedTier = tier"
          >
            <span class="tab-tier-name">{{ tier.name }}</span>
            <span class="tab-tier-price">{{ tier.price }}</span>
          </button>
        </div>

        <!-- Selected Tier Summary Preview -->
        <div class="tier-preview-banner" :style="{ borderColor: selectedTier.color }">
          <div class="tier-preview-left">
            <span class="tier-preview-title">{{ selectedTier.name }}</span>
            <span class="tier-preview-sub">{{ selectedTier.subtitle }}</span>
          </div>
          <div class="tier-preview-right">
            <span class="tier-preview-price">{{ selectedTier.price }}</span>
          </div>
        </div>

        <!-- Booking Form -->
        <form @submit.prevent="handlePassSubmit" class="pass-form">
          <div class="pass-form-grid">
            <div class="form-group">
              <label>Attendee Full Name *</label>
              <input 
                type="text" 
                v-model="passForm.fullName" 
                placeholder="e.g. Maya Chen" 
                required 
                class="form-input" 
              />
            </div>

            <div class="form-group">
              <label>College / University Name *</label>
              <input 
                type="text" 
                v-model="passForm.college" 
                placeholder="e.g. National Institute of Tech" 
                required 
                class="form-input" 
              />
            </div>

            <div class="form-group">
              <label>Student Email ID *</label>
              <input 
                type="email" 
                v-model="passForm.email" 
                placeholder="e.g. maya@student.edu" 
                required 
                class="form-input" 
              />
            </div>

            <div class="form-group">
              <label>Phone / WhatsApp *</label>
              <input 
                type="tel" 
                v-model="passForm.phone" 
                placeholder="e.g. +91 98765 12345" 
                required 
                class="form-input" 
              />
            </div>
          </div>

          <div class="pass-perks-reminder">
            <span class="perk-star">★</span>
            <span>Includes <strong>{{ selectedTier.proNightAccess }}</strong> and digital pass wallet sync.</span>
          </div>

          <div class="pass-submit-actions">
            <button type="submit" class="btn-primary w-full pass-confirm-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Confirm & Generate Festival Pass ⚡</span>
              <span v-else>Activating Pass...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { PASS_TIERS } from '../data/eventsData'
import { useFestoraState } from '../composables/useFestoraState'

const { 
  isPassModalOpen, 
  closePassModal, 
  preselectedPassTier, 
  bookPass, 
  userProfile 
} = useFestoraState()

const selectedTier = ref(PASS_TIERS[1])
const isSubmitting = ref(false)

const passForm = ref({
  fullName: '',
  college: '',
  email: '',
  phone: ''
})

watch([isPassModalOpen, preselectedPassTier], () => {
  if (isPassModalOpen.value) {
    if (preselectedPassTier.value) {
      selectedTier.value = preselectedPassTier.value
    }
    passForm.value.fullName = userProfile.value.fullName || ''
    passForm.value.college = userProfile.value.college || ''
    passForm.value.email = userProfile.value.email || ''
    passForm.value.phone = userProfile.value.phone || ''
  }
})

const handlePassSubmit = async () => {
  isSubmitting.value = true
  await bookPass(selectedTier.value, passForm.value)
  isSubmitting.value = false
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
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.pass-modal-card {
  width: 100%;
  max-width: 620px;
  background: #0f0c24;
  border: 1px solid rgba(168, 85, 247, 0.35);
  border-radius: var(--radius-xl);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(139, 92, 246, 0.3);
  padding: 32px 28px;
  position: relative;
  overflow: hidden;
}

.pass-modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.2s ease;
}

.pass-modal-close:hover {
  background: rgba(236, 72, 153, 0.8);
  color: white;
}

.pass-modal-header {
  margin-bottom: 24px;
}

.modal-heading {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 800;
  color: #ffffff;
  margin: 10px 0 4px 0;
}

.modal-sub {
  color: var(--text-muted);
  font-size: 0.88rem;
}

/* Tier Selection Tabs */
.tier-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 18px;
}

.tier-tab-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
}

.tier-tab-btn.selected {
  background: rgba(168, 85, 247, 0.2);
  border-color: var(--accent-lavender);
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.35);
}

.tab-tier-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: #ffffff;
}

.tab-tier-price {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--accent-lavender);
}

/* Preview Banner */
.tier-preview-banner {
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed;
  border-radius: var(--radius-md);
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}

.tier-preview-title {
  display: block;
  font-size: 1rem;
  font-weight: 800;
  color: #ffffff;
}

.tier-preview-sub {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.tier-preview-price {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 900;
  color: #ffffff;
}

/* Form */
.pass-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 16px;
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
  outline: none;
  font-family: inherit;
}

.form-input:focus {
  border-color: var(--accent-violet);
  box-shadow: 0 0 14px rgba(168, 85, 247, 0.35);
}

.pass-perks-reminder {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.84rem;
  color: var(--text-secondary);
  background: rgba(168, 85, 247, 0.1);
  padding: 10px 14px;
  border-radius: var(--radius-md);
  margin-bottom: 20px;
}

.perk-star {
  color: var(--accent-pink);
  font-size: 1.1rem;
}

.pass-confirm-btn {
  padding: 14px;
  font-size: 1rem;
}

.w-full {
  width: 100%;
  justify-content: center;
}

@media (max-width: 600px) {
  .pass-form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
