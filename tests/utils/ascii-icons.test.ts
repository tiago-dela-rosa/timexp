import { describe, it, expect } from 'vitest'
import { ASCII_ICONS } from '~/utils/ascii-icons'

describe('ASCII Icons Utility', () => {
  it('should have ACTIONS icons', () => {
    expect(ASCII_ICONS.ACTIONS).toBeDefined()
    expect(typeof ASCII_ICONS.ACTIONS).toBe('object')
  })

  it('should have required action icons', () => {
    const requiredActions = ['explore', 'rest', 'train', 'inventory']
    
    requiredActions.forEach(action => {
      expect(ASCII_ICONS.ACTIONS).toHaveProperty(action)
      expect(typeof ASCII_ICONS.ACTIONS[action as keyof typeof ASCII_ICONS.ACTIONS]).toBe('string')
      expect(ASCII_ICONS.ACTIONS[action as keyof typeof ASCII_ICONS.ACTIONS].length).toBeGreaterThan(0)
    })
  })

  it('should have CLASSES icons if defined', () => {
    if (ASCII_ICONS.CLASSES) {
      expect(typeof ASCII_ICONS.CLASSES).toBe('object')
      
      const expectedClasses = ['warrior', 'mage', 'archer']
      expectedClasses.forEach(cls => {
        if (ASCII_ICONS.CLASSES![cls as keyof typeof ASCII_ICONS.CLASSES]) {
          expect(typeof ASCII_ICONS.CLASSES![cls as keyof typeof ASCII_ICONS.CLASSES]).toBe('string')
        }
      })
    }
  })

  it('should return string values for all icons', () => {
    Object.values(ASCII_ICONS.ACTIONS).forEach(icon => {
      expect(typeof icon).toBe('string')
    })
  })
})