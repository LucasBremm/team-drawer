import { describe, expect, it } from 'vitest'
import { calculateDrawMetrics, getTeamSkillTotal } from '../../../src/domain/metrics'

const teamA = [
  { id: '1', name: 'Ana', position: 'Meio', skillLevel: 7 },
  { id: '2', name: 'Bia', position: 'Defesa', skillLevel: 5 },
]

const teamB = [
  { id: '3', name: 'Caio', position: 'Atacante', skillLevel: 6 },
]

describe('metrics domain', () => {
  it('sums team skill level', () => {
    expect(getTeamSkillTotal(teamA)).toBe(12)
    expect(getTeamSkillTotal(teamB)).toBe(6)
  })

  it('calculates skill and player count deltas', () => {
    expect(calculateDrawMetrics(teamA, teamB)).toEqual({
      skillDelta: 6,
      countDelta: 1,
    })
  })
})
