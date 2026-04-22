import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useMatchStore } from '../../../src/stores/matchStore'
import { PLAYERS_STORAGE_KEY } from '../../../src/services/storageService'

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard')

describe('match store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  afterEach(() => {
    if (clipboardDescriptor) {
      Object.defineProperty(navigator, 'clipboard', clipboardDescriptor)
    }
  })

  it('hydrates players from localStorage', () => {
    localStorage.setItem(
      PLAYERS_STORAGE_KEY,
      JSON.stringify([{ id: '1', name: 'Ana', position: 'Meio', skillLevel: 7 }]),
    )

    const store = useMatchStore()
    store.hydratePlayers()

    expect(store.players).toHaveLength(1)
    expect(store.players[0]?.name).toBe('Ana')
  })

  it('blocks duplicate player names in manual registration', () => {
    const store = useMatchStore()

    expect(
      store.addPlayer({
        name: 'Ana',
        position: 'Meio',
        skillLevel: 7,
      }),
    ).toBe(true)

    expect(
      store.addPlayer({
        name: '  ANA  ',
        position: 'Atacante',
        skillLevel: 6,
      }),
    ).toBe(false)
  })

  it('blocks draw with less than four selected players', () => {
    const store = useMatchStore()

    store.players = [
      { id: '1', name: 'A', position: 'Meio', skillLevel: 7 },
      { id: '2', name: 'B', position: 'Defesa', skillLevel: 6 },
      { id: '3', name: 'C', position: 'Atacante', skillLevel: 5 },
    ]
    store.selectedPlayerIds = ['1', '2', '3']

    expect(store.runDraw()).toBe(false)
    expect(store.status?.text).toContain('4 jogadores')
  })

  it('updates player data and blocks name collision during editing', () => {
    const store = useMatchStore()
    store.players = [
      { id: '1', name: 'Ana', position: 'Meio', skillLevel: 7 },
      { id: '2', name: 'Bruno', position: 'Defesa', skillLevel: 6 },
    ]

    expect(
      store.updatePlayer('1', {
        name: 'Ana Paula',
        position: 'Atacante',
        skillLevel: 8,
      }),
    ).toBe(true)

    expect(store.players[0]?.name).toBe('Ana Paula')

    expect(
      store.updatePlayer('1', {
        name: 'bruno',
        position: 'Atacante',
        skillLevel: 8,
      }),
    ).toBe(false)
  })

  it('removes player and clears draw result', () => {
    const store = useMatchStore()
    store.players = [
      { id: '1', name: 'A', position: 'Meio', skillLevel: 7 },
      { id: '2', name: 'B', position: 'Defesa', skillLevel: 6 },
      { id: '3', name: 'C', position: 'Atacante', skillLevel: 5 },
      { id: '4', name: 'D', position: 'Goleiro', skillLevel: 4 },
    ]
    store.selectedPlayerIds = ['1', '2', '3', '4']
    store.runDraw()

    store.removePlayer('2')

    expect(store.players.map((player) => player.id)).not.toContain('2')
    expect(store.selectedPlayerIds).not.toContain('2')
    expect(store.drawResult).toBeNull()
  })

  it('toggles, selects all and clears participants', () => {
    const store = useMatchStore()
    store.players = [
      { id: '1', name: 'A', position: 'Meio', skillLevel: 7 },
      { id: '2', name: 'B', position: 'Defesa', skillLevel: 6 },
      { id: '3', name: 'C', position: 'Atacante', skillLevel: 5 },
      { id: '4', name: 'D', position: 'Goleiro', skillLevel: 4 },
    ]

    store.toggleParticipant('1')
    store.toggleParticipant('2')
    expect(store.selectedPlayerIds).toEqual(['1', '2'])
    expect(store.canDraw).toBe(false)

    store.selectAllParticipants()
    expect(store.selectedPlayerIds).toHaveLength(4)
    expect(store.canDraw).toBe(true)

    store.clearParticipants()
    expect(store.selectedPlayerIds).toEqual([])
  })

  it('keeps selection while rerolling', () => {
    const store = useMatchStore()

    store.players = [
      { id: '1', name: 'A', position: 'Meio', skillLevel: 7 },
      { id: '2', name: 'B', position: 'Defesa', skillLevel: 6 },
      { id: '3', name: 'C', position: 'Atacante', skillLevel: 5 },
      { id: '4', name: 'D', position: 'Goleiro', skillLevel: 4 },
    ]
    store.selectedPlayerIds = ['1', '2', '3', '4']

    expect(store.runDraw()).toBe(true)
    const selectedBefore = [...store.selectedPlayerIds]

    expect(store.reroll()).toBe(true)
    expect(store.selectedPlayerIds).toEqual(selectedBefore)
  })

  it('imports valid players and reports conflicts', () => {
    const store = useMatchStore()
    store.players = [{ id: '1', name: 'Ana', position: 'Meio', skillLevel: 7 }]

    const raw = JSON.stringify({
      players: [
        { name: 'Bruno', position: 'Defesa', skillLevel: 6 },
        { name: 'ana', position: 'Atacante', skillLevel: 5 },
      ],
    })

    expect(store.importPlayersFromJson(raw)).toBe(true)
    expect(store.players).toHaveLength(2)
    expect(store.importReport?.conflicts).toEqual(['ana'])
  })

  it('rejects import with invalid root payload', () => {
    const store = useMatchStore()

    expect(store.importPlayersFromJson('{"data": []}')).toBe(false)
    expect(store.status?.tone).toBe('error')
  })

  it('exports players as json root players', () => {
    const store = useMatchStore()
    store.players = [{ id: '1', name: 'Ana', position: 'Meio', skillLevel: 7 }]

    const payload = JSON.parse(store.exportPlayers()) as { players: unknown[] }

    expect(payload.players).toHaveLength(1)
  })

  it('returns error when trying to copy without draw result', async () => {
    const store = useMatchStore()

    const copied = await store.copyDrawResult()

    expect(copied).toBe(false)
    expect(store.status?.tone).toBe('error')
  })

  it('copies result when clipboard succeeds', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })

    const store = useMatchStore()
    store.players = [
      { id: '1', name: 'A', position: 'Meio', skillLevel: 7 },
      { id: '2', name: 'B', position: 'Defesa', skillLevel: 6 },
      { id: '3', name: 'C', position: 'Atacante', skillLevel: 5 },
      { id: '4', name: 'D', position: 'Goleiro', skillLevel: 4 },
    ]
    store.selectedPlayerIds = ['1', '2', '3', '4']
    store.runDraw()

    const copied = await store.copyDrawResult()

    expect(copied).toBe(true)
    expect(writeText).toHaveBeenCalledOnce()
  })

  it('creates manual copy fallback when clipboard fails', async () => {
    const store = useMatchStore()
    store.players = [
      { id: '1', name: 'A', position: 'Meio', skillLevel: 7 },
      { id: '2', name: 'B', position: 'Defesa', skillLevel: 6 },
      { id: '3', name: 'C', position: 'Atacante', skillLevel: 5 },
      { id: '4', name: 'D', position: 'Goleiro', skillLevel: 4 },
    ]
    store.selectedPlayerIds = ['1', '2', '3', '4']
    store.runDraw()

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockRejectedValue(new Error('not-allowed')),
      },
    })

    await store.copyDrawResult()

    expect(store.manualCopyText).toContain('Time A')
  })
})
