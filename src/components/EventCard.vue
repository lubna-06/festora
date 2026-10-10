<template>
  <div 
    class="event-card glass-panel" 
    :class="{ 
      'is-compact': isCompact, 
      'is-registered': registered,
      'is-filling-fast': slotsRemaining <= 5
    }"
  >
    <!-- Event Image Header -->
    <div class="card-media">
      <img :src="event.image" :alt="event.title" class="event-img" loading="lazy" />
      <div class="media-overlay"></div>

      <!-- Top Badges -->
      <div class="media-top-tags">
        <span class="pill-badge pill-purple">
          {{ getCategoryIcon(event.category) }} {{ event.category }}
        </span>
        <span class="pill-badge pill-day">
          {{ event.day }}
        </span>
      </div>

      <!-- Favorite Button -->
      <button 
        class="card-fav-btn" 
        :class="{ 'favorited': favorited }" 
        @click.stop="toggleFavorite(event.id)"
        :title="favorited ? 'Remove from favorites' : 'Add to favorites'"
      >
        <span v-if="favorited">❤️</span>
        <span v-else>🤍</span>
      </button>

      <!-- Prize Pool Tag -->
      <div class="prize-tag">
        <span class="prize-icon">🏆</span>
        <span class="prize-amount">{{ event.prizePool }}</span>
      </div>
    </div>

    <!-- Card Content Body -->
    <div class="card-body">
      <!-- Title & Subtitle -->
      <div class="title-wrap">
        <h3 class="event-title" @click="openEventModal(event)">
          {{ event.title }}
        </h3>
        <p class="event-sub">{{ event.subtitle }}</p>
      </div>

      <!-- Meta Info Pills (Time, Venue, Team) -->
      <div class="meta-grid">
        <div class="meta-item">
          <span class="meta-icon">📍</span>
          <span class="meta-text">{{ event.venue }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">⏰</span>
          <span class="meta-text">{{ event.time }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">👥</span>
          <span class="meta-text">{{ event.teamType }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">🎟️</span>
          <span class="meta-text">{{ event.entryFee }}</span>
        </div>
      </div>

      <!-- Slots / Capacity Indicator -->
      <div class="slots-indicator">
        <div class="slots-info">
          <span class="slots-text">
            <strong>{{ event.registeredCount }}</strong> / {{ event.maxSlots }} slots filled
          </span>
          <span v-if="slotsRemaining <= 4" class="slots-urgency">
            ⚡ {{ slotsRemaining }} left!
          </span>
        </div>
        <div class="progress-track">
          <div 
            class="progress-fill" 
            :style="{ width: `${(event.registeredCount / event.maxSlots) * 100}%` }"
            :class="{ 'critical': slotsRemaining <= 4 }"
          ></div>
        </div>
      </div>

      <!-- Card Action Buttons -->
      <div class="card-actions">
        <button class="btn-details" @click="openEventModal(event)">
          <span>Rules & Details</span>
        </button>

        <!-- Register / Registered Button -->
        <button 
          v-if="!registered" 
          class="btn-register"
          @click="openEventModal(event)"
        >
          <span>Register Now</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <button 
          v-else 
          class="btn-registered"
          @click="openScheduleDrawer"
          title="Click to view registration token"
        >
          <span class="check-icon">✓</span>
          <span>Registered</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CATEGORIES } from '../data/eventsData'
import { useFestoraState } from '../composables/useFestoraState'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  isCompact: {
    type: Boolean,
    default: false
  }
})

const { 
  isRegistered, 
  isFavorite, 
  toggleFavorite, 
  openEventModal, 
  openScheduleDrawer 
} = useFestoraState()

const registered = computed(() => isRegistered(props.event.id))
const favorited = computed(() => isFavorite(props.event.id))
const slotsRemaining = computed(() => Math.max(0, props.event.maxSlots - props.event.registeredCount))

const getCategoryIcon = (catId) => {
  const found = CATEGORIES.find(c => c.id === catId)
  return found ? found.icon : '✨'
}
</script>

<style scoped>
.event-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: rgba(16, 12, 36, 0.75);
  border: 1px solid rgba(168, 85, 247, 0.2);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.event-card:hover {
  transform: translateY(-6px);
  border-color: rgba(192, 132, 252, 0.5);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(139, 92, 246, 0.25);
}

.event-card.is-registered {
  border-color: rgba(34, 197, 94, 0.5);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
}

/* Media Header */
.card-media {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.event-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.event-card:hover .event-img {
  transform: scale(1.08);
}

.media-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(8, 6, 18, 0.3) 0%, rgba(16, 12, 36, 0.95) 100%);
}

.media-top-tags {
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  gap: 8px;
  z-index: 2;
}

.pill-day {
  background: rgba(10, 8, 22, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  backdrop-filter: blur(8px);
}

.card-fav-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(10, 8, 22, 0.65);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  z-index: 2;
  transition: transform 0.2s ease;
}

.card-fav-btn:hover {
  transform: scale(1.18);
}

.prize-tag {
  position: absolute;
  bottom: 12px;
  right: 14px;
  background: rgba(234, 179, 8, 0.18);
  border: 1px solid rgba(234, 179, 8, 0.5);
  backdrop-filter: blur(8px);
  padding: 5px 12px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 2;
}

.prize-amount {
  font-family: var(--font-display);
  font-weight: 800;
  color: #fef08a;
  font-size: 0.88rem;
}

/* Card Body */
.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.title-wrap {
  margin-bottom: 16px;
}

.event-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.3;
  margin-bottom: 6px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.event-title:hover {
  color: var(--accent-lavender);
}

.event-sub {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Meta Grid */
.meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 14px;
  margin-bottom: 18px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.meta-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Slots Progress */
.slots-indicator {
  margin-bottom: 20px;
}

.slots-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--text-dim);
  margin-bottom: 6px;
}

.slots-urgency {
  color: #f43f5e;
  font-weight: 700;
}

.progress-track {
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #ec4899);
  border-radius: 999px;
  transition: width 0.4s ease;
}

.progress-fill.critical {
  background: linear-gradient(90deg, #f59e0b, #ef4444);
}

/* Action Buttons */
.card-actions {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 10px;
  margin-top: auto;
}

.btn-details {
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-secondary);
  border-radius: var(--radius-full);
  font-size: 0.84rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-details:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.25);
}

.btn-register {
  padding: 10px 16px;
  background: var(--grad-accent-btn);
  color: #ffffff;
  border-radius: var(--radius-full);
  font-size: 0.86rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
  transition: all 0.2s ease;
}

.btn-register:hover {
  filter: brightness(1.15);
  box-shadow: 0 6px 20px rgba(168, 85, 247, 0.6);
  transform: translateY(-2px);
}

.btn-registered {
  padding: 10px 16px;
  background: rgba(34, 197, 94, 0.18);
  border: 1px solid rgba(34, 197, 94, 0.5);
  color: #86efac;
  border-radius: var(--radius-full);
  font-size: 0.86rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.check-icon {
  font-weight: 900;
}

/* Compact layout mode */
.event-card.is-compact {
  flex-direction: row;
  height: 180px;
}

.event-card.is-compact .card-media {
  width: 240px;
  height: 100%;
}

.event-card.is-compact .card-body {
  padding: 14px 20px;
}

.event-card.is-compact .meta-grid {
  grid-template-columns: repeat(4, 1fr);
  padding: 8px 12px;
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .event-card.is-compact {
    flex-direction: column;
    height: auto;
  }

  .event-card.is-compact .card-media {
    width: 100%;
    height: 200px;
  }

  .event-card.is-compact .meta-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
