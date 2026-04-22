export const PLAYER_POSITIONS = ['Goleiro', 'Defesa', 'Meio', 'Atacante'] as const

export type PlayerPosition = (typeof PLAYER_POSITIONS)[number]

export interface Player {
  id: string
  name: string
  position: PlayerPosition
  skillLevel: number
}

export interface MatchSelection {
  selectedPlayerIds: string[]
}

export interface DrawMetrics {
  skillDelta: number
  countDelta: number
}

export interface DrawResult {
  teamA: Player[]
  teamB: Player[]
  metrics: DrawMetrics
}

export interface ImportReport {
  importedCount: number
  skippedCount: number
  conflicts: string[]
  invalidRows: number
}

export interface PlayerFormInput {
  name: string
  position: string
  skillLevel: number | string
}

export interface DomainResult<T> {
  ok: boolean
  value?: T
  error?: string
}
