import { describe, it, expect } from 'vitest'
import type { Character } from '~/stores/models/character'

describe('Character Models', () => {
  it('should define Character interface correctly', () => {
    const mockCharacter: Character = {
      name: 'TestCharacter',
      class: 'warrior',
      level: 1,
      xp: 0,
      hp: 100,
      maxHp: 100,
      mp: 50,
      maxMp: 50,
      attack: 10,
      defense: 5,
      lives: 3,
      createdAt: Date.now()
    }

    expect(mockCharacter.name).toBe('TestCharacter')
    expect(mockCharacter.class).toBe('warrior')
    expect(mockCharacter.level).toBe(1)
    expect(mockCharacter.lives).toBe(3)
  })

  it('should support all character classes', () => {
    const classes: Array<'warrior' | 'mage' | 'archer'> = ['warrior', 'mage', 'archer']
    
    classes.forEach(charClass => {
      const character: Character = {
        name: `Test${charClass}`,
        class: charClass,
        level: 1,
        xp: 0,
        hp: 100,
        maxHp: 100,
        mp: 50,
        maxMp: 50,
        attack: 10,
        defense: 5,
        lives: 3,
        createdAt: Date.now()
      }
      
      expect(character.class).toBe(charClass)
    })
  })
})