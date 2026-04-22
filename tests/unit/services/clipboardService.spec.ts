import { afterEach, describe, expect, it, vi } from 'vitest'
import { copyToClipboard } from '../../../src/services/clipboardService'

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard')

afterEach(() => {
  if (clipboardDescriptor) {
    Object.defineProperty(navigator, 'clipboard', clipboardDescriptor)
  }
})

describe('clipboard service', () => {
  it('copies content when clipboard api is available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })

    const result = await copyToClipboard('Time A\\nAna')

    expect(writeText).toHaveBeenCalledOnce()
    expect(result.ok).toBe(true)
    expect(result.usedFallback).toBe(false)
  })

  it('returns manual fallback when api is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    })

    const text = 'Time A\\nAna'
    const result = await copyToClipboard(text)

    expect(result.ok).toBe(false)
    expect(result.usedFallback).toBe(true)
    expect(result.manualText).toBe(text)
  })

  it('returns manual fallback when writeText fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockRejectedValue(new Error('denied')),
      },
    })

    const result = await copyToClipboard('Time A\\nAna')

    expect(result.ok).toBe(false)
    expect(result.usedFallback).toBe(true)
    expect(result.manualText).toContain('Time A')
  })
})
