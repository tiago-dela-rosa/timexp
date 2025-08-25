import { describe, it, expect } from 'vitest'
import type { IRegion } from '~/stores/models/region'

describe('Region Models', () => {
  it('should define Region interface correctly', () => {
    const mockRegion: IRegion = {
      id: 'test-region',
      name: 'Test Region',
      description: 'A test region for unit testing',
      isUnlocked: true,
      enemies: [],
      events: [],
      items: []
    }

    expect(mockRegion.id).toBe('test-region')
    expect(mockRegion.name).toBe('Test Region')
    expect(mockRegion.isUnlocked).toBe(true)
    expect(Array.isArray(mockRegion.enemies)).toBe(true)
    expect(Array.isArray(mockRegion.events)).toBe(true)
    expect(Array.isArray(mockRegion.items)).toBe(true)
  })

  it('should support unlock requirements', () => {
    const lockedRegion: IRegion = {
      id: 'locked-region',
      name: 'Locked Region',
      description: 'A locked region',
      isUnlocked: false,
      unlockRequirement: {
        level: 5,
        description: 'Reach level 5 to unlock'
      },
      enemies: [],
      events: [],
      items: []
    }

    expect(lockedRegion.isUnlocked).toBe(false)
    expect(lockedRegion.unlockRequirement?.level).toBe(5)
    expect(lockedRegion.unlockRequirement?.description).toBe('Reach level 5 to unlock')
  })

  it('should support frequency types', () => {
    const frequencies = ['Common', 'Rare', 'Super Rare'] as const
    
    frequencies.forEach(frequency => {
      expect(typeof frequency).toBe('string')
      expect(['Common', 'Rare', 'Super Rare']).toContain(frequency)
    })
  })
})