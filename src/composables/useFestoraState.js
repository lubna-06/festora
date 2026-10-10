import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import { EVENTS, PASS_TIERS } from '../data/eventsData'

// Helper for dark-violet themed SweetAlert2
export const festivalSwal = Swal.mixin({
  background: '#120f29',
  color: '#f8fafc',
  confirmButtonColor: '#8b5cf6',
  cancelButtonColor: '#334155',
  customClass: {
    popup: 'festora-swal-popup',
    title: 'festora-swal-title',
    htmlContainer: 'festora-swal-html',
    confirmButton: 'festora-swal-confirm-btn',
    cancelButton: 'festora-swal-cancel-btn'
  }
})

// Toast notification helper
export const showToast = (title, icon = 'success') => {
  festivalSwal.fire({
    title,
    icon,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })
}

// Reactive Global State
const registeredEvents = ref(JSON.parse(localStorage.getItem('festora_registered_events') || '[]'))
const userPass = ref(JSON.parse(localStorage.getItem('festora_user_pass') || 'null'))
const favorites = ref(JSON.parse(localStorage.getItem('festora_favorites') || '[]'))
const userProfile = ref(JSON.parse(localStorage.getItem('festora_user_profile') || JSON.stringify({
  fullName: '',
  email: '',
  college: '',
  phone: ''
})))

// Interactive modal states
const selectedEventModal = ref(null)
const isPassModalOpen = ref(false)
const isScheduleDrawerOpen = ref(false)
const preselectedPassTier = ref(null)

// Filtering states
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedDay = ref('all')
const sortBy = ref('featured') // featured, prize-high, name, slots-left
const viewMode = ref('grid') // grid, compact

// Synchronize with LocalStorage
watch(registeredEvents, (val) => {
  localStorage.setItem('festora_registered_events', JSON.stringify(val))
}, { deep: true })

watch(userPass, (val) => {
  localStorage.setItem('festora_user_pass', JSON.stringify(val))
}, { deep: true })

watch(favorites, (val) => {
  localStorage.setItem('festora_favorites', JSON.stringify(val))
}, { deep: true })

watch(userProfile, (val) => {
  localStorage.setItem('festora_user_profile', JSON.stringify(val))
}, { deep: true })

export function useFestoraState() {
  const isRegistered = (eventId) => {
    return registeredEvents.value.some(item => item.eventId === eventId)
  }

  const getRegistration = (eventId) => {
    return registeredEvents.value.find(item => item.eventId === eventId)
  }

  const isFavorite = (eventId) => {
    return favorites.value.includes(eventId)
  }

  const toggleFavorite = (eventId) => {
    const idx = favorites.value.indexOf(eventId)
    if (idx === -1) {
      favorites.value.push(eventId)
      showToast('Event added to your favorites! ❤️', 'success')
    } else {
      favorites.value.splice(idx, 1)
      showToast('Event removed from favorites.', 'info')
    }
  }

  const openEventModal = (event) => {
    selectedEventModal.value = event
  }

  const closeEventModal = () => {
    selectedEventModal.value = null
  }

  const openPassModal = (tier = null) => {
    preselectedPassTier.value = tier || PASS_TIERS[1] // default gold
    isPassModalOpen.value = true
  }

  const closePassModal = () => {
    isPassModalOpen.value = false
    preselectedPassTier.value = null
  }

  const openScheduleDrawer = () => {
    isScheduleDrawerOpen.value = true
  }

  const closeScheduleDrawer = () => {
    isScheduleDrawerOpen.value = false
  }

  // Register for an event
  const registerForEvent = async (event, details) => {
    if (!details.fullName || !details.email || !details.college || !details.phone) {
      festivalSwal.fire({
        icon: 'warning',
        title: 'Missing Required Fields',
        text: 'Please fill in your name, email, college name, and phone number to complete registration.'
      })
      return false
    }

    if (isRegistered(event.id)) {
      festivalSwal.fire({
        icon: 'info',
        title: 'Already Registered',
        text: `You have already registered for ${event.title}! Check "My Schedule & Pass" in the top bar.`
      })
      return false
    }

    // Save profile for auto-filling next registrations
    userProfile.value = {
      fullName: details.fullName,
      email: details.email,
      college: details.college,
      phone: details.phone
    }

    const registrationId = `FEST-2026-${Math.floor(100000 + Math.random() * 900000)}`
    const record = {
      registrationId,
      eventId: event.id,
      eventTitle: event.title,
      eventCategory: event.category,
      venue: event.venue,
      date: event.date,
      time: event.time,
      registeredAt: new Date().toISOString(),
      attendee: {
        name: details.fullName,
        email: details.email,
        college: details.college,
        phone: details.phone,
        teamName: details.teamName || 'Solo / Registered Crew'
      }
    }

    registeredEvents.value.push(record)

    await festivalSwal.fire({
      icon: 'success',
      title: 'Registration Confirmed! 🎉',
      html: `
        <div style="text-align: left; background: rgba(139, 92, 246, 0.1); border: 1px dashed rgba(139, 92, 246, 0.4); border-radius: 12px; padding: 16px; margin: 16px 0;">
          <p style="margin: 0 0 8px 0; color: #e9d5ff; font-weight: 700; font-size: 1.1rem;">${event.title}</p>
          <p style="margin: 4px 0; color: #94a3b8; font-size: 0.9rem;"><strong>Registration ID:</strong> <span style="color: #a78bfa; font-family: monospace; font-size: 1rem;">${registrationId}</span></p>
          <p style="margin: 4px 0; color: #94a3b8; font-size: 0.9rem;"><strong>Participant:</strong> ${details.fullName} (${details.college})</p>
          <p style="margin: 4px 0; color: #94a3b8; font-size: 0.9rem;"><strong>Slot:</strong> ${event.date} • ${event.time}</p>
          <p style="margin: 4px 0; color: #94a3b8; font-size: 0.9rem;"><strong>Venue:</strong> ${event.venue}</p>
        </div>
        <p style="color: #cbd5e1; font-size: 0.95rem;">Confirmation saved to your festival dashboard. Show your Registration ID at the venue desk.</p>
      `,
      confirmButtonText: 'Awesome, Got It!'
    })

    return true
  }

  // Cancel / Unregister an event with SweetAlert2 confirmation
  const unregisterEvent = async (eventId) => {
    const reg = getRegistration(eventId)
    if (!reg) return

    const result = await festivalSwal.fire({
      icon: 'warning',
      title: 'Cancel Registration?',
      text: `Are you sure you want to cancel your slot for "${reg.eventTitle}"? Your registration code ${reg.registrationId} will be invalidated.`,
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#334155',
      confirmButtonText: 'Yes, Release Slot',
      cancelButtonText: 'Keep My Spot'
    })

    if (result.isConfirmed) {
      registeredEvents.value = registeredEvents.value.filter(item => item.eventId !== eventId)
      festivalSwal.fire({
        icon: 'success',
        title: 'Registration Cancelled',
        text: 'Your slot has been released back to the event pool.',
        timer: 2000,
        showConfirmButton: false
      })
    }
  }

  // Book Festival Pass
  const bookPass = async (tier, details) => {
    if (!details.fullName || !details.email || !details.college || !details.phone) {
      festivalSwal.fire({
        icon: 'warning',
        title: 'Incomplete Details',
        text: 'Please provide your full name, college, email and contact phone to issue your festival pass.'
      })
      return false
    }

    userProfile.value = {
      fullName: details.fullName,
      email: details.email,
      college: details.college,
      phone: details.phone
    }

    const passId = `FEST-PASS-${tier.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
    userPass.value = {
      passId,
      tierId: tier.id,
      tierName: tier.name,
      price: tier.price,
      proNightAccess: tier.proNightAccess,
      issuedAt: new Date().toISOString(),
      attendee: {
        name: details.fullName,
        email: details.email,
        college: details.college,
        phone: details.phone
      }
    }

    closePassModal()

    await festivalSwal.fire({
      icon: 'success',
      title: 'Pass Activated! ⚡',
      html: `
        <div style="text-align: left; background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.5); border-radius: 12px; padding: 18px; margin: 16px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-weight: 800; font-size: 1.2rem; color: #f5d0fe;">${tier.name}</span>
            <span style="background: #9333ea; color: white; padding: 2px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">ACTIVE</span>
          </div>
          <p style="margin: 4px 0; color: #cbd5e1; font-size: 0.9rem;"><strong>Pass Token:</strong> <code style="color: #c084fc; font-weight: bold;">${passId}</code></p>
          <p style="margin: 4px 0; color: #cbd5e1; font-size: 0.9rem;"><strong>Issued To:</strong> ${details.fullName} (${details.college})</p>
          <p style="margin: 4px 0; color: #cbd5e1; font-size: 0.9rem;"><strong>Pro Nights Access:</strong> ${tier.proNightAccess}</p>
        </div>
        <p style="color: #cbd5e1; font-size: 0.95rem;">Your digital festival badge has been loaded into your pass wallet.</p>
      `,
      confirmButtonText: 'View My Festival Pass'
    })

    openScheduleDrawer()
    return true
  }

  // Filtered Events Computed
  const filteredEvents = computed(() => {
    let result = [...EVENTS]

    // Category filter
    if (selectedCategory.value !== 'all') {
      result = result.filter(e => e.category === selectedCategory.value)
    }

    // Day filter
    if (selectedDay.value !== 'all') {
      result = result.filter(e => e.day === selectedDay.value)
    }

    // Search query
    if (searchQuery.value.trim() !== '') {
      const q = searchQuery.value.toLowerCase().trim()
      result = result.filter(e => 
        e.title.toLowerCase().includes(q) ||
        e.subtitle.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    // Sorting
    if (sortBy.value === 'prize-high') {
      result.sort((a, b) => {
        const pA = parseInt(a.prizePool.replace(/[^0-9]/g, '')) || 0
        const pB = parseInt(b.prizePool.replace(/[^0-9]/g, '')) || 0
        return pB - pA
      })
    } else if (sortBy.value === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy.value === 'slots-left') {
      result.sort((a, b) => (a.maxSlots - a.registeredCount) - (b.maxSlots - b.registeredCount))
    }

    return result
  })

  // Category counts
  const categoryCounts = computed(() => {
    const counts = { all: EVENTS.length }
    EVENTS.forEach(e => {
      counts[e.category] = (counts[e.category] || 0) + 1
    })
    return counts
  })

  return {
    registeredEvents,
    userPass,
    favorites,
    userProfile,
    selectedEventModal,
    isPassModalOpen,
    isScheduleDrawerOpen,
    preselectedPassTier,
    searchQuery,
    selectedCategory,
    selectedDay,
    sortBy,
    viewMode,
    filteredEvents,
    categoryCounts,
    isRegistered,
    getRegistration,
    isFavorite,
    toggleFavorite,
    openEventModal,
    closeEventModal,
    openPassModal,
    closePassModal,
    openScheduleDrawer,
    closeScheduleDrawer,
    registerForEvent,
    unregisterEvent,
    bookPass
  }
}
