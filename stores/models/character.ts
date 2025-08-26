export interface ICharacter {
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

export interface ICharacterClass {
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