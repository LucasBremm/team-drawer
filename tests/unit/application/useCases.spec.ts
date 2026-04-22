import { describe, expect, it } from 'vitest'
import { createPlayer, executeDraw, importPlayers, updatePlayer } from '../../../src/application/useCases'

describe('application use cases', () => {
  it('creates player when input is valid', () => {
    const result = createPlayer([], {
      name: ' Ana ',
      position: 'Meio',
      skillLevel: 7,
    })

    expect(result.ok).toBe(true)
    expect(result.value?.name).toBe('Ana')
  })

  it('blocks create player when duplicated name exists', () => {
    const players = [{ id: '1', name: 'Ana', position: 'Meio', skillLevel: 7 }]

    const result = createPlayer(players, {
      name: ' ana ',
      position: 'Atacante',
      skillLevel: 6,
    })

    expect(result.ok).toBe(false)
    expect(result.error).toContain('Ja existe jogador')
  })

  it('updates player with valid edition and blocks collision', () => {
    const players = [
      { id: '1', name: 'Ana', position: 'Meio', skillLevel: 7 },
      { id: '2', name: 'Bruno', position: 'Defesa', skillLevel: 6 },
    ]

    const okUpdate = updatePlayer(players, '1', {
      name: 'Ana Paula',
      position: 'Atacante',
      skillLevel: 8,
    })

    expect(okUpdate.ok).toBe(true)
    expect(okUpdate.value?.name).toBe('Ana Paula')

    const blockedUpdate = updatePlayer(players, '1', {
      name: 'bruno',
      position: 'Atacante',
      skillLevel: 8,
    })

    expect(blockedUpdate.ok).toBe(false)
    expect(blockedUpdate.error).toContain('conflito')
  })

  it('executes draw and returns domain failure messages', () => {
    const drawFail = executeDraw([
      { id: '1', name: 'A', position: 'Meio', skillLevel: 7 },
      { id: '2', name: 'B', position: 'Defesa', skillLevel: 6 },
      { id: '3', name: 'C', position: 'Atacante', skillLevel: 5 },
    ])

    expect(drawFail.ok).toBe(false)

    const drawSuccess = executeDraw([
      { id: '1', name: 'A', position: 'Meio', skillLevel: 7 },
      { id: '2', name: 'B', position: 'Defesa', skillLevel: 6 },
      { id: '3', name: 'C', position: 'Atacante', skillLevel: 5 },
      { id: '4', name: 'D', position: 'Goleiro', skillLevel: 4 },
    ])

    expect(drawSuccess.ok).toBe(true)
    expect(drawSuccess.value?.teamA.length).toBeGreaterThan(0)
  })

  it('imports players using conflict policy report', () => {
    const existing = [{ id: '1', name: 'Ana', position: 'Meio', skillLevel: 7 }]

    const result = importPlayers(existing, [
      { name: 'Bruno', position: 'Defesa', skillLevel: 6 },
      { name: 'ana', position: 'Atacante', skillLevel: 5 },
      { name: 'Cris', position: 'Meio', skillLevel: 12 },
    ])

    expect(result.players).toHaveLength(2)
    expect(result.report.importedCount).toBe(1)
    expect(result.report.skippedCount).toBe(2)
  })
})
