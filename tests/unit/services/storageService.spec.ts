import { beforeEach, describe, expect, it } from 'vitest'
import { loadPlayers, PLAYERS_STORAGE_KEY, savePlayers } from '../../../src/services/storageService'

const players = [{ id: '1', name: 'Ana', position: 'Meio', skillLevel: 7 }]

describe('storage service', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves players in localStorage', () => {
    const result = savePlayers(players)

    expect(result.ok).toBe(true)
    expect(localStorage.getItem(PLAYERS_STORAGE_KEY)).not.toBeNull()
  })

  it('loads players from localStorage', () => {
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players))

    expect(loadPlayers()).toEqual(players)
  })

  it('returns empty list for invalid json payload', () => {
    localStorage.setItem(PLAYERS_STORAGE_KEY, '{invalid-json')

    expect(loadPlayers()).toEqual([])
  })
})
