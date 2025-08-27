export const battleConfig = {
  timing: {
    turnDelay: 2500,
    battleEndDelay: 4000,
    typewriterSpeed: 30,
    typewriterDelayMultiplier: 1000
  },
  
  ui: {
    hpBarAnimationDuration: 500,
    modalBackgroundOpacity: 0.20,
    modalContentOpacity: 0.95
  },
  
  damage: {
    defenseReductionPerPoint: 0.1,
    minimumDamage: 1
  }
}

export type BattleConfig = typeof battleConfig