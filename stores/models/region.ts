export type FrequencyType = 'Common' | 'Rare' | 'Super Rare'

export interface Enemy {
  name: string
  description: string
  frequency: FrequencyType
  hp: number
  attack: number
  defense: number
  xpReward: number
}

export interface GameEvent {
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

export interface Item {
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

export interface Region {
  id: string
  name: string
  description: string
  isUnlocked: boolean
  unlockRequirement?: {
    level: number
    description: string
  }
  enemies: Enemy[]
  events: GameEvent[]
  items: Item[]
}