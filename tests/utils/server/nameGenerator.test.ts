import { describe, it, expect } from 'vitest'
import { generateRandomName } from '~/utils/server/nameGenerator'
import { characterNames } from '~/utils/server/names'

describe('Name Generator Utility', () => {
  it('should generate a warrior name when warrior class is provided', () => {
    const name = generateRandomName('warrior')
    
    expect(name).toBeDefined()
    expect(typeof name).toBe('string')
    expect(name.trim().length).toBeGreaterThan(0)
    
    const [firstName, lastName] = name.split(' ')
    expect(characterNames.warrior.first).toContain(firstName)
    expect(characterNames.warrior.last).toContain(lastName)
  })

  it('should generate a random name from all classes when invalid class is provided', () => {
    const name = generateRandomName('invalid' as any)
    
    expect(name).toBeDefined()
    expect(typeof name).toBe('string')
    
    const [firstName, lastName] = name.split(' ')
    const allFirstNames = [...characterNames.warrior.first, ...characterNames.archer.first, ...characterNames.mage.first]
    const allLastNames = [...characterNames.warrior.last, ...characterNames.archer.last, ...characterNames.mage.last]
    
    expect(allFirstNames).toContain(firstName)
    expect(allLastNames).toContain(lastName)
  })

  it('should always return a name with first and last name separated by space', () => {
    const name = generateRandomName('warrior')
    const parts = name.split(' ')
    expect(parts).toHaveLength(2)
    expect(parts[0].length).toBeGreaterThan(0)
    expect(parts[1].length).toBeGreaterThan(0)
  })
})