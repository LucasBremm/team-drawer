import { describe, expect, it } from 'vitest'
import { exportPlayersToJson, parseImportJson } from '../../../src/services/jsonService'

describe('json service', () => {
  it('exports payload with players root key', () => {
    const payload = exportPlayersToJson([{ id: '1', name: 'Ana', position: 'Meio', skillLevel: 7 }])

    expect(payload).toContain('"players"')
    expect(JSON.parse(payload).players).toHaveLength(1)
  })

  it('rejects invalid json string', () => {
    const result = parseImportJson('{invalid')

    expect(result.ok).toBe(false)
    expect(result.error).toContain('JSON invalido')
  })

  it('rejects wrong root shape', () => {
    const result = parseImportJson('{"data": []}')

    expect(result.ok).toBe(false)
    expect(result.error).toContain('players')
  })

  it('accepts valid root shape', () => {
    const result = parseImportJson('{"players": [{"name": "Ana"}]}')

    expect(result.ok).toBe(true)
    expect(result.payload?.players).toHaveLength(1)
  })
})
