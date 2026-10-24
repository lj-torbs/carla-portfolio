import { useEffect, useRef } from 'react'

/** Native scrolling stays in charge; transforms only add visual depth. */
export function useSpatialBrowsing(enabled: boolean) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const sections = [...root.querySelectorAll<HTMLElement>('main > section')]
    const cards = [...root.querySelectorAll<HTMLElement>('[data-depth-card]')]
    const links = [...root.querySelectorAll<HTMLAnchorElement>('.chapter-link')]
    const wide = window.matchMedia('(min-width: 900px) and (pointer: fine)')
    let frame = 0

    const update = () => {
      frame = 0
      const viewport = window.innerHeight
      const range = document.documentElement.scrollHeight - viewport
      root.style.setProperty('--journey', `${range > 0 ? window.scrollY / range : 0}`)
      let active = sections[0]?.id
      let closest = Infinity
      sections.forEach((section) => {
        const bounds = section.getBoundingClientRect()
        const distance = Math.abs(bounds.top - viewport * 0.25)
        if (distance < closest) {
          closest = distance
          active = section.id
        }
        // Keep text near the reading position level; tilt sections entering/leaving.
        const offset = Math.max(-1, Math.min(1, (bounds.top - viewport * 0.15) / viewport))
        section.style.setProperty('--section-angle', `${enabled && wide.matches ? offset * -3 : 0}deg`)
        section.style.setProperty('--section-depth', `${enabled && wide.matches ? Math.abs(offset) * -55 : 0}px`)
      })
      links.forEach((link) => {
        if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      })
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const resetCard = (card: HTMLElement) => {
      card.style.setProperty('--tilt-x', '0deg')
      card.style.setProperty('--tilt-y', '0deg')
      card.style.setProperty('--light-x', '50%')
      card.style.setProperty('--light-y', '50%')
    }
    const cleanups = cards.map((card) => {
      const onMove = (event: PointerEvent) => {
        if (!enabled || !wide.matches || event.pointerType === 'touch') return
        const bounds = card.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width
        const y = (event.clientY - bounds.top) / bounds.height
        card.style.setProperty('--tilt-x', `${(0.5 - y) * 6}deg`)
        card.style.setProperty('--tilt-y', `${(x - 0.5) * 8}deg`)
        card.style.setProperty('--light-x', `${x * 100}%`)
        card.style.setProperty('--light-y', `${y * 100}%`)
      }
      const onLeave = () => resetCard(card)
      resetCard(card)
      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)
      return () => {
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerleave', onLeave)
        resetCard(card)
      }
    })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    wide.addEventListener('change', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      wide.removeEventListener('change', schedule)
      cleanups.forEach((cleanup) => cleanup())
      sections.forEach((section) => {
        section.style.removeProperty('--section-angle')
        section.style.removeProperty('--section-depth')
      })
    }
  }, [enabled])

  return rootRef
}
