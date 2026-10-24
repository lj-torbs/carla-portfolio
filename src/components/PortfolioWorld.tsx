import { useEffect, useRef } from 'react'
import {
  BoxGeometry, Color, EdgesGeometry, Fog, GridHelper, Group,
  LineBasicMaterial, LineSegments, PerspectiveCamera, Scene, WebGLRenderer,
} from 'three'

/** Architectural perspective that follows the visitor through the portfolio. */
export default function PortfolioWorld({ enabled }: { enabled: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      // The CSS perspective grid remains visible without WebGL.
      return
    }
    const scene = new Scene()
    scene.fog = new Fog('#edf6ff', 10, 42)
    const camera = new PerspectiveCamera(55, 1, 0.1, 80)
    camera.position.set(0, 0.5, 6)
    const world = new Group()
    const box = new BoxGeometry(17, 11, 0.12)
    const edges = new EdgesGeometry(box)
    const material = new LineBasicMaterial({ color: '#709ac7', transparent: true, opacity: 0.2 })
    for (let index = 0; index < 14; index++) {
      const portal = new LineSegments(edges, material)
      portal.position.z = 2 - index * 6
      world.add(portal)
    }
    const floor = new GridHelper(160, 80, new Color('#86add2'), new Color('#9dbbda'))
    floor.position.set(0, -5.5, -30)
    floor.material.transparent = true
    floor.material.opacity = 0.2
    scene.add(world, floor)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    host.hidden = false
    host.appendChild(renderer.domElement)
    let progress = 0
    let pointerX = 0
    let pointerY = 0
    let contextAvailable = true
    const readScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight
      progress = range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0
    }
    const pointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2
    }
    const render = () => {
      if (contextAvailable) renderer.render(scene, camera)
    }
    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      readScroll()
      render()
    }
    let previous = 0
    const updateLoop = () => {
      previous = 0
      renderer.setAnimationLoop(enabled && !document.hidden && contextAvailable ? (time) => {
        const delta = previous ? Math.min((time - previous) / 1000, 0.1) : 0.016
        previous = time
        const smoothing = 1 - Math.exp(-delta * 7)
        camera.position.z += ((6 - progress * 44) - camera.position.z) * smoothing
        camera.position.x += (pointerX * 0.55 - camera.position.x) * smoothing
        camera.position.y += (0.5 - pointerY * 0.25 - camera.position.y) * smoothing
        camera.rotation.y = -camera.position.x * 0.025
        render()
      } : null)
      render()
    }
    const lost = (event: Event) => {
      event.preventDefault()
      contextAvailable = false
      host.hidden = true
      updateLoop()
    }
    const restored = () => {
      contextAvailable = true
      host.hidden = false
      resize()
      updateLoop()
    }
    readScroll()
    camera.position.z = enabled ? 6 - progress * 44 : 6
    resize()
    updateLoop()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('pointermove', pointer, { passive: true })
    document.addEventListener('visibilitychange', updateLoop)
    renderer.domElement.addEventListener('webglcontextlost', lost)
    renderer.domElement.addEventListener('webglcontextrestored', restored)
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('pointermove', pointer)
      document.removeEventListener('visibilitychange', updateLoop)
      renderer.domElement.removeEventListener('webglcontextlost', lost)
      renderer.domElement.removeEventListener('webglcontextrestored', restored)
      renderer.setAnimationLoop(null)
      edges.dispose()
      box.dispose()
      material.dispose()
      floor.geometry.dispose()
      floor.material.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    }
  }, [enabled])

  return <div ref={hostRef} className="world-canvas" aria-hidden="true" />
}
