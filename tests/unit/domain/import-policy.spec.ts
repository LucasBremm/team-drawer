import { describe, expect, it } from 'vitest'
import { mergeImportedPlayers } from '../../../src/domain/import-policy'

describe('import policy domain', () => {
  it('imports valid rows and skips conflicts', () => {
    const existing = [{ id: '1', name: 'Ana', position: 'Meio', skillLevel: 7 }]
    const incoming = [
      { name: 'Bruno', position: 'Defesa', skillLevel: 6 },
      { name: ' ana ', position: 'Atacante', skillLevel: 5 },
      { name: 'Carla', position: 'Meio', skillLevel: 11 },
    ]

    const result = mergeImportedPlayers(existing, incoming)

    expect(result.players).toHaveLength(2)
    expect(result.report.importedCount).toBe(1)
    expect(result.report.invalidRows).toBe(1)
    expect(result.report.conflicts).toEqual(['ana'])
  })
})
