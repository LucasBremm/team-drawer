import type { ImportReport, Player } from '../types/models'
import { createPlayerId, isPlayerPosition } from './player'
import { toNameKey } from './validation'

interface ImportPlayerInput {
  name: unknown
  position: unknown
  skillLevel: unknown
}

function coerceImportPlayer(item: unknown): Player | null {
  if (!item || typeof item !== 'object') {
    return null
  }

  const data = item as ImportPlayerInput
  if (typeof data.name !== 'string' || typeof data.position !== 'string') {
    return null
  }

  const normalizedName = data.name.trim().replace(/\s+/g, ' ')
  if (!normalizedName || !isPlayerPosition(data.position)) {
    return null
  }

  const skill = Number(data.skillLevel)
  if (!Number.isInteger(skill) || skill < 1 || skill > 10) {
    return null
  }

  return {
    id: createPlayerId(),
    name: normalizedName,
    position: data.position,
    skillLevel: skill,
  }
}

export function mergeImportedPlayers(existingPlayers: Player[], importedRows: unknown[]): { players: Player[]; report: ImportReport } {
  const names = new Set(existingPlayers.map((player) => toNameKey(player.name)))
  const conflicts: string[] = []
  const validImports: Player[] = []
  let invalidRows = 0

  for (const row of importedRows) {
    const parsed = coerceImportPlayer(row)
    if (!parsed) {
      invalidRows += 1
      continue
    }

    const key = toNameKey(parsed.name)
    if (names.has(key)) {
      conflicts.push(parsed.name)
      continue
    }

    names.add(key)
    validImports.push(parsed)
  }

  return {
    players: [...existingPlayers, ...validImports],
    report: {
      importedCount: validImports.length,
      skippedCount: conflicts.length + invalidRows,
      conflicts,
      invalidRows,
    },
  }
}
