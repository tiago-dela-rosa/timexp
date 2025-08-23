export interface Character {
  name: string
  class: 'warrior' | 'mage' | 'archer'
  level: number
  xp: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  attack: number
  defense: number
  lives: number
  createdAt: number
}

export interface CharacterClass {
  name: string
  description: string
  stats: {
    hp: number
    maxHp: number
    mp: number
    maxMp: number
    attack: number
    defense: number
  }
}