import type { Player, PlayerFormInput } from '../types/models'
import type { DomainResult, PlayerPosition } from '../types/models'
import { isPlayerPosition } from './player'

export interface ValidatedPlayerInput {
  name: string
  nameKey: string
  position: PlayerPosition
  skillLevel: number
}

export function normalizePlayerName(name: string): string {
  return name.trim().replace(/\s+/g, ' ')
}

export function toNameKey(name: string): string {
  return normalizePlayerName(name).toLowerCase()
}

export function hasNameConflict(
  name: string,
  players: Player[],
  excludePlayerId?: string,
): boolean {
  const candidate = toNameKey(name)
  return players.some((player) => toNameKey(player.name) === candidate && player.id !== excludePlayerId)
}

export function validatePlayerInput(input: PlayerFormInput): DomainResult<ValidatedPlayerInput> {
  const name = normalizePlayerName(input.name)
  if (!name) {
    return { ok: false, error: 'Nome e obrigatorio.' }
  }

  if (!isPlayerPosition(input.position)) {
    return { ok: false, error: 'Posicao invalida.' }
  }

  const skill = typeof input.skillLevel === 'string' ? Number(input.skillLevel) : input.skillLevel
  if (!Number.isInteger(skill) || skill < 1 || skill > 10) {
    return { ok: false, error: 'Habilidade deve ser um inteiro entre 1 e 10.' }
  }

  return {
    ok: true,
    value: {
      name,
      nameKey: toNameKey(name),
      position: input.position,
      skillLevel: skill,
    },
  }
}
