import { describe, it, expect, vi } from 'vitest'
import { generateRandomName } from '~/utils/server/nameGenerator'

describe('/api/generateName logic', () => {
  it('should generate a name when valid character class is provided', () => {
    const response = generateRandomName('warrior')
    
    expect(response).toBeDefined()
    expect(typeof response).toBe('string')
    expect(response.trim().length).toBeGreaterThan(0)
    expect(response.split(' ')).toHaveLength(2)
  })

  it('should generate a name when empty character class is provided', () => {
    const response = generateRandomName('')
    
    expect(response).toBeDefined()
    expect(typeof response).toBe('string')
    expect(response.trim().length).toBeGreaterThan(0)
  })
})