import type { Player } from '../types/models'

export const PLAYERS_STORAGE_KEY = 'team-drawer:players:v1'

function canUseStorage(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.localStorage
  } catch {
    return false
  }
}

export function savePlayers(players: Player[]): { ok: boolean; error?: string } {
  if (!canUseStorage()) {
    return { ok: false, error: 'localStorage indisponivel neste ambiente.' }
  }

  try {
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players))
    return { ok: true }
  } catch {
    return { ok: false, error: 'Falha ao salvar jogadores no armazenamento local.' }
  }
}

export function loadPlayers(): Player[] {
  if (!canUseStorage()) {
    return []
  }

  const raw = localStorage.getItem(PLAYERS_STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Player[]) : []
  } catch {
    return []
  }
}
