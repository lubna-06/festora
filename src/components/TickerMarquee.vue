<template>
  <div class="marquee-strip">
    <div class="marquee-track animate-marquee">
      <div v-for="i in 2" :key="i" class="marquee-content">
        <span class="marquee-item"><span class="star">★</span> BATTLE OF THE BANDS</span>
        <span class="marquee-item"><span class="star">★</span> 24H HACKFEST 2026</span>
        <span class="marquee-item"><span class="star">★</span> GRAND EDM PRO NIGHT FT. LOST STORIES & NUCLEYA</span>
        <span class="marquee-item"><span class="star">★</span> ₹5,00,000+ TOTAL CASH POOL</span>
        <span class="marquee-item"><span class="star">★</span> VOGUE HAUTE COUTURE RUNWAY</span>
        <span class="marquee-item"><span class="star">★</span> ROBOWARS 15KG STEEL CARNAGE</span>
        <span class="marquee-item"><span class="star">★</span> STANDUP COMEDY FT. SAMAY RAINA</span>
        <span class="marquee-item"><span class="star">★</span> STEP UP WESTERN CREW SHOWDOWN</span>
        <span class="marquee-item"><span class="star">★</span> VALORANT & BGMI LAN CHAMPIONSHIP</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-strip {
  width: 100%;
  overflow: hidden;
  background: linear-gradient(90deg, #180d38 0%, #2e1065 50%, #180d38 100%);
  border-top: 1px solid rgba(168, 85, 247, 0.3);
  border-bottom: 1px solid rgba(168, 85, 247, 0.3);
  padding: 14px 0;
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.2);
  white-space: nowrap;
}

.marquee-track {
  display: flex;
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: 36px;
  padding-right: 36px;
}

.marquee-item {
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #f1f5f9;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-transform: uppercase;
}

.star {
  color: var(--accent-pink);
  font-size: 1rem;
  text-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
}
</style>
