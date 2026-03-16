"use client"

import { useEffect, useRef, useState } from "react"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return

    setReady(true)

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let initialized = false
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!initialized) {
        ringX = mouseX
        ringY = mouseY
        initialized = true
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`
        dotRef.current.style.top = `${mouseY}px`
      }
    }

    const tick = () => {
      if (initialized) {
        ringX += (mouseX - ringX) * 0.1
        ringY += (mouseY - ringY) * 0.1
        if (ringRef.current) {
          ringRef.current.style.left = `${ringX}px`
          ringRef.current.style.top = `${ringY}px`
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(0)"
      if (ringRef.current) {
        ringRef.current.style.width = "58px"
        ringRef.current.style.height = "58px"
        ringRef.current.style.borderColor = "rgba(201,168,76,0.65)"
        ringRef.current.style.backgroundColor = "rgba(201,168,76,0.05)"
      }
    }

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(1)"
      if (ringRef.current) {
        ringRef.current.style.width = "40px"
        ringRef.current.style.height = "40px"
        ringRef.current.style.borderColor = "rgba(201,168,76,0.4)"
        ringRef.current.style.backgroundColor = "transparent"
      }
    }

    const attachHoverListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, select").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
        el.addEventListener("mouseenter", onEnter)
        el.addEventListener("mouseleave", onLeave)
      })
    }

    window.addEventListener("mousemove", onMove)
    attachHoverListeners()

    const observer = new MutationObserver(attachHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  if (!ready) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#c9a84c",
          transform: "translate(-50%, -50%) scale(1)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "transform 0.2s ease",
          willChange: "left, top",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.4)",
          backgroundColor: "transparent",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99998,
          transition:
            "width 0.35s ease, height 0.35s ease, border-color 0.35s ease, background-color 0.35s ease",
          willChange: "left, top",
        }}
      />
    </>
  )
}
