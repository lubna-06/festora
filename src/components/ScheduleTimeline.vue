<template>
  <section id="schedule" class="schedule-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-eyebrow">
          <span>📅 3 DAYS OF NONSTOP ACTION</span>
        </div>
        <h2 class="section-title">
          FESTIVAL <span>SCHEDULE & AGENDA</span>
        </h2>
        <p class="section-desc">
          Plan your festival weekend across multiple campus stages, arenas, and auditoriums.
        </p>
      </div>

      <!-- Schedule Day Tabs -->
      <div class="schedule-tabs-wrap">
        <div class="schedule-tabs">
          <button 
            v-for="(dayItem, idx) in SCHEDULE_TIMELINE" 
            :key="dayItem.day"
            class="sched-tab-btn"
            :class="{ 'active': activeDayIndex === idx }"
            @click="activeDayIndex = idx"
          >
            <div class="tab-day-title">{{ dayItem.day }}</div>
            <div class="tab-day-sub">{{ dayItem.dayLabel }}</div>
            <div class="tab-theme-badge">{{ dayItem.theme }}</div>
          </button>
        </div>
      </div>

      <!-- Timeline Display for Selected Day -->
      <div class="timeline-container glass-panel">
        <div class="timeline-header-bar">
          <span class="active-theme-text">
            ⚡ Day Theme: <strong>{{ currentDaySchedule.theme }}</strong>
          </span>
          <span class="slots-total">
            {{ currentDaySchedule.slots.length }} Scheduled Events
          </span>
        </div>

        <div class="timeline-flow">
          <div 
            v-for="(slot, sIdx) in currentDaySchedule.slots" 
            :key="sIdx"
            class="timeline-item"
            :class="{ 'is-highlight': slot.highlight, 'is-pro': slot.pro }"
          >
            <!-- Time Node -->
            <div class="timeline-time-col">
              <span class="slot-time">{{ slot.time }}</span>
              <div class="time-node-dot">
                <div class="inner-dot"></div>
              </div>
            </div>

            <!-- Content Card -->
            <div class="timeline-card">
              <div class="slot-top">
                <span class="slot-venue">📍 {{ slot.venue }}</span>
                <span v-if="slot.pro" class="badge-pro-night">🌟 PRO CONCERT</span>
                <span v-else-if="slot.highlight" class="badge-flagship">★ FLAGSHIP</span>
              </div>

              <h4 class="slot-title">{{ slot.title }}</h4>

              <div class="slot-actions">
                <button class="btn-slot-explore" @click="handleExploreSlot(slot.title)">
                  <span>Explore Event</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SCHEDULE_TIMELINE, EVENTS } from '../data/eventsData'
import { useFestoraState } from '../composables/useFestoraState'

const { openEventModal, searchQuery, openPassModal } = useFestoraState()

const activeDayIndex = ref(0)

const currentDaySchedule = computed(() => {
  return SCHEDULE_TIMELINE[activeDayIndex.value]
})

const handleExploreSlot = (slotTitle) => {
  // Try to match in EVENTS
  const cleanTitle = slotTitle.toLowerCase()
  const matched = EVENTS.find(e => 
    cleanTitle.includes(e.title.toLowerCase().substring(0, 10)) ||
    e.title.toLowerCase().includes(cleanTitle.substring(0, 10))
  )

  if (matched) {
    openEventModal(matched)
  } else if (cleanTitle.includes('pro night')) {
    openPassModal(null)
  } else {
    // Jump to events with search
    searchQuery.value = slotTitle.split(':')[0]
    const el = document.querySelector('#events')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.schedule-section {
  padding: 90px 0;
  position: relative;
}

.schedule-tabs-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 36px;
}

.schedule-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 900px;
}

.sched-tab-btn {
  background: rgba(16, 12, 38, 0.7);
  border: 1px solid rgba(168, 85, 247, 0.2);
  padding: 18px 20px;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  transition: all 0.28s ease;
}

.sched-tab-btn:hover:not(.active) {
  background: rgba(24, 18, 56, 0.85);
  border-color: rgba(192, 132, 252, 0.4);
  transform: translateY(-2px);
}

.sched-tab-btn.active {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.2) 100%);
  border-color: var(--accent-violet);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.35);
}

.tab-day-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  color: #ffffff;
}

.tab-day-sub {
  font-size: 0.85rem;
  color: var(--accent-lavender);
  font-weight: 600;
}

.tab-theme-badge {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 3px 10px;
  border-radius: 999px;
  margin-top: 4px;
}

.sched-tab-btn.active .tab-theme-badge {
  background: rgba(168, 85, 247, 0.3);
  color: #ffffff;
}

/* Timeline Box */
.timeline-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 28px 36px;
  background: rgba(15, 12, 35, 0.8);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: var(--radius-xl);
}

.timeline-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.88rem;
}

.active-theme-text {
  color: var(--text-secondary);
}

.active-theme-text strong {
  color: var(--accent-lavender);
}

.slots-total {
  color: var(--text-dim);
  font-size: 0.82rem;
}

/* Timeline Flow */
.timeline-flow {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

.timeline-flow::before {
  content: '';
  position: absolute;
  top: 15px;
  bottom: 15px;
  left: 110px;
  width: 2px;
  background: linear-gradient(180deg, #8b5cf6, rgba(236, 72, 153, 0.3));
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  position: relative;
}

.timeline-time-col {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  position: relative;
  flex-shrink: 0;
}

.slot-time {
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--accent-lavender);
}

.time-node-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0f0c24;
  border: 2px solid var(--accent-purple);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -9px;
  z-index: 2;
}

.inner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-pink);
}

.timeline-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  transition: all 0.25s ease;
}

.timeline-item:hover .timeline-card {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(168, 85, 247, 0.4);
  transform: translateX(4px);
}

.timeline-item.is-pro .timeline-card {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.1));
  border-color: rgba(236, 72, 153, 0.4);
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.15);
}

.slot-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.slot-venue {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.badge-pro-night {
  background: rgba(236, 72, 153, 0.2);
  border: 1px solid rgba(236, 72, 153, 0.5);
  color: #f472b6;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 999px;
}

.badge-flagship {
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.4);
  color: #c084fc;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 999px;
}

.slot-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
}

.slot-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-slot-explore {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--accent-lavender);
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(168, 85, 247, 0.1);
  transition: all 0.2s ease;
}

.btn-slot-explore:hover {
  background: var(--accent-purple);
  color: white;
}

@media (max-width: 768px) {
  .schedule-tabs {
    grid-template-columns: 1fr;
  }

  .timeline-container {
    padding: 20px 16px;
  }

  .timeline-flow::before {
    left: 80px;
  }

  .timeline-time-col {
    width: 72px;
  }

  .slot-time {
    font-size: 0.76rem;
  }

  .timeline-item {
    gap: 20px;
  }
}
</style>
