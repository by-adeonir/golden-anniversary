'use client'

import { domAnimation, LazyMotion } from 'motion/react'
import type { ReactNode } from 'react'

type MotionProviderProps = {
  children: ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
