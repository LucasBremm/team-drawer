import type { DrawMetrics, Player } from '../types/models'

export function getTeamSkillTotal(players: Player[]): number {
  return players.reduce((total, player) => total + player.skillLevel, 0)
}

export function calculateDrawMetrics(teamA: Player[], teamB: Player[]): DrawMetrics {
  const skillDelta = Math.abs(getTeamSkillTotal(teamA) - getTeamSkillTotal(teamB))
  const countDelta = Math.abs(teamA.length - teamB.length)

  return {
    skillDelta,
    countDelta,
  }
}
