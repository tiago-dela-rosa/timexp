import { battleConfig } from '~/config/battle'

/**
 * Core damage calculation formula for the entire game
 * @param {number} minAttack - Attacker's minimum attack stat
 * @param {number} maxAttack - Attacker's maximum attack stat
 * @param {number} defense - Defender's defense stat  
 * @returns {number} Final damage dealt
 * 
 * Formula Logic:
 * - Rolls random attack value between min and max attack
 * - Each defense point provides configurable damage reduction (default 10%)
 * - Defense 5 = 50% damage reduction  
 * - Defense 10+ = almost immune (minimum configurable damage)
 * - Always deals at least minimum damage for game balance
 */
export function calculateDamage(minAttack: number, maxAttack: number, defense: number): number {
  const attackRoll = Math.floor(Math.random() * (maxAttack - minAttack + 1)) + minAttack
  const damageReduction = defense * battleConfig.damage.defenseReductionPerPoint
  const finalDamage = Math.max(
    battleConfig.damage.minimumDamage, 
    Math.round(attackRoll * (1 - damageReduction))
  )
  return finalDamage
}

export interface IBattleTurn {
  type: 'hero' | 'enemy' | 'victory' | 'defeat' | 'start'
  message: string
  damage?: number
  heroHp: number
  enemyHp: number
  heroMaxHp: number
  enemyMaxHp: number
}

export interface IBattleResult {
  isVictory: boolean
  battleTurns: IBattleTurn[]
  heroFinalHp: number
  enemyFinalHp: number
  turnsElapsed: number
}

export function simulateBattle(
  heroMinAttack: number,
  heroMaxAttack: number,
  heroDefense: number,
  heroHp: number,
  enemyMinAttack: number,
  enemyMaxAttack: number,
  enemyDefense: number,
  enemyHp: number,
  enemyName: string
): IBattleResult {
  const battleTurns: IBattleTurn[] = []
  let currentHeroHp = heroHp
  let currentEnemyHp = enemyHp
  let turn = 1

  battleTurns.push({
    type: 'start',
    message: `Battle begins against ${enemyName}!`,
    heroHp: currentHeroHp,
    enemyHp: currentEnemyHp,
    heroMaxHp: heroHp,
    enemyMaxHp: enemyHp
  })
  
  while (currentHeroHp > 0 && currentEnemyHp > 0) {
    const heroDamage = calculateDamage(heroMinAttack, heroMaxAttack, enemyDefense)
    const previousEnemyHp = currentEnemyHp
    currentEnemyHp = Math.max(0, currentEnemyHp - heroDamage)
    
    battleTurns.push({
      type: 'hero',
      message: `You attack for ${heroDamage} damage! ${enemyName} takes ${previousEnemyHp - currentEnemyHp} HP damage.`,
      damage: heroDamage,
      heroHp: currentHeroHp,
      enemyHp: currentEnemyHp,
      heroMaxHp: heroHp,
      enemyMaxHp: enemyHp
    })
    
    if (currentEnemyHp <= 0) {
      battleTurns.push({
        type: 'victory',
        message: `${enemyName} is defeated! Victory!`,
        heroHp: currentHeroHp,
        enemyHp: currentEnemyHp,
        heroMaxHp: heroHp,
        enemyMaxHp: enemyHp
      })
      break
    }
    
    const enemyDamage = calculateDamage(enemyMinAttack, enemyMaxAttack, heroDefense)
    const previousHeroHp = currentHeroHp
    currentHeroHp = Math.max(0, currentHeroHp - enemyDamage)
    
    battleTurns.push({
      type: 'enemy',
      message: `${enemyName} attacks for ${enemyDamage} damage! You take ${previousHeroHp - currentHeroHp} HP damage.`,
      damage: enemyDamage,
      heroHp: currentHeroHp,
      enemyHp: currentEnemyHp,
      heroMaxHp: heroHp,
      enemyMaxHp: enemyHp
    })
    
    if (currentHeroHp <= 0) {
      battleTurns.push({
        type: 'defeat',
        message: `You have been defeated! Defeat!`,
        heroHp: currentHeroHp,
        enemyHp: currentEnemyHp,
        heroMaxHp: heroHp,
        enemyMaxHp: enemyHp
      })
      break
    }
    
    turn++
  }

  return {
    isVictory: currentEnemyHp <= 0,
    battleTurns,
    heroFinalHp: currentHeroHp,
    enemyFinalHp: currentEnemyHp,
    turnsElapsed: turn
  }
}