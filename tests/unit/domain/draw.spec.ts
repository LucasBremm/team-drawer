import { describe, expect, it } from 'vitest'
import { drawBalancedTeams } from '../../../src/domain/draw'
import { createSeededRandom } from '../../../src/utils/random'
import type { Player } from '../../../src/types/models'

function positionDelta(result: ReturnType<typeof drawBalancedTeams>, position: Player['position']): number {
  const countA = result.teamA.filter((player) => player.position === position).length
  const countB = result.teamB.filter((player) => player.position === position).length
  return Math.abs(countA - countB)
}

function buildPlayers(count: number): Player[] {
  return Array.from({ length: count }).map((_, index) => ({
    id: `id-${index + 1}`,
    name: `Jogador ${index + 1}`,
    position: 'Meio',
    skillLevel: (index % 10) + 1,
  }))
}

describe('draw domain', () => {
  it('fails when selected players are less than 4', () => {
    expect(() => drawBalancedTeams(buildPlayers(3))).toThrowError(/4 jogadores/)
  })

  it('keeps count delta <= 1 and includes every player in exact strategy', () => {
    const players = buildPlayers(10)
    const result = drawBalancedTeams(players, createSeededRandom(42))
    const ids = [...result.teamA, ...result.teamB].map((player) => player.id)

    expect(result.metrics.countDelta).toBeLessThanOrEqual(1)
    expect(ids.sort()).toEqual(players.map((player) => player.id).sort())
  })

  it('uses heuristic strategy for more than 20 players keeping constraints', () => {
    const players = buildPlayers(24)
    const result = drawBalancedTeams(players, createSeededRandom(99))

    expect(Math.abs(result.teamA.length - result.teamB.length)).toBeLessThanOrEqual(1)
    expect(result.metrics.countDelta).toBeLessThanOrEqual(1)
  })

  it('splits exactly two goalkeepers across teams when feasible', () => {
    const players: Player[] = [
      { id: 'gk-1', name: 'Goleiro 1', position: 'Goleiro', skillLevel: 9 },
      { id: 'gk-2', name: 'Goleiro 2', position: 'Goleiro', skillLevel: 3 },
      { id: 'd-1', name: 'Defesa 1', position: 'Defesa', skillLevel: 6 },
      { id: 'd-2', name: 'Defesa 2', position: 'Defesa', skillLevel: 6 },
      { id: 'm-1', name: 'Meio 1', position: 'Meio', skillLevel: 5 },
      { id: 'a-1', name: 'Atacante 1', position: 'Atacante', skillLevel: 5 },
    ]

    const result = drawBalancedTeams(players, createSeededRandom(7))

    expect(positionDelta(result, 'Goleiro')).toBe(0)
    expect(result.metrics.countDelta).toBeLessThanOrEqual(1)
  })

  it('keeps odd position counts with max delta 1 when viable', () => {
    const players: Player[] = [
      { id: 'd-1', name: 'Defesa 1', position: 'Defesa', skillLevel: 7 },
      { id: 'd-2', name: 'Defesa 2', position: 'Defesa', skillLevel: 5 },
      { id: 'd-3', name: 'Defesa 3', position: 'Defesa', skillLevel: 4 },
      { id: 'm-1', name: 'Meio 1', position: 'Meio', skillLevel: 8 },
      { id: 'm-2', name: 'Meio 2', position: 'Meio', skillLevel: 6 },
      { id: 'a-1', name: 'Atacante 1', position: 'Atacante', skillLevel: 3 },
      { id: 'a-2', name: 'Atacante 2', position: 'Atacante', skillLevel: 2 },
    ]

    const result = drawBalancedTeams(players, createSeededRandom(21))

    expect(positionDelta(result, 'Defesa')).toBeLessThanOrEqual(1)
    expect(positionDelta(result, 'Meio')).toBeLessThanOrEqual(1)
    expect(positionDelta(result, 'Atacante')).toBeLessThanOrEqual(1)
    expect(result.metrics.countDelta).toBeLessThanOrEqual(1)
  })

  it('prioritizes position balance before skill delta in exact mode', () => {
    const players: Player[] = [
      { id: 'd-1', name: 'Defesa 1', position: 'Defesa', skillLevel: 10 },
      { id: 'd-2', name: 'Defesa 2', position: 'Defesa', skillLevel: 9 },
      { id: 'd-3', name: 'Defesa 3', position: 'Defesa', skillLevel: 1 },
      { id: 'a-1', name: 'Atacante 1', position: 'Atacante', skillLevel: 8 },
    ]

    const result = drawBalancedTeams(players, createSeededRandom(123))

    expect(positionDelta(result, 'Defesa')).toBeLessThanOrEqual(1)
    expect(result.metrics.countDelta).toBe(0)
  })

  it('falls back gracefully when perfect position parity is impossible', () => {
    const players: Player[] = [
      { id: 'd-1', name: 'Defesa 1', position: 'Defesa', skillLevel: 10 },
      { id: 'd-2', name: 'Defesa 2', position: 'Defesa', skillLevel: 8 },
      { id: 'd-3', name: 'Defesa 3', position: 'Defesa', skillLevel: 6 },
      { id: 'd-4', name: 'Defesa 4', position: 'Defesa', skillLevel: 4 },
      { id: 'd-5', name: 'Defesa 5', position: 'Defesa', skillLevel: 2 },
      { id: 'm-1', name: 'Meio 1', position: 'Meio', skillLevel: 7 },
      { id: 'a-1', name: 'Atacante 1', position: 'Atacante', skillLevel: 5 },
      { id: 'g-1', name: 'Goleiro 1', position: 'Goleiro', skillLevel: 3 },
      { id: 'g-2', name: 'Goleiro 2', position: 'Goleiro', skillLevel: 1 },
    ]

    const result = drawBalancedTeams(players, createSeededRandom(2026))

    expect(result.teamA.length + result.teamB.length).toBe(players.length)
    expect(result.metrics.countDelta).toBeLessThanOrEqual(1)
    expect(positionDelta(result, 'Defesa')).toBeLessThanOrEqual(1)
  })
})
