<template>
  <footer class="footer-wrap">
    <div class="container footer-inner">
      <!-- Top Brand Row -->
      <div class="footer-top">
        <div class="footer-brand-col">
          <div class="footer-logo">
            <span class="logo-bolt">⚡</span>
            <span class="logo-name">FESTORA</span>
            <span class="logo-year">2026</span>
          </div>
          <p class="footer-tagline">
            The Annual Inter-Collegiate Cultural, Arts & Tech Extravaganza.
            November 14 – 16, 2026 • Metropolis University Main Campus.
          </p>
          <div class="social-links">
            <a href="#" class="social-btn" title="Instagram">📸</a>
            <a href="#" class="social-btn" title="YouTube">🎬</a>
            <a href="#" class="social-btn" title="Spotify">🎧</a>
            <a href="#" class="social-btn" title="Discord">💬</a>
            <a href="#" class="social-btn" title="X / Twitter">🐦</a>
          </div>
        </div>

        <div class="footer-links-col">
          <h5 class="col-heading">Festival Discovery</h5>
          <a href="#events" class="footer-link">All 35+ Competitions</a>
          <a href="#pro-nights" class="footer-link">Celebrity Pro Nights</a>
          <a href="#schedule" class="footer-link">3-Day Timeline</a>
          <a href="#passes" class="footer-link">Wristbands & Tickets</a>
          <a href="#campus-map" class="footer-link">Interactive Campus Map</a>
        </div>

        <div class="footer-links-col">
          <h5 class="col-heading">Categories</h5>
          <a href="#events" class="footer-link">Music & Rock Battle</a>
          <a href="#events" class="footer-link">Western Dance & Cypher</a>
          <a href="#events" class="footer-link">HackFest 2026 (24h)</a>
          <a href="#events" class="footer-link">RoboWars & Esports</a>
          <a href="#events" class="footer-link">Vogue Fashion Runway</a>
        </div>

        <div class="footer-contact-col">
          <h5 class="col-heading">Campus Headquarters</h5>
          <p class="contact-text">Metropolis University Student Center, Block 4</p>
          <p class="contact-text">Helpline: +91 (800) 456-7890</p>
          <p class="contact-text">Inquiries: festora2026@metropolis.edu</p>
          <div class="live-status-pill">
            <span class="status-dot"></span>
            <span>REGISTRATION PORTAL OPEN</span>
          </div>
        </div>
      </div>

      <!-- Bottom Credits -->
      <div class="footer-bottom">
        <p class="copy-text">
          © 2026 FESTORA Student Council. All rights reserved. Crafted with Vue 3 & Vite.
        </p>
        <button class="btn-back-top" @click="scrollToTop">
          <span>Back to Top ↑</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer-wrap {
  background: #080614;
  border-top: 1px solid rgba(168, 85, 247, 0.2);
  padding: 80px 0 36px 0;
  position: relative;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
  gap: 40px;
  margin-bottom: 60px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.logo-bolt {
  font-size: 1.4rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  padding: 4px;
  border-radius: 8px;
}

.logo-name {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.08em;
}

.logo-year {
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--accent-lavender);
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.4);
  padding: 2px 7px;
  border-radius: 6px;
}

.footer-tagline {
  color: var(--text-muted);
  font-size: 0.88rem;
  line-height: 1.6;
  max-width: 320px;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  gap: 10px;
}

.social-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.2s ease;
}

.social-btn:hover {
  background: rgba(168, 85, 247, 0.25);
  border-color: var(--accent-violet);
  transform: translateY(-3px);
}

.col-heading {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  margin-bottom: 18px;
}

.footer-links-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-link {
  color: var(--text-secondary);
  font-size: 0.88rem;
  transition: all 0.2s ease;
}

.footer-link:hover {
  color: #ffffff;
  padding-left: 6px;
}

.footer-contact-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-text {
  font-size: 0.86rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.live-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #86efac;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 999px;
  margin-top: 10px;
  width: max-content;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
  gap: 16px;
}

.copy-text {
  font-size: 0.82rem;
  color: var(--text-dim);
}

.btn-back-top {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--accent-lavender);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 6px 16px;
  border-radius: var(--radius-full);
  transition: all 0.2s ease;
}

.btn-back-top:hover {
  background: rgba(168, 85, 247, 0.2);
  color: #ffffff;
}

@media (max-width: 992px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .footer-top {
    grid-template-columns: 1fr;
  }
}
</style>
