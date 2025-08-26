export type FrequencyType = 'Common' | 'Rare' | 'Super Rare'

export interface IEnemy {
  name: string
  description: string
  frequency: FrequencyType
  hp: number
  attack: number
  defense: number
  xpReward: number
}

export interface IGameEvent {
  name: string
  description: string
  frequency: FrequencyType
  effects: {
    hp?: number
    mp?: number
    xp?: number
    gold?: number
  }
}

export interface IItem {
  name: string
  description: string
  frequency: FrequencyType
  type: 'consumable' | 'equipment' | 'misc'
  effects?: {
    hp?: number
    mp?: number
    attack?: number
    defense?: number
  }
}

export interface IRegion {
  id: string
  name: string
  description: string
  isUnlocked: boolean
  unlockRequirement?: {
    level: number
    description: string
  }
  enemies: IEnemy[]
  events: IGameEvent[]
  items: IItem[]
}