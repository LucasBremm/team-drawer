import type { Player, PlayerPosition } from '../types/models'
import { PLAYER_POSITIONS } from '../types/models'

export function isPlayerPosition(value: string): value is PlayerPosition {
  return PLAYER_POSITIONS.includes(value as PlayerPosition)
}

export function createPlayerId(): string {
  return crypto.randomUUID()
}

export function clonePlayers(players: Player[]): Player[] {
  return players.map((player) => ({ ...player }))
}
