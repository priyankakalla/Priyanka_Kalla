import { useEffect } from 'react'

export default function useReveal(filter, project, contact) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.remove('reveal-pending')
        entry.target.classList.add('reveal-visible')
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.06 })
    const elements = document.querySelectorAll('.d2c-banner > *, .hero-copy > *, .hero-visual, .expertise-strip, .section-heading, .project, .service-card, .about-art, .about-copy > *, .contact-section > *, .footer > *, .modal')
    elements.forEach((element, index) => {
      if (element.classList.contains('reveal-visible')) return
      element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`)
      element.classList.add('reveal-pending')
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [filter, project, contact])
}
