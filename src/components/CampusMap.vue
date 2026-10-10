<template>
  <section id="campus-map" class="campus-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="section-eyebrow">
          <span>📍 CAMPUS NAVIGATION & DIRECTORY</span>
        </div>
        <h2 class="section-title">
          FESTIVAL <span>ZONES & MAP</span>
        </h2>
        <p class="section-desc">
          Navigate 60 acres of festival grounds. Locate stages, gaming arenas, food truck courtyards, and emergency desks.
        </p>
      </div>

      <!-- Campus Guide Layout -->
      <div class="campus-layout">
        <!-- Visual Schematic Map Panel -->
        <div class="map-schematic glass-panel">
          <div class="map-overlay-title">
            <span>🗺️ METROPOLIS CAMPUS SCHEMATIC</span>
            <span class="pulse-live-marker">LIVE RADAR ACTIVE</span>
          </div>

          <!-- Stylized SVG Campus Schematic Map -->
          <div class="schematic-viewport">
            <svg viewBox="0 0 800 500" class="campus-svg-map">
              <defs>
                <linearGradient id="zoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#1e1346" />
                  <stop offset="100%" stop-color="#0f0c23" />
                </linearGradient>
                <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#7c3aed" />
                  <stop offset="100%" stop-color="#ec4899" />
                </linearGradient>
              </defs>

              <!-- Campus Grid Lines -->
              <pattern id="campusGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(168, 85, 247, 0.08)" stroke-width="1"/>
              </pattern>
              <rect width="800" height="500" fill="url(#campusGrid)" />

              <!-- Campus Pathways / Roads -->
              <path d="M 50 250 Q 250 240 400 250 T 750 250" fill="none" stroke="rgba(168, 85, 247, 0.25)" stroke-width="8" stroke-dasharray="10 5" />
              <path d="M 400 50 L 400 450" fill="none" stroke="rgba(168, 85, 247, 0.2)" stroke-width="6" />
              <path d="M 180 120 L 620 380" fill="none" stroke="rgba(168, 85, 247, 0.15)" stroke-width="4" />

              <!-- Zone A: Main Amphitheatre -->
              <g 
                class="map-node" 
                :class="{ 'selected': activeZoneIndex === 0 }"
                @click="activeZoneIndex = 0"
              >
                <circle cx="220" cy="140" r="48" fill="url(#zoneGrad)" stroke="#a855f7" stroke-width="2" class="node-circle" />
                <circle cx="220" cy="140" r="16" fill="#8b5cf6" opacity="0.3" class="pulse-ring" />
                <text x="220" y="136" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">ZONE A</text>
                <text x="220" y="154" text-anchor="middle" fill="#c084fc" font-size="10">Amphitheatre</text>
              </g>

              <!-- Zone B: Nirvana Concert Grounds -->
              <g 
                class="map-node" 
                :class="{ 'selected': activeZoneIndex === 1 }"
                @click="activeZoneIndex = 1"
              >
                <circle cx="580" cy="130" r="56" fill="url(#zoneGrad)" stroke="#ec4899" stroke-width="2" class="node-circle" />
                <circle cx="580" cy="130" r="20" fill="#ec4899" opacity="0.3" class="pulse-ring" />
                <text x="580" y="126" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">ZONE B</text>
                <text x="580" y="144" text-anchor="middle" fill="#f472b6" font-size="10">Nirvana Mainstage</text>
              </g>

              <!-- Zone C: Tech Park -->
              <g 
                class="map-node" 
                :class="{ 'selected': activeZoneIndex === 2 }"
                @click="activeZoneIndex = 2"
              >
                <rect x="150" y="320" width="120" height="80" rx="14" fill="url(#zoneGrad)" stroke="#06b6d4" stroke-width="2" class="node-rect" />
                <text x="210" y="356" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">ZONE C</text>
                <text x="210" y="374" text-anchor="middle" fill="#67e8f9" font-size="10">Tech Park & Labs</text>
              </g>

              <!-- Zone D: Cyber Arena -->
              <g 
                class="map-node" 
                :class="{ 'selected': activeZoneIndex === 3 }"
                @click="activeZoneIndex = 3"
              >
                <rect x="340" y="210" width="120" height="80" rx="14" fill="url(#zoneGrad)" stroke="#a855f7" stroke-width="2" class="node-rect" />
                <text x="400" y="246" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">ZONE D</text>
                <text x="400" y="264" text-anchor="middle" fill="#c084fc" font-size="10">Esports Arena</text>
              </g>

              <!-- Zone E: Library Quad -->
              <g 
                class="map-node" 
                :class="{ 'selected': activeZoneIndex === 4 }"
                @click="activeZoneIndex = 4"
              >
                <circle cx="530" cy="360" r="46" fill="url(#zoneGrad)" stroke="#fbbf24" stroke-width="2" class="node-circle" />
                <text x="530" y="356" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">ZONE E</text>
                <text x="530" y="374" text-anchor="middle" fill="#fef08a" font-size="10">Library Quad</text>
              </g>

              <!-- Zone F: Food Alley -->
              <g 
                class="map-node" 
                :class="{ 'selected': activeZoneIndex === 5 }"
                @click="activeZoneIndex = 5"
              >
                <rect x="670" y="250" width="100" height="60" rx="10" fill="url(#zoneGrad)" stroke="#22c55e" stroke-width="1.5" class="node-rect" />
                <text x="720" y="278" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">ZONE F</text>
                <text x="720" y="294" text-anchor="middle" fill="#86efac" font-size="9">Food Alley</text>
              </g>
            </svg>
          </div>

          <!-- Quick Campus Amenities Footnote -->
          <div class="map-amenities-row">
            <span class="amenity-item">🚑 First Aid Center (Gate 1)</span>
            <span class="amenity-item">💧 Free Water Stations</span>
            <span class="amenity-item">🛅 Cloakroom & Lockers</span>
            <span class="amenity-item">🚌 Free City Shuttle Hub</span>
          </div>
        </div>

        <!-- Venue Details Directory Sidebar -->
        <div class="venues-sidebar">
          <div 
            v-for="(venue, vIdx) in VENUES" 
            :key="vIdx"
            class="venue-card"
            :class="{ 'active': activeZoneIndex === vIdx }"
            @click="activeZoneIndex = vIdx"
          >
            <div class="venue-card-header">
              <span class="venue-zone-tag">{{ venue.tag }}</span>
              <span class="venue-cap">{{ venue.capacity }}</span>
            </div>
            <h4 class="venue-name">{{ venue.name }}</h4>
            <p class="venue-desc">{{ venue.desc }}</p>
            <div class="venue-events-strip">
              <span class="strip-label">Hosting:</span>
              <span class="strip-val">{{ venue.events }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { VENUES } from '../data/eventsData'

const activeZoneIndex = ref(0)
</script>

<style scoped>
.campus-section {
  padding: 90px 0;
  position: relative;
}

.campus-layout {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 28px;
  align-items: stretch;
}

/* Map Schematic */
.map-schematic {
  padding: 24px;
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  background: rgba(14, 11, 34, 0.85);
  border: 1px solid rgba(168, 85, 247, 0.25);
}

.map-overlay-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
}

.pulse-live-marker {
  font-size: 0.72rem;
  color: #86efac;
  background: rgba(34, 197, 94, 0.15);
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid rgba(34, 197, 94, 0.4);
}

.schematic-viewport {
  width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #090716;
  border: 1px solid rgba(255, 255, 255, 0.06);
  aspect-ratio: 16 / 10;
  position: relative;
}

.campus-svg-map {
  width: 100%;
  height: 100%;
}

.map-node {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.map-node:hover .node-circle,
.map-node:hover .node-rect {
  filter: brightness(1.3);
  stroke-width: 3;
}

.map-node.selected .node-circle,
.map-node.selected .node-rect {
  stroke: #ffffff;
  stroke-width: 3.5;
  filter: drop-shadow(0 0 12px rgba(236, 72, 153, 0.8));
}

.pulse-ring {
  animation: pulseSubtle 2s infinite ease-in-out;
}

.map-amenities-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 18px;
  padding-top: 18px;
  margin-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* Sidebar Directory */
.venues-sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 580px;
  overflow-y: auto;
  padding-right: 6px;
}

.venue-card {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-lg);
  padding: 16px 18px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.venue-card:hover {
  background: rgba(168, 85, 247, 0.1);
  border-color: rgba(168, 85, 247, 0.35);
  transform: translateX(4px);
}

.venue-card.active {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.15) 100%);
  border-color: var(--accent-lavender);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.25);
}

.venue-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.venue-zone-tag {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.75rem;
  color: var(--accent-pink);
  background: rgba(236, 72, 153, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
}

.venue-cap {
  font-size: 0.76rem;
  color: var(--text-dim);
}

.venue-name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
}

.venue-desc {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.45;
  margin-bottom: 8px;
}

.venue-events-strip {
  display: flex;
  gap: 6px;
  font-size: 0.76rem;
}

.strip-label {
  color: var(--accent-lavender);
  font-weight: 700;
}

.strip-val {
  color: var(--text-muted);
}

@media (max-width: 992px) {
  .campus-layout {
    grid-template-columns: 1fr;
  }
}
</style>
