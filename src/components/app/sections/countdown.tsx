'use client'

import { AnimatePresence, m as motion } from 'framer-motion'
import { CalendarFold, Heart } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Card } from '~/components/ui/card'
import { Section } from '~/components/ui/section'
import { SectionHeader } from '~/components/ui/section-header'
import { useCountdown } from '~/hooks/use-countdown'
import { useMarriedTime } from '~/hooks/use-married-time'
import { usePostHog } from '~/hooks/use-posthog'
import { useReducedMotion } from '~/hooks/use-reduced-motion'
import { analyticsEvents } from '~/lib/analytics/events'
import { config } from '~/lib/config'

const targetDate = new Date(config.event.targetDate)
const marriageDate = new Date(config.event.marriageDate)

const content = {
  countdown: {
    title: 'Contagem Regressiva',
    subtitle: '50 anos de amor merecem ser festejados com todo carinho!',
    labels: {
      days: 'dias',
      hours: 'horas',
      minutes: 'minutos',
      seconds: 'segundos',
    },
  },
  celebration: {
    title: 'Nosso Tempo Juntos',
    subtitle: 'Uma vida inteira de amor e companheirismo',
    labels: {
      years: 'anos',
      months: 'meses',
      days: 'dias',
    },
  },
}

export function Countdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)
  const marriedTime = useMarriedTime(marriageDate)
  const posthog = usePostHog()
  const hasCaptured = useRef(false)

  useEffect(() => {
    if (!hasCaptured.current && posthog) {
      posthog.capture(analyticsEvents.countdownView, {
        section: 'countdown',
      })
      hasCaptured.current = true
    }
  }, [posthog])

  const currentContent = isExpired ? content.celebration : content.countdown

  return (
    <Section className="bg-gold-50">
      <div className="mx-auto px-4">
        <div className="section-container text-center">
          <SectionHeader
            icon={isExpired ? Heart : CalendarFold}
            subtitle={currentContent.subtitle}
            title={currentContent.title}
          />

          {isExpired ? (
            <output
              aria-label="Tempo de casamento de Iria e Ari"
              aria-live="polite"
              className="relative mx-auto block max-w-4xl"
            >
              <div className="grid grid-cols-3 gap-6 md:gap-8">
                <TimeCard label={content.celebration.labels.years} value={marriedTime.years} />
                <TimeCard label={content.celebration.labels.months} value={marriedTime.months} />
                <TimeCard label={content.celebration.labels.days} value={marriedTime.days} />
              </div>
            </output>
          ) : (
            <output
              aria-label="Contagem regressiva para a celebração dos 50 anos de casamento"
              aria-live="polite"
              className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
              role="timer"
            >
              <TimeCard label={content.countdown.labels.days} value={days} />
              <TimeCard label={content.countdown.labels.hours} value={hours} />
              <TimeCard label={content.countdown.labels.minutes} value={minutes} />
              <TimeCard label={content.countdown.labels.seconds} value={seconds} />
            </output>
          )}
        </div>
      </div>
    </Section>
  )
}

type TimeCardProps = {
  value: number
  label: string
}

function TimeCard({ value, label }: TimeCardProps) {
  const prefersReducedMotion = useReducedMotion()

  const animationConfig = prefersReducedMotion
    ? { duration: config.animation.duration.fast, ease: 'easeOut' as const }
    : { duration: config.animation.duration.fast, ease: config.animation.easing.natural }

  return (
    <Card className="rounded-3xl pt-4 pb-6 sm:pt-6 sm:pb-8">
      <div className="font-heading font-semibold text-6xl text-gold-500 tabular-nums md:text-7xl">
        <AnimatePresence mode="wait">
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: 20 }}
            key={value}
            transition={animationConfig}
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="font-medium text-md text-zinc-400 uppercase tracking-widest">{label}</div>
    </Card>
  )
}
