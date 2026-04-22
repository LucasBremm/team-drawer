import type { DrawResult } from '../types/models'

function formatTeam(title: string, names: string[]): string {
  const roster = names.length ? names.map((name, index) => `${index + 1}. ${name}`).join('\n') : 'Sem jogadores'
  return `${title}\n${roster}`
}

export function formatDrawForShare(result: DrawResult): string {
  const teamA = result.teamA.map((player) => player.name)
  const teamB = result.teamB.map((player) => player.name)

  return [formatTeam('Time A', teamA), '', formatTeam('Time B', teamB)].join('\n')
}
