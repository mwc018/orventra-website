import './styles.css'

// ── Hamburger menu ──
const hamburger = document.querySelector<HTMLButtonElement>('.hamburger')
const navLinks = document.querySelector<HTMLElement>('.nav-links')

hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open')
})

// Close mobile nav when a link is clicked, and handle custom scroll offsets
const scrollOffsets: Record<string, number> = { services: 5, about: -70 }

function scrollToId(id: string): void {
  const target = document.getElementById(id)
  if (target) {
    const y = target.getBoundingClientRect().top + window.scrollY + (scrollOffsets[id] ?? 0)
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e: MouseEvent) => {
    const id = link.getAttribute('href')!.slice(1)
    if (scrollOffsets[id] !== undefined) {
      e.preventDefault()
      scrollToId(id)
    }
  })
})

navLinks?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e: MouseEvent) => {
    navLinks.classList.remove('open')
    const id = link.getAttribute('href')!.slice(1)
    if (scrollOffsets[id] !== undefined) {
      e.preventDefault()
      scrollToId(id)
    }
  })
})

// ── Nav shrink on scroll ──
const nav = document.querySelector<HTMLElement>('.nav')
window.addEventListener('scroll', () => {
  if (nav) {
    nav.style.background = window.scrollY > 20
      ? 'rgba(9, 9, 11, 0.95)'
      : 'rgba(9, 9, 11, 0.8)'
  }
}, { passive: true })

// ── Scroll reveal ──
const revealEls = document.querySelectorAll<HTMLElement>(
  '.card, .step, .testimonial, .section-header, .about-text, .about-visual, .hero-stats'
)

revealEls.forEach(el => el.classList.add('reveal'))

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement
        if (!parent) return
        const siblings = [...parent.querySelectorAll<HTMLElement>('.reveal')]
        const idx = siblings.indexOf(entry.target as HTMLElement)
        setTimeout(() => {
          entry.target.classList.add('visible')
        }, idx * 80)
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
)

revealEls.forEach(el => observer.observe(el))

// ── Contact form ──
function handleSubmit(e: SubmitEvent): void {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!
  const status = document.getElementById('form-status')!

  btn.disabled = true
  btn.textContent = 'Sending…'

  // Simulate async send (replace with real fetch/API call)
  setTimeout(() => {
    btn.textContent = 'Message sent!'
    status.textContent = "Thanks! We'll be in touch within 24 hours."
    status.style.color = '#4ade80'
    form.reset()

    setTimeout(() => {
      btn.disabled = false
      btn.textContent = 'Send message'
      status.textContent = ''
    }, 5000)
  }, 1200)
}

// Attach form handler
const contactForm = document.querySelector<HTMLFormElement>('.contact-form')
contactForm?.addEventListener('submit', handleSubmit)

// ── Smooth active nav highlight ──
const sections = document.querySelectorAll<HTMLElement>('section[id]')
const navAnchors = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]')

window.addEventListener('scroll', () => {
  let current = ''
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id
  })
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--text-primary)'
      : ''
  })
}, { passive: true })
