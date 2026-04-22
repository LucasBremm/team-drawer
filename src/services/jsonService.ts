import type { Player } from '../types/models'

export interface ParsedImportPayload {
  players: unknown[]
}

export interface JsonImportValidation {
  ok: boolean
  payload?: ParsedImportPayload
  error?: string
}

export function exportPlayersToJson(players: Player[]): string {
  return JSON.stringify({ players }, null, 2)
}

export function parseImportJson(rawText: string): JsonImportValidation {
  let parsed: unknown
  try {
    parsed = JSON.parse(rawText)
  } catch {
    return {
      ok: false,
      error: 'JSON invalido.',
    }
  }

  if (!parsed || typeof parsed !== 'object') {
    return {
      ok: false,
      error: 'Formato invalido: objeto raiz esperado.',
    }
  }

  const payload = parsed as { players?: unknown }
  if (!Array.isArray(payload.players)) {
    return {
      ok: false,
      error: 'Formato invalido: campo players (array) e obrigatorio.',
    }
  }

  return {
    ok: true,
    payload: {
      players: payload.players,
    },
  }
}
