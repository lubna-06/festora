<template>
  <section id="faq" class="faq-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-eyebrow">
          <span>❓ GOT QUESTIONS?</span>
        </div>
        <h2 class="section-title">
          FREQUENTLY ASKED <span>QUESTIONS</span>
        </h2>
        <p class="section-desc">
          Everything you need to know about college ID rules, accommodation, pro night gate access, and spot entries.
        </p>
      </div>

      <!-- FAQ Accordion & Quick Inquiry Form -->
      <div class="faq-grid">
        <!-- Accordion Column -->
        <div class="faq-accordion-col">
          <div 
            v-for="(faq, fIdx) in FAQS" 
            :key="fIdx"
            class="faq-card glass-panel"
            :class="{ 'is-open': openFaqIndex === fIdx }"
            @click="toggleFaq(fIdx)"
          >
            <div class="faq-question-row">
              <span class="faq-q-text">{{ faq.q }}</span>
              <span class="faq-toggle-icon">
                {{ openFaqIndex === fIdx ? '−' : '+' }}
              </span>
            </div>

            <div v-if="openFaqIndex === fIdx" class="faq-answer">
              <p>{{ faq.a }}</p>
            </div>
          </div>
        </div>

        <!-- Quick Help / Ask Query Card -->
        <div class="help-card glass-panel">
          <div class="help-header">
            <span class="help-bolt">💬</span>
            <div>
              <h4 class="help-title">Need Fast Assistance?</h4>
              <p class="help-sub">Student Council Helpline active 24/7</p>
            </div>
          </div>

          <form @submit.prevent="handleQuickInquiry" class="help-form">
            <div class="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                v-model="inquiryForm.name" 
                placeholder="Student Name" 
                required 
                class="form-input" 
              />
            </div>

            <div class="form-group">
              <label>College Email or WhatsApp</label>
              <input 
                type="text" 
                v-model="inquiryForm.contact" 
                placeholder="Email or Phone" 
                required 
                class="form-input" 
              />
            </div>

            <div class="form-group">
              <label>Your Query / Question</label>
              <textarea 
                v-model="inquiryForm.message" 
                rows="3" 
                placeholder="Ask about slots, transport, hostels..." 
                required 
                class="form-input text-area"
              ></textarea>
            </div>

            <button type="submit" class="btn-primary w-full">
              <span>Send Message to Fest Desk ⚡</span>
            </button>
          </form>

          <div class="emergency-contacts">
            <div class="contact-pill">
              <span>📞 General Helpline:</span>
              <a href="tel:+919876540001">+91 98765 40001</a>
            </div>
            <div class="contact-pill">
              <span>🏨 Hostel Accommodations:</span>
              <a href="tel:+919876540002">+91 98765 40002</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Sponsors Showcase -->
      <div class="sponsors-section">
        <h4 class="sponsors-title">OFFICIAL FESTIVAL PARTNERS & SPONSORS</h4>
        <div class="sponsors-grid">
          <div v-for="(sp, sIdx) in SPONSORS" :key="sIdx" class="sponsor-card">
            <span class="sponsor-logo">{{ sp.logo }}</span>
            <span class="sponsor-tier">{{ sp.tier }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { FAQS, SPONSORS } from '../data/eventsData'
import { festivalSwal } from '../composables/useFestoraState'

const openFaqIndex = ref(0)

const inquiryForm = ref({
  name: '',
  contact: '',
  message: ''
})

const toggleFaq = (idx) => {
  openFaqIndex.value = openFaqIndex.value === idx ? -1 : idx
}

const handleQuickInquiry = async () => {
  await festivalSwal.fire({
    icon: 'success',
    title: 'Query Submitted! 📬',
    text: `Thank you ${inquiryForm.value.name}! Our student operations team will respond to ${inquiryForm.value.contact} within 2 hours.`,
    confirmButtonText: 'Great, thanks!'
  })

  inquiryForm.value = {
    name: '',
    contact: '',
    message: ''
  }
}
</script>

<style scoped>
.faq-section {
  padding: 100px 0;
  position: relative;
}

.faq-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 32px;
  margin-bottom: 70px;
}

/* Accordion */
.faq-accordion-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.faq-card {
  padding: 18px 22px;
  border-radius: var(--radius-lg);
  cursor: pointer;
  background: rgba(16, 12, 38, 0.7);
  border: 1px solid rgba(168, 85, 247, 0.2);
  transition: all 0.25s ease;
}

.faq-card:hover {
  background: rgba(23, 17, 54, 0.85);
  border-color: rgba(192, 132, 252, 0.4);
}

.faq-card.is-open {
  background: rgba(24, 18, 56, 0.9);
  border-color: var(--accent-violet);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.faq-question-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.faq-q-text {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
}

.faq-toggle-icon {
  font-size: 1.4rem;
  color: var(--accent-lavender);
  font-weight: 700;
  line-height: 1;
}

.faq-answer {
  padding-top: 14px;
  margin-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.6;
}

/* Help Card */
.help-card {
  padding: 28px;
  border-radius: var(--radius-xl);
  background: rgba(16, 12, 38, 0.8);
  border: 1px solid rgba(168, 85, 247, 0.25);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.help-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.help-bolt {
  font-size: 1.8rem;
}

.help-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
}

.help-sub {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.help-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.text-area {
  resize: vertical;
}

.emergency-contacts {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.contact-pill {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.contact-pill a {
  color: var(--accent-lavender);
  font-weight: 600;
}

.w-full {
  width: 100%;
}

/* Sponsors */
.sponsors-section {
  text-align: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.sponsors-title {
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  color: var(--text-dim);
  margin-bottom: 24px;
}

.sponsors-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.sponsor-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-md);
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: all 0.25s ease;
}

.sponsor-card:hover {
  background: rgba(168, 85, 247, 0.12);
  border-color: rgba(168, 85, 247, 0.3);
  transform: translateY(-3px);
}

.sponsor-logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1rem;
  color: #ffffff;
}

.sponsor-tier {
  font-size: 0.7rem;
  color: var(--text-dim);
}

@media (max-width: 992px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }

  .sponsors-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 576px) {
  .sponsors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
