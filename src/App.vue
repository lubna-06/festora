<template>
  <div class="app-root">
    <!-- Sticky Glassmorphic Navbar -->
    <Navbar />

    <main>
      <!-- Hero Section with Sonora dark-violet styling & live countdown -->
      <HeroSection />

      <!-- Infinite Marquee Ticker -->
      <TickerMarquee />

      <!-- Events Discovery & Registration Section -->
      <section id="events" class="events-main-section">
        <div class="container">
          <!-- Section Header -->
          <div class="section-header">
            <div class="section-eyebrow">
              <span>⚡ 35+ COMPETITIVE ARENAS</span>
            </div>
            <h2 class="section-title">
              CHALLENGE. COMPETE. <span>CONQUER.</span>
            </h2>
            <p class="section-desc">
              Filter by category, search by artist or keyword, and register instantly to secure your team’s slot.
            </p>
          </div>

          <!-- Reactive Filters & Search Bar -->
          <EventFilters />

          <!-- Event Cards List / Grid -->
          <div 
            v-if="filteredEvents.length > 0" 
            :class="viewMode === 'grid' ? 'events-grid' : 'events-compact-list'"
          >
            <EventCard 
              v-for="event in filteredEvents" 
              :key="event.id" 
              :event="event" 
              :is-compact="viewMode === 'compact'" 
            />
          </div>

          <!-- Empty State when search returns 0 results -->
          <div v-else class="empty-search-state glass-panel">
            <span class="empty-emoji">🔍</span>
            <h3 class="empty-title">No Events Match Your Filter</h3>
            <p class="empty-sub">
              We couldn't find any competitions matching "<strong style="color: #c084fc;">{{ searchQuery }}</strong>" in this category.
            </p>
            <button class="btn-primary" @click="handleResetFilters">
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Celebrity Pro Nights Section (Sonora inspiration) -->
      <ProNights />

      <!-- Schedule & Timeline Section -->
      <ScheduleTimeline />

      <!-- Festival Passes / Wristbands Section -->
      <PassTiers />

      <!-- Interactive Campus Map & Venue Directory -->
      <CampusMap />

      <!-- FAQ, Student Desk & Sponsors -->
      <FaqSection />
    </main>

    <!-- Footer -->
    <FooterSection />

    <!-- Modals & Drawers -->
    <EventModal />
    <DigitalPassModal />
    <MyScheduleDrawer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import TickerMarquee from './components/TickerMarquee.vue'
import EventFilters from './components/EventFilters.vue'
import EventCard from './components/EventCard.vue'
import EventModal from './components/EventModal.vue'
import ProNights from './components/ProNights.vue'
import ScheduleTimeline from './components/ScheduleTimeline.vue'
import PassTiers from './components/PassTiers.vue'
import DigitalPassModal from './components/DigitalPassModal.vue'
import CampusMap from './components/CampusMap.vue'
import MyScheduleDrawer from './components/MyScheduleDrawer.vue'
import FaqSection from './components/FaqSection.vue'
import FooterSection from './components/FooterSection.vue'

import { useFestoraState } from './composables/useFestoraState'

const { 
  filteredEvents, 
  viewMode, 
  searchQuery, 
  selectedCategory, 
  selectedDay, 
  sortBy 
} = useFestoraState()

const handleResetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  selectedDay.value = 'all'
  sortBy.value = 'featured'
}
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.events-main-section {
  padding: 90px 0 60px 0;
  position: relative;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.events-compact-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* Empty Search State */
.empty-search-state {
  text-align: center;
  padding: 60px 24px;
  max-width: 580px;
  margin: 40px auto;
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.empty-emoji {
  font-size: 3rem;
}

.empty-title {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 700; /* was 800 — Space Grotesk maxes out at 700 */
  color: #ffffff;
}

.empty-sub {
  color: var(--text-muted);
  font-size: 0.95rem;
  max-width: 420px;
  line-height: 1.5;
  margin-bottom: 8px;
}

@media (max-width: 1080px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 680px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
}
</style>