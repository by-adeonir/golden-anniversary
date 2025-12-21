/** biome-ignore-all lint/suspicious/noExplicitAny: acceptable for test mocking */

import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('date-fns', () => ({
  differenceInDays: vi.fn(),
  differenceInMonths: vi.fn(),
  differenceInYears: vi.fn(),
}))

import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns'
import { calculateMarriedTime, useMarriedTime } from './use-married-time'

describe('Married Time Hook Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('calculateMarriedTime() logic', () => {
    const mockMarriageDate = new Date('1975-11-08')

    it('should calculate correct years, months, and days', () => {
      vi.mocked(differenceInYears).mockReturnValue(50)
      vi.mocked(differenceInMonths).mockReturnValue(1)
      vi.mocked(differenceInDays).mockReturnValue(13)

      const result = calculateMarriedTime(mockMarriageDate)

      expect(result).toEqual({
        years: 50,
        months: 1,
        days: 13,
      })
      expect(differenceInYears).toHaveBeenCalledWith(expect.any(Date), mockMarriageDate)
    })

    it('should handle exact anniversary date', () => {
      vi.mocked(differenceInYears).mockReturnValue(50)
      vi.mocked(differenceInMonths).mockReturnValue(0)
      vi.mocked(differenceInDays).mockReturnValue(0)

      const result = calculateMarriedTime(mockMarriageDate)

      expect(result).toEqual({
        years: 50,
        months: 0,
        days: 0,
      })
    })

    it('should handle zero values correctly', () => {
      vi.mocked(differenceInYears).mockReturnValue(0)
      vi.mocked(differenceInMonths).mockReturnValue(0)
      vi.mocked(differenceInDays).mockReturnValue(0)

      const result = calculateMarriedTime(mockMarriageDate)

      expect(result).toEqual({
        years: 0,
        months: 0,
        days: 0,
      })
    })

    it('should handle partial year correctly', () => {
      vi.mocked(differenceInYears).mockReturnValue(49)
      vi.mocked(differenceInMonths).mockReturnValue(11)
      vi.mocked(differenceInDays).mockReturnValue(29)

      const result = calculateMarriedTime(mockMarriageDate)

      expect(result).toEqual({
        years: 49,
        months: 11,
        days: 29,
      })
    })
  })

  describe('useMarriedTime() hook', () => {
    const mockMarriageDate = new Date('1975-11-08')

    it('should initialize with default values', () => {
      vi.mocked(differenceInYears).mockReturnValue(0)
      vi.mocked(differenceInMonths).mockReturnValue(0)
      vi.mocked(differenceInDays).mockReturnValue(0)

      const { result } = renderHook(() => useMarriedTime(mockMarriageDate))

      expect(result.current).toEqual({
        years: 0,
        months: 0,
        days: 0,
      })
    })

    it('should update time after client-side hydration', async () => {
      vi.mocked(differenceInYears).mockReturnValue(50)
      vi.mocked(differenceInMonths).mockReturnValue(1)
      vi.mocked(differenceInDays).mockReturnValue(13)

      const { result } = renderHook(() => useMarriedTime(mockMarriageDate))

      await act(async () => {})

      expect(result.current).toEqual({
        years: 50,
        months: 1,
        days: 13,
      })
    })

    it('should update time every minute', async () => {
      let daysValue = 13
      vi.mocked(differenceInYears).mockReturnValue(50)
      vi.mocked(differenceInMonths).mockReturnValue(1)
      vi.mocked(differenceInDays).mockImplementation(() => daysValue)

      const { result } = renderHook(() => useMarriedTime(mockMarriageDate))

      await act(async () => {})

      expect(result.current.days).toBe(13)

      daysValue = 14

      await act(() => {
        vi.advanceTimersByTime(60000)
      })

      expect(result.current.days).toBe(14)
    })

    it('should handle marriage date change', async () => {
      const initialDate = new Date('1975-11-08')
      const newDate = new Date('1980-11-08')

      vi.mocked(differenceInYears).mockReturnValue(50)
      vi.mocked(differenceInMonths).mockReturnValue(0)
      vi.mocked(differenceInDays).mockReturnValue(0)

      const { rerender } = renderHook(({ marriageDate }) => useMarriedTime(marriageDate), {
        initialProps: { marriageDate: initialDate },
      })

      vi.mocked(differenceInYears).mockReturnValue(45)

      rerender({ marriageDate: newDate })

      await act(async () => {})

      expect(differenceInYears).toHaveBeenCalled()
    })

    it('should cleanup timer on unmount', () => {
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

      vi.mocked(differenceInYears).mockReturnValue(50)
      vi.mocked(differenceInMonths).mockReturnValue(1)
      vi.mocked(differenceInDays).mockReturnValue(13)

      const { unmount } = renderHook(() => useMarriedTime(mockMarriageDate))

      unmount()

      expect(clearIntervalSpy).toHaveBeenCalled()
      clearIntervalSpy.mockRestore()
    })

    it('should create timer with 60 second interval after client hydration', () => {
      vi.mocked(differenceInYears).mockReturnValue(50)
      vi.mocked(differenceInMonths).mockReturnValue(1)
      vi.mocked(differenceInDays).mockReturnValue(13)

      const setIntervalSpy = vi.spyOn(global, 'setInterval')

      renderHook(() => useMarriedTime(mockMarriageDate))

      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 60000)

      setIntervalSpy.mockRestore()
    })
  })
})
