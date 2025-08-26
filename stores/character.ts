import type { ICharacter, ICharacterClass } from './models/character'

export const useCharacterStore = defineStore('character', () => {
  const character = ref<ICharacter | null>(null)
  
  const characterClasses = ref<ICharacterClass[]>([
    {
      name: 'warrior',
      description: 'High HP, Medium ATK, Low MP',
      stats: {
        hp: 120,
        maxHp: 120,
        mp: 30,
        maxMp: 30,
        attack: 15,
        defense: 8
      }
    },
    {
      name: 'mage',
      description: 'Low HP, High MP, Medium Magic ATK',
      stats: {
        hp: 80,
        maxHp: 80,
        mp: 100,
        maxMp: 100,
        attack: 8,
        defense: 4
      }
    },
    {
      name: 'archer',
      description: 'Medium HP, High Physical ATK, Low MP',
      stats: {
        hp: 100,
        maxHp: 100,
        mp: 50,
        maxMp: 50,
        attack: 18,
        defense: 6
      }
    }
  ])

  const hasCharacter = computed(() => character.value !== null)

  function createCharacter(name: string, characterClass: string) {
    const classStats = characterClasses.value.find(c => c.name === characterClass)?.stats
    if (!classStats) return false

    character.value = {
      name: name.trim(),
      class: characterClass as ICharacter['class'],
      level: 1,
      xp: 0,
      hp: classStats.hp,
      maxHp: classStats.maxHp,
      mp: classStats.mp,
      maxMp: classStats.maxMp,
      attack: classStats.attack,
      defense: classStats.defense,
      lives: 3,
      createdAt: Date.now()
    }

    saveCharacter()
    return true
  }

  function loadCharacter() {
    try {
      const saved = localStorage.getItem('timexp-character')
      if (saved) {
        character.value = JSON.parse(saved)
      }
    } catch (error) {
      character.value = null
    }
  }

  function saveCharacter() {
    if (character.value) {
      localStorage.setItem('timexp-character', JSON.stringify(character.value))
    }
  }

  function clearCharacter() {
    character.value = null
    localStorage.removeItem('timexp-character')
  }

  return {
    character: readonly(character),
    characterClasses,
    hasCharacter,
    createCharacter,
    loadCharacter,
    saveCharacter,
    clearCharacter
  }
})