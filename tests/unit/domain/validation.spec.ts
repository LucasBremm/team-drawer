import { describe, expect, it } from 'vitest'
import { hasNameConflict, normalizePlayerName, toNameKey, validatePlayerInput } from '../../../src/domain/validation'

describe('validation domain', () => {
  it('normalizes player name trimming duplicated spaces', () => {
    expect(normalizePlayerName('  Ana   Clara  ')).toBe('Ana Clara')
    expect(toNameKey('  ANA  ')).toBe('ana')
  })

  it('validates required name', () => {
    const result = validatePlayerInput({
      name: '  ',
      position: 'Meio',
      skillLevel: 7,
    })

    expect(result.ok).toBe(false)
    expect(result.error).toContain('Nome')
  })

  it('validates player position', () => {
    const result = validatePlayerInput({
      name: 'Lucas',
      position: 'Volante',
      skillLevel: 7,
    })

    expect(result.ok).toBe(false)
    expect(result.error).toContain('Posicao')
  })

  it('validates skill range', () => {
    const result = validatePlayerInput({
      name: 'Lucas',
      position: 'Atacante',
      skillLevel: 11,
    })

    expect(result.ok).toBe(false)
    expect(result.error).toContain('Habilidade')
  })

  it('detects name conflicts with trim and case-insensitive', () => {
    const players = [
      { id: '1', name: ' Ana ', position: 'Meio', skillLevel: 6 },
      { id: '2', name: 'Bruno', position: 'Defesa', skillLevel: 5 },
    ]

    expect(hasNameConflict('ana', players)).toBe(true)
    expect(hasNameConflict('   ANA   ', players)).toBe(true)
    expect(hasNameConflict('ANA', players, '1')).toBe(false)
    expect(hasNameConflict('Carlos', players)).toBe(false)
  })

  it('accepts valid player input', () => {
    const result = validatePlayerInput({
      name: '  Paula ',
      position: 'Goleiro',
      skillLevel: '9',
    })

    expect(result.ok).toBe(true)
    expect(result.value).toEqual({
      name: 'Paula',
      nameKey: 'paula',
      position: 'Goleiro',
      skillLevel: 9,
    })
  })
})
