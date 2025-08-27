import type { ICharacter, ICharacterClass } from './models/character'
import type { IEnemy } from './models/region'
import { simulateBattle, type IBattleResult } from '~/utils/battle'

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

  const battleState = ref<{
    isInBattle: boolean
    enemy: IEnemy | null
    battleResult: IBattleResult | null
    showResult: boolean
  }>({
    isInBattle: false,
    enemy: null,
    battleResult: null,
    showResult: false
  })

  const gameOverState = ref<{
    show: boolean
    characterName: string
    level: number
    totalXp: number
    gold: number
    survivalTime: string
  }>({
    show: false,
    characterName: '',
    level: 1,
    totalXp: 0,
    gold: 0,
    survivalTime: '0 minutes'
  })
  
  const characterClasses = ref<ICharacterClass[]>([
    {
      name: 'warrior',
      description: 'High HP, Consistent ATK, Low MP',
      stats: {
        hp: 120,
        maxHp: 120,
        mp: 30,
        maxMp: 30,
        minAttack: 13,
        maxAttack: 17,
        defense: 8
      }
    },
    {
      name: 'mage',
      description: 'Low HP, High MP, Variable Magic ATK',
      stats: {
        hp: 80,
        maxHp: 80,
        mp: 100,
        maxMp: 100,
        minAttack: 6,
        maxAttack: 12,
        defense: 4
      }
    },
    {
      name: 'archer',
      description: 'Medium HP, High Variable ATK, Low MP',
      stats: {
        hp: 100,
        maxHp: 100,
        mp: 50,
        maxMp: 50,
        minAttack: 12,
        maxAttack: 24,
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
      minAttack: classStats.minAttack,
      maxAttack: classStats.maxAttack,
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
    character.value.minAttack += classBonus.minAttack
    character.value.maxAttack += classBonus.maxAttack

    showLevelUpAnimation(character.value.name, character.value.level, classBonus)
  }

  function getClassLevelBonus(characterClass: ICharacter['class']) {
    switch (characterClass) {
      case 'warrior':
        return { hp: 15, mp: 3, minAttack: 1, maxAttack: 1 }
      case 'mage':
        return { hp: 8, mp: 12, minAttack: 0, maxAttack: 2 }
      case 'archer':
        return { hp: 10, mp: 5, minAttack: 1, maxAttack: 2 }
      default:
        return { hp: 10, mp: 5, minAttack: 1, maxAttack: 1 }
    }
  }

  function gainGold(amount: number) {
    if (!character.value) return
    character.value.gold += amount
    saveCharacter()
  }

  function showLevelUpAnimation(name: string, level: number, bonuses: { hp: number; mp: number; minAttack: number; maxAttack: number }) {
    const statBonuses = []
    
    if (bonuses.hp > 0) {
      statBonuses.push({ stat: 'hp', amount: bonuses.hp, icon: '♥' })
    }
    if (bonuses.mp > 0) {
      statBonuses.push({ stat: 'mp', amount: bonuses.mp, icon: '✦' })
    }
    if (bonuses.minAttack > 0 || bonuses.maxAttack > 0) {
      const attackBonus = bonuses.minAttack + bonuses.maxAttack
      if (attackBonus > 0) {
        statBonuses.push({ stat: 'attack', amount: attackBonus, icon: '⚔' })
      }
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

  function startBattle(enemy: IEnemy): boolean {
    if (!character.value || battleState.value.isInBattle) return false
    
    battleState.value.isInBattle = true
    battleState.value.enemy = enemy
    battleState.value.battleResult = null
    battleState.value.showResult = false
    
    return true
  }

  function executeBattle(): IBattleResult | null {
    if (!character.value || !battleState.value.enemy) return null

    const result = simulateBattle(
      character.value.minAttack,
      character.value.maxAttack,
      character.value.defense,
      character.value.hp,
      battleState.value.enemy.minAttack,
      battleState.value.enemy.maxAttack,
      battleState.value.enemy.defense,
      battleState.value.enemy.hp,
      battleState.value.enemy.name
    )

    battleState.value.battleResult = result
    
    character.value.hp = result.heroFinalHp
    
    if (!result.isVictory) {
      character.value.lives = Math.max(0, character.value.lives - 1)
      
      if (character.value.lives > 0 && character.value.hp <= 0) {
        character.value.hp = character.value.maxHp
      } else if (character.value.lives <= 0) {
        showGameOver()
      }
    }
    
    saveCharacter()
    return result
  }

  function showBattleResult() {
    battleState.value.showResult = true
  }

  function closeBattle() {
    battleState.value.isInBattle = false
    battleState.value.enemy = null
    battleState.value.battleResult = null
    battleState.value.showResult = false
  }

  function takeDamage(amount: number): boolean {
    if (!character.value) return false
    
    character.value.hp = Math.max(0, character.value.hp - amount)
    
    if (character.value.hp === 0) {
      character.value.lives = Math.max(0, character.value.lives - 1)
      
      if (character.value.lives > 0) {
        character.value.hp = character.value.maxHp
      }
    }
    
    saveCharacter()
    return character.value.hp > 0 || character.value.lives > 0
  }

  function healCharacter(amount: number) {
    if (!character.value) return
    
    character.value.hp = Math.min(character.value.maxHp, character.value.hp + amount)
    saveCharacter()
  }

  function showGameOver() {
    if (!character.value) return
    
    const survivalTime = calculateSurvivalTime(character.value.createdAt)
    
    gameOverState.value = {
      show: true,
      characterName: character.value.name,
      level: character.value.level,
      totalXp: character.value.xp,
      gold: character.value.gold,
      survivalTime
    }
  }

  function calculateSurvivalTime(createdAt: number): string {
    const now = Date.now()
    const timeDiff = now - createdAt
    const minutes = Math.floor(timeDiff / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) {
      const remainingMinutes = minutes % 60
      return `${hours}h ${remainingMinutes}m`
    }
    return `${minutes}m`
  }

  function handleGameOverAction(action: 'newCharacter' | 'mainMenu') {
    clearCharacter()
    gameOverState.value.show = false
    
    if (action === 'mainMenu') {
      navigateTo('/')
    } else if (action === 'newCharacter') {
      navigateTo('/create-character')
    }
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
    closeLevelUpAnimation,
    battleState: readonly(battleState),
    startBattle,
    executeBattle,
    showBattleResult,
    closeBattle,
    takeDamage,
    healCharacter,
    gameOverState: readonly(gameOverState),
    handleGameOverAction
  }
})