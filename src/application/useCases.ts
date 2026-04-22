import type { DomainResult, DrawResult, ImportReport, Player, PlayerFormInput } from '../types/models'
import { drawBalancedTeams } from '../domain/draw'
import { mergeImportedPlayers } from '../domain/import-policy'
import { hasNameConflict, validatePlayerInput } from '../domain/validation'
import { createPlayerId } from '../domain/player'

export function createPlayer(players: Player[], input: PlayerFormInput): DomainResult<Player> {
  const validated = validatePlayerInput(input)
  if (!validated.ok || !validated.value) {
    return { ok: false, error: validated.error }
  }

  if (hasNameConflict(validated.value.name, players)) {
    return { ok: false, error: 'Ja existe jogador com esse nome.' }
  }

  return {
    ok: true,
    value: {
      id: createPlayerId(),
      name: validated.value.name,
      position: validated.value.position,
      skillLevel: validated.value.skillLevel,
    },
  }
}

export function updatePlayer(
  players: Player[],
  playerId: string,
  input: PlayerFormInput,
): DomainResult<Player> {
  const validated = validatePlayerInput(input)
  if (!validated.ok || !validated.value) {
    return { ok: false, error: validated.error }
  }

  if (hasNameConflict(validated.value.name, players, playerId)) {
    return { ok: false, error: 'Nome em conflito com outro jogador cadastrado.' }
  }

  const target = players.find((player) => player.id === playerId)
  if (!target) {
    return { ok: false, error: 'Jogador nao encontrado.' }
  }

  return {
    ok: true,
    value: {
      ...target,
      name: validated.value.name,
      position: validated.value.position,
      skillLevel: validated.value.skillLevel,
    },
  }
}

export function executeDraw(selectedPlayers: Player[]): DomainResult<DrawResult> {
  try {
    const result = drawBalancedTeams(selectedPlayers)
    return { ok: true, value: result }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Falha ao executar sorteio.',
    }
  }
}

export function importPlayers(players: Player[], importedRows: unknown[]): { players: Player[]; report: ImportReport } {
  return mergeImportedPlayers(players, importedRows)
}
