<template>
  <div class="filters-container glass-panel">
    <!-- Top row: Search bar and Day Pills -->
    <div class="filters-top-row">
      <!-- Search Input -->
      <div class="search-box">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by event, artist, venue, or keywords..."
          class="search-input"
        />
        <button v-if="searchQuery" class="clear-search" @click="searchQuery = ''" title="Clear search">✕</button>
      </div>

      <!-- Day Selector Pills -->
      <div class="day-pills">
        <button 
          v-for="d in days" 
          :key="d.id"
          class="day-pill" 
          :class="{ 'active': selectedDay === d.id }"
          @click="selectedDay = d.id"
        >
          <span class="day-name">{{ d.label }}</span>
          <span class="day-sub">{{ d.sub }}</span>
        </button>
      </div>
    </div>

    <!-- Category selector tabs -->
    <div class="category-scroll-wrapper">
      <div class="categories-bar">
        <button 
          v-for="cat in CATEGORIES" 
          :key="cat.id"
          class="category-btn"
          :class="{ 'active': selectedCategory === cat.id }"
          @click="selectedCategory = cat.id"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.name }}</span>
          <span class="cat-count">{{ categoryCounts[cat.id] || 0 }}</span>
        </button>
      </div>
    </div>

    <!-- Bottom utility row: Total count, Sorting & View Toggle -->
    <div class="filters-meta-row">
      <div class="results-count">
        <span class="count-num">{{ totalResults }}</span>
        <span class="count-label">Competitions & Events Found</span>
      </div>

      <div class="filter-controls">
        <!-- Sort Select -->
        <div class="sort-wrapper">
          <label class="sort-label">Sort by:</label>
          <select v-model="sortBy" class="sort-select">
            <option value="featured">✨ Featured & Popular</option>
            <option value="prize-high">🏆 Prize: High to Low</option>
            <option value="slots-left">⚡ Filling Fast (Fewest Slots)</option>
            <option value="name">🔤 Alphabetical (A-Z)</option>
          </select>
        </div>

        <!-- View mode toggle -->
        <div class="view-toggle">
          <button 
            class="view-btn" 
            :class="{ 'active': viewMode === 'grid' }"
            @click="viewMode = 'grid'"
            title="Grid view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button 
            class="view-btn" 
            :class="{ 'active': viewMode === 'compact' }"
            @click="viewMode = 'compact'"
            title="Compact list view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CATEGORIES } from '../data/eventsData'
import { useFestoraState } from '../composables/useFestoraState'

const { 
  searchQuery, 
  selectedCategory, 
  selectedDay, 
  sortBy, 
  viewMode, 
  categoryCounts,
  filteredEvents 
} = useFestoraState()

const days = [
  { id: 'all', label: 'All Days', sub: 'Nov 14–16' },
  { id: 'Day 1', label: 'Day 1', sub: 'Fri • Nov 14' },
  { id: 'Day 2', label: 'Day 2', sub: 'Sat • Nov 15' },
  { id: 'Day 3', label: 'Day 3', sub: 'Sun • Nov 16' }
]

const totalResults = computed(() => filteredEvents.value.length)
</script>

<style scoped>
.filters-container {
  padding: 22px 24px;
  margin-bottom: 36px;
  border-radius: var(--radius-xl);
  background: rgba(18, 14, 38, 0.7);
  border: 1px solid rgba(168, 85, 247, 0.22);
}

.filters-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

/* Search Box */
.search-box {
  flex: 1;
  min-width: 280px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  color: var(--text-dim);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 13px 40px 13px 44px;
  background: rgba(8, 6, 18, 0.85);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: var(--radius-full);
  color: #ffffff;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;
  outline: none;
}

.search-input:focus {
  border-color: var(--accent-violet);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.35);
  background: rgba(12, 9, 26, 0.95);
}

.clear-search {
  position: absolute;
  right: 14px;
  color: var(--text-muted);
  font-size: 0.9rem;
  padding: 4px;
}

.clear-search:hover {
  color: #ffffff;
}

/* Day Pills */
.day-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(10, 8, 22, 0.6);
  padding: 5px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.day-pill {
  padding: 8px 16px;
  border-radius: var(--radius-full);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.day-name {
  font-weight: 700;
  font-size: 0.85rem;
}

.day-sub {
  font-size: 0.68rem;
  opacity: 0.8;
}

.day-pill.active {
  background: var(--grad-accent-btn);
  color: #ffffff;
  box-shadow: 0 2px 14px rgba(168, 85, 247, 0.4);
}

.day-pill:hover:not(.active) {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

/* Category Scroll */
.category-scroll-wrapper {
  overflow-x: auto;
  padding-bottom: 8px;
  margin-bottom: 16px;
}

.category-scroll-wrapper::-webkit-scrollbar {
  height: 5px;
}

.categories-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  width: max-content;
}

.category-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  font-size: 0.88rem;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.category-btn:hover {
  background: rgba(168, 85, 247, 0.15);
  border-color: rgba(168, 85, 247, 0.35);
  color: #ffffff;
}

.category-btn.active {
  background: rgba(168, 85, 247, 0.25);
  border-color: var(--accent-lavender);
  color: #ffffff;
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.35);
}

.cat-count {
  font-size: 0.72rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 7px;
  border-radius: 999px;
  color: var(--text-muted);
}

.category-btn.active .cat-count {
  background: var(--accent-pink);
  color: #ffffff;
}

/* Meta & Sorting Row */
.filters-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
  gap: 16px;
}

.results-count {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
}

.count-num {
  font-weight: 800;
  font-family: var(--font-display);
  color: var(--accent-lavender);
  font-size: 1.15rem;
}

.count-label {
  color: var(--text-muted);
}

.filter-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.sort-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-label {
  font-size: 0.85rem;
  color: var(--text-dim);
}

.sort-select {
  background: rgba(10, 8, 22, 0.85);
  border: 1px solid rgba(168, 85, 247, 0.25);
  color: #f1f5f9;
  padding: 8px 14px;
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  outline: none;
  cursor: pointer;
  font-family: inherit;
}

.sort-select option {
  background: #110e26;
  color: #ffffff;
}

/* View toggle */
.view-toggle {
  display: flex;
  align-items: center;
  background: rgba(10, 8, 22, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  padding: 3px;
}

.view-btn {
  padding: 6px 10px;
  border-radius: 6px;
  color: var(--text-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.view-btn.active {
  background: rgba(168, 85, 247, 0.3);
  color: #ffffff;
}

.view-btn:hover:not(.active) {
  color: #ffffff;
}

@media (max-width: 768px) {
  .filters-container {
    padding: 16px;
  }

  .filters-top-row {
    flex-direction: column;
    align-items: stretch;
  }

  .day-pills {
    overflow-x: auto;
    justify-content: space-between;
  }

  .filters-meta-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
