import type { IRegion, IEnemy, IGameEvent, IItem, FrequencyType } from './models/region'
export type { FrequencyType }
import { useCharacterStore } from './character'

export type EncounterType = 'battle' | 'event' | 'item'

export interface IEncounter {
  id: string
  type: EncounterType
  timestamp: number
  name: string
  description: string
  frequency: FrequencyType
  results?: {
    xp?: number
    hp?: number
    mp?: number
    gold?: number
    itemsFound?: string[]
  }
}

export interface IExplorationSession {
  id: string
  region: IRegion
  duration: number
  startTime: number
  endTime: number
  isActive: boolean
  encounters: IEncounter[]
  nextEncounterTime: number
  currentBonus: number
}

export interface IExplorationSummary {
  totalEncounters: number
  battles: number
  events: number
  items: number
  totalXp: number
  totalGold: number
  itemsFound: string[]
  duration: number
}

export const useExplorationStore = defineStore('exploration', () => {
  const currentExploration = ref<IExplorationSession | null>(null)
  const explorationHistory = ref<IExplorationSession[]>([])
  
  let intervalId: NodeJS.Timeout | null = null

  const isExploring = computed(() => currentExploration.value?.isActive === true)
  
  const timeRemaining = computed(() => {
    if (!currentExploration.value?.isActive) return 0
    const now = Date.now()
    const endTime = currentExploration.value.endTime
    return Math.max(0, endTime - now)
  })

  const progressPercentage = computed(() => {
    if (!currentExploration.value) return 0
    const total = currentExploration.value.duration * 60 * 1000
    const elapsed = Date.now() - currentExploration.value.startTime
    return Math.min(100, (elapsed / total) * 100)
  })

  const nextEncounterIn = computed(() => {
    if (!currentExploration.value?.isActive) return 0
    return Math.max(0, currentExploration.value.nextEncounterTime - Date.now())
  })

  function calculateBonus(duration: number): number {
    const baseBonus = 1.0
    const bonusPerHour = 0.5
    return baseBonus + (duration / 60) * bonusPerHour
  }

  function generateEncounterType(): EncounterType {
    const rand = Math.random() * 100
    if (rand <= 65) return 'battle'
    if (rand <= 85) return 'event'
    return 'item'
  }

  function getFrequencyFromRandom(): FrequencyType {
    const rand = Math.random() * 100
    if (rand <= 75) return 'Common'
    if (rand <= 95) return 'Rare'
    return 'Super Rare'
  }

  function selectEncounterByFrequency<T extends { frequency: FrequencyType }>(
    items: T[], 
    targetFrequency: FrequencyType
  ): T | null {
    const matchingItems = items.filter(item => item.frequency === targetFrequency)
    if (matchingItems.length === 0) return null
    return matchingItems[Math.floor(Math.random() * matchingItems.length)]
  }

  function generateEncounter(region: IRegion): IEncounter | null {
    const type = generateEncounterType()
    const frequency = getFrequencyFromRandom()
    const timestamp = Date.now()
    const id = `${timestamp}-${Math.random().toString(36).substr(2, 9)}`

    switch (type) {
      case 'battle': {
        const enemy = selectEncounterByFrequency(region.enemies, frequency)
        if (!enemy) return null
        
        const goldReward = Math.floor(enemy.xpReward * 0.5) + Math.floor(Math.random() * 5) + 1
        
        return {
          id,
          type: 'battle',
          timestamp,
          name: enemy.name,
          description: `Encountered ${enemy.name}`,
          frequency,
          results: {
            xp: enemy.xpReward,
            gold: goldReward
          }
        }
      }
      
      case 'event': {
        const event = selectEncounterByFrequency(region.events, frequency)
        if (!event) return null
        
        return {
          id,
          type: 'event',
          timestamp,
          name: event.name,
          description: event.description,
          frequency,
          results: event.effects
        }
      }
      
      case 'item': {
        const item = selectEncounterByFrequency(region.items, frequency)
        if (!item) return null
        
        return {
          id,
          type: 'item',
          timestamp,
          name: item.name,
          description: `Found ${item.name}`,
          frequency,
          results: {
            itemsFound: [item.name]
          }
        }
      }
      
      default:
        return null
    }
  }

  function scheduleNextEncounter() {
    if (!currentExploration.value?.isActive) return
    currentExploration.value.nextEncounterTime = Date.now() + (5 * 60 * 1000)
    saveExploration()
  }

  function processEncounter() {
    if (!currentExploration.value?.isActive) return

    const encounter = generateEncounter(currentExploration.value.region)
    if (encounter) {
      currentExploration.value.encounters.push(encounter)
      applyEncounterResults(encounter)
      saveExploration()
    }
    
    scheduleNextEncounter()
  }

  function applyEncounterResults(encounter: IEncounter) {
    const characterStore = useCharacterStore()
    
    if (encounter.results?.xp) {
      characterStore.gainXp(encounter.results.xp)
    }
    
    if (encounter.results?.gold) {
      characterStore.gainGold(encounter.results.gold)
    }
  }

  function startExploration(region: IRegion, duration: number): boolean {
    if (isExploring.value) return false

    const now = Date.now()
    const session: IExplorationSession = {
      id: `exploration-${now}`,
      region,
      duration,
      startTime: now,
      endTime: now + (duration * 60 * 1000),
      isActive: true,
      encounters: [],
      nextEncounterTime: now + (5 * 60 * 1000),
      currentBonus: calculateBonus(duration)
    }

    currentExploration.value = session
    saveExploration()
    
    intervalId = setInterval(checkExploration, 1000)
    
    return true
  }

  function checkExploration() {
    if (!currentExploration.value?.isActive) return

    const now = Date.now()
    
    if (now >= currentExploration.value.nextEncounterTime) {
      processEncounter()
    }

    if (now >= currentExploration.value.endTime) {
      completeExploration()
    }
  }

  function completeExploration() {
    if (!currentExploration.value) return

    currentExploration.value.isActive = false
    explorationHistory.value.push({ ...currentExploration.value })
    
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    
    saveExploration()
    saveHistory()
  }

  function forceStopExploration() {
    if (currentExploration.value) {
      currentExploration.value.isActive = false
    }
    
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    
    currentExploration.value = null
    localStorage.removeItem('timexp-exploration')
  }

  function getExplorationSummary(): IExplorationSummary | null {
    if (!currentExploration.value) return null

    const encounters = currentExploration.value.encounters
    const battles = encounters.filter(e => e.type === 'battle').length
    const events = encounters.filter(e => e.type === 'event').length
    const items = encounters.filter(e => e.type === 'item').length
    
    const totalXp = encounters.reduce((sum, e) => sum + (e.results?.xp || 0), 0)
    const totalGold = encounters.reduce((sum, e) => sum + (e.results?.gold || 0), 0)
    const itemsFound = encounters.flatMap(e => e.results?.itemsFound || [])

    return {
      totalEncounters: encounters.length,
      battles,
      events,
      items,
      totalXp,
      totalGold,
      itemsFound,
      duration: currentExploration.value.duration
    }
  }

  function saveExploration() {
    if (currentExploration.value) {
      localStorage.setItem('timexp-exploration', JSON.stringify(currentExploration.value))
    }
  }

  function saveHistory() {
    localStorage.setItem('timexp-exploration-history', JSON.stringify(explorationHistory.value))
  }

  function loadExploration() {
    try {
      const saved = localStorage.getItem('timexp-exploration')
      if (saved) {
        const exploration = JSON.parse(saved) as IExplorationSession
        
        if (exploration.isActive) {
          const now = Date.now()
          if (now < exploration.endTime) {
            currentExploration.value = exploration
            intervalId = setInterval(checkExploration, 1000)
          } else {
            exploration.isActive = false
            currentExploration.value = exploration
            completeExploration()
          }
        } else {
          currentExploration.value = exploration
        }
      }

      const historyData = localStorage.getItem('timexp-exploration-history')
      if (historyData) {
        explorationHistory.value = JSON.parse(historyData)
      }
    } catch (error) {
      currentExploration.value = null
      explorationHistory.value = []
    }
  }

  function clearExploration() {
    forceStopExploration()
    explorationHistory.value = []
    localStorage.removeItem('timexp-exploration-history')
  }

  function triggerTestEncounter() {
    if (!currentExploration.value?.isActive) return false
    processEncounter()
    currentExploration.value.nextEncounterTime = Date.now() + (5 * 60 * 1000)
    saveExploration()
    return true
  }

  return {
    currentExploration: readonly(currentExploration),
    explorationHistory: readonly(explorationHistory),
    isExploring,
    timeRemaining,
    progressPercentage,
    nextEncounterIn,
    startExploration,
    completeExploration,
    forceStopExploration,
    getExplorationSummary,
    loadExploration,
    clearExploration,
    triggerTestEncounter
  }
})