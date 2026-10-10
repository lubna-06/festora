<template>
  <header class="navbar-wrapper" :class="{ 'scrolled': isScrolled }">
    <div class="container navbar-inner">
      <!-- Brand Logo -->
      <a href="#" class="brand-logo" @click.prevent="scrollToTop">
        <div class="logo-mark">
          <span class="logo-bolt">⚡</span>
        </div>
        <div class="logo-text-group">
          <span class="logo-name">FESTORA</span>
          <span class="logo-badge">2026</span>
        </div>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="nav-links">
        <a href="#events" class="nav-item">Events</a>
        <a href="#pro-nights" class="nav-item">Pro Nights</a>
        <a href="#schedule" class="nav-item">Schedule</a>
        <a href="#passes" class="nav-item">Passes & Tickets</a>
        <a href="#campus-map" class="nav-item">Campus Guide</a>
        <a href="#faq" class="nav-item">FAQ</a>
      </nav>

      <!-- Action Items -->
      <div class="nav-actions">
        <!-- My Schedule / Passes Drawer Button -->
        <button 
          class="btn-my-agenda" 
          @click="openScheduleDrawer"
          title="View your registered events and digital festival badge"
        >
          <span class="agenda-icon">🎟️</span>
          <span class="agenda-label">My Fest Pass</span>
          <span v-if="registeredCount > 0 || hasPass" class="agenda-badge">
            {{ registeredCount + (hasPass ? 1 : 0) }}
          </span>
        </button>

        <!-- CTA Button -->
        <button class="btn-primary nav-cta-btn" @click="openPassModal(null)">
          <span>Get Pass</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle menu">
          <span class="bar" :class="{ 'open-1': isMobileMenuOpen }"></span>
          <span class="bar" :class="{ 'open-2': isMobileMenuOpen }"></span>
          <span class="bar" :class="{ 'open-3': isMobileMenuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <transition name="fade-slide">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click.self="isMobileMenuOpen = false">
        <div class="mobile-menu-content">
          <div class="mobile-menu-header">
            <div class="logo-text-group">
              <span class="logo-name">FESTORA</span>
              <span class="logo-badge">2026</span>
            </div>
            <button class="close-btn" @click="isMobileMenuOpen = false">✕</button>
          </div>

          <div class="mobile-links">
            <a href="#events" @click="handleMobileNav('#events')">✨ Explore Events</a>
            <a href="#pro-nights" @click="handleMobileNav('#pro-nights')">🎸 Pro Concert Nights</a>
            <a href="#schedule" @click="handleMobileNav('#schedule')">📅 Fest Schedule</a>
            <a href="#passes" @click="handleMobileNav('#passes')">🎟️ Festival Passes</a>
            <a href="#campus-map" @click="handleMobileNav('#campus-map')">📍 Campus Map & Venues</a>
            <a href="#faq" @click="handleMobileNav('#faq')">❓ FAQ & Help</a>
          </div>

          <div class="mobile-actions">
            <button class="btn-my-agenda w-full" @click="handleDrawerFromMobile">
              <span>🎟️ My Registrations & Passes</span>
              <span v-if="registeredCount > 0 || hasPass" class="agenda-badge">
                {{ registeredCount + (hasPass ? 1 : 0) }}
              </span>
            </button>
            <button class="btn-primary w-full" @click="handlePassFromMobile">
              <span>Get Festival Pass</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useFestoraState } from '../composables/useFestoraState'

const { registeredEvents, userPass, openScheduleDrawer, openPassModal } = useFestoraState()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const registeredCount = computed(() => registeredEvents.value.length)
const hasPass = computed(() => !!userPass.value)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleMobileNav = (hash) => {
  isMobileMenuOpen.value = false
  const target = document.querySelector(hash)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleDrawerFromMobile = () => {
  isMobileMenuOpen.value = false
  openScheduleDrawer()
}

const handlePassFromMobile = () => {
  isMobileMenuOpen.value = false
  openPassModal(null)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  background: rgba(10, 8, 23, 0.4);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.navbar-wrapper.scrolled {
  background: rgba(8, 6, 18, 0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(168, 85, 247, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 74px;
}

/* Brand Logo */
.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-mark {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.5);
  transition: transform 0.3s ease;
}

.brand-logo:hover .logo-mark {
  transform: rotate(10deg) scale(1.08);
}

.logo-bolt {
  font-size: 1.1rem;
}

.logo-text-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.logo-name {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.45rem;
  letter-spacing: 0.08em;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(192, 132, 252, 0.6);
}

.logo-badge {
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.4);
  color: var(--accent-lavender);
  font-size: 0.7rem;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 6px;
  letter-spacing: 0.05em;
}

/* Nav Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-item {
  color: var(--text-secondary);
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: color 0.2s ease;
  position: relative;
  padding: 6px 0;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #a855f7, #ec4899);
  transition: width 0.25s ease;
  border-radius: 2px;
}

.nav-item:hover {
  color: #ffffff;
}

.nav-item:hover::after {
  width: 100%;
}

/* Nav Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.btn-my-agenda {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(139, 92, 246, 0.12);
  border: 1px solid rgba(139, 92, 246, 0.35);
  color: #e9d5ff;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s ease;
  position: relative;
}

.btn-my-agenda:hover {
  background: rgba(139, 92, 246, 0.25);
  border-color: var(--accent-lavender);
  box-shadow: 0 0 16px rgba(139, 92, 246, 0.3);
  color: #ffffff;
}

.agenda-badge {
  background: #ec4899;
  color: white;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 999px;
  min-width: 18px;
  text-align: center;
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.6);
  animation: pulseSubtle 2s infinite ease-in-out;
}

.nav-cta-btn {
  padding: 9px 20px;
  font-size: 0.88rem;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.bar {
  width: 100%;
  height: 2px;
  background: #f8fafc;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.bar.open-1 {
  transform: translateY(7px) rotate(45deg);
}

.bar.open-2 {
  opacity: 0;
}

.bar.open-3 {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(4, 2, 10, 0.8);
  backdrop-filter: blur(12px);
  z-index: 1050;
  display: flex;
  justify-content: flex-end;
}

.mobile-menu-content {
  width: 82%;
  max-width: 360px;
  height: 100%;
  background: #0d0a21;
  border-left: 1px solid rgba(168, 85, 247, 0.25);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.8);
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.close-btn {
  font-size: 1.3rem;
  color: var(--text-muted);
  padding: 6px;
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-links a {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;
}

.mobile-links a:hover {
  background: rgba(139, 92, 246, 0.15);
  color: #ffffff;
  padding-left: 16px;
}

.mobile-actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.w-full {
  width: 100%;
  justify-content: center;
}

/* Media Queries */
@media (max-width: 992px) {
  .nav-links {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }
}

@media (max-width: 576px) {
  .agenda-label {
    display: none;
  }
  
  .btn-my-agenda {
    padding: 8px 10px;
  }

  .nav-cta-btn {
    padding: 8px 14px;
    font-size: 0.82rem;
  }
}
</style>
