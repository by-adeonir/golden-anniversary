import { addMonths, addYears, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns'
import { useEffect, useState } from 'react'

export type MarriedTime = {
  years: number
  months: number
  days: number
}

export function useMarriedTime(marriageDate: Date): MarriedTime {
  const [time, setTime] = useState<MarriedTime>({
    years: 0,
    months: 0,
    days: 0,
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setTime(calculateMarriedTime(marriageDate))
  }, [marriageDate])

  useEffect(() => {
    if (!isClient) return

    const timer = setInterval(() => {
      setTime(calculateMarriedTime(marriageDate))
    }, 60_000) // 1 minute

    return () => clearInterval(timer)
  }, [marriageDate, isClient])

  return time
}

export function calculateMarriedTime(marriageDate: Date): MarriedTime {
  const now = new Date()

  const years = differenceInYears(now, marriageDate)
  const dateAfterYears = addYears(marriageDate, years)

  const months = differenceInMonths(now, dateAfterYears)
  const dateAfterMonths = addMonths(dateAfterYears, months)

  const days = differenceInDays(now, dateAfterMonths)

  return {
    years,
    months,
    days,
  }
}
