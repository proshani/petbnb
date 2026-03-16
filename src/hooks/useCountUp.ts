"use client"

import { useEffect, useState } from "react"

export function useCountUp(target: number, duration = 2000, enabled = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled) return

    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress >= 1) {
        clearInterval(timer)
        setCount(target)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [target, duration, enabled])

  return count
}
