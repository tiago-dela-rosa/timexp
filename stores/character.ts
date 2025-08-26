import type { ICharacter, ICharacterClass } from './models/character'

export const useCharacterStore = defineStore('character', () => {
  const character = ref<ICharacter | null>(null)
  const levelUpData = ref<{
    show: boolean
    characterName: string
    newLevel: number
    statBonuses: Array<{ stat: string; amount: number; icon: string }>
  }>({
    show: false,
    characterName: '',
    newLevel: 0,
    statBonuses: []
  })
  
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
      gold: 0,
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

  function calculateXpRequired(level: number): number {
    return Math.floor(100 * Math.pow(1.5, level - 1))
  }

  function gainXp(amount: number): boolean {
    if (!character.value) return false
    
    character.value.xp += amount
    let leveledUp = false
    
    while (character.value.xp >= calculateXpRequired(character.value.level + 1)) {
      character.value.xp -= calculateXpRequired(character.value.level + 1)
      character.value.level += 1
      levelUp()
      leveledUp = true
    }
    
    saveCharacter()
    return leveledUp
  }

  function levelUp() {
    if (!character.value) return

    const classBonus = getClassLevelBonus(character.value.class)
    character.value.maxHp += classBonus.hp
    character.value.hp += classBonus.hp
    character.value.maxMp += classBonus.mp
    character.value.mp += classBonus.mp
    character.value.attack += classBonus.attack

    showLevelUpAnimation(character.value.name, character.value.level, classBonus)
  }

  function getClassLevelBonus(characterClass: ICharacter['class']) {
    switch (characterClass) {
      case 'warrior':
        return { hp: 15, mp: 3, attack: 2 }
      case 'mage':
        return { hp: 8, mp: 12, attack: 1 }
      case 'archer':
        return { hp: 10, mp: 5, attack: 3 }
      default:
        return { hp: 10, mp: 5, attack: 2 }
    }
  }

  function gainGold(amount: number) {
    if (!character.value) return
    character.value.gold += amount
    saveCharacter()
  }

  function showLevelUpAnimation(name: string, level: number, bonuses: { hp: number; mp: number; attack: number }) {
    const statBonuses = []
    
    if (bonuses.hp > 0) {
      statBonuses.push({ stat: 'hp', amount: bonuses.hp, icon: '♥' })
    }
    if (bonuses.mp > 0) {
      statBonuses.push({ stat: 'mp', amount: bonuses.mp, icon: '✦' })
    }
    if (bonuses.attack > 0) {
      statBonuses.push({ stat: 'attack', amount: bonuses.attack, icon: '⚔' })
    }

    levelUpData.value = {
      show: true,
      characterName: name,
      newLevel: level,
      statBonuses
    }
  }

  function closeLevelUpAnimation() {
    levelUpData.value.show = false
  }

  return {
    character: readonly(character),
    characterClasses,
    hasCharacter,
    createCharacter,
    loadCharacter,
    saveCharacter,
    clearCharacter,
    calculateXpRequired,
    gainXp,
    gainGold,
    levelUpData: readonly(levelUpData),
    closeLevelUpAnimation
  }
})