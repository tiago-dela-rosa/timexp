<template>
  <div class="retro-container">
    <h2 class="retro-text text-lg mb-4 flex items-center gap-2">
      <span>📜</span>
      GAME LOG
    </h2>
    <div class="ascii-border p-4 h-48 overflow-y-auto" ref="logContainer">
      <div class="retro-text text-sm space-y-1">        
        <div v-for="encounter in recentEncounters" :key="encounter.id" class="flex items-start gap-2">
          <span class="w-4 text-center">{{ getEncounterIcon(encounter.type) }}</span>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="text-gray-300">{{ encounter.name }}</span>
              <span 
                class="text-xs px-1 rounded"
                :class="getFrequencyClass(encounter.frequency)"
              >
                {{ encounter.frequency }}
              </span>
              <span class="text-xs text-gray-500">{{ formatTimestamp(encounter.timestamp) }}</span>
            </div>
            <div v-if="encounter.results" class="text-xs text-gray-400 mt-1">
              <span v-if="encounter.results.xp">+{{ encounter.results.xp }} XP </span>
              <span v-if="encounter.results.gold">+{{ encounter.results.gold }} Gold </span>
              <span v-if="encounter.results.hp">({{ encounter.results.hp > 0 ? '+' : '' }}{{ encounter.results.hp }} HP) </span>
              <span v-if="encounter.results.mp">({{ encounter.results.mp > 0 ? '+' : '' }}{{ encounter.results.mp }} MP) </span>
              <span v-if="encounter.results.itemsFound">{{ encounter.results.itemsFound.join(', ') }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <span>▶</span>
          <span>Character {{ character.name }} has been created.</span>
        </div>
        <div class="flex items-start gap-2">
          <span>▶</span>
          <span>You are ready to begin your adventure...</span>
        </div>
        <div class="flex items-start gap-2">
          <span>▶</span>
          <span>Choose an action to continue.</span>
        </div>        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { ICharacter } from '~/stores/models/character'
import type { IEncounter, EncounterType, FrequencyType } from '~/stores/exploration'
import { useExplorationStore } from '~/stores/exploration'

interface Props {
  character: ICharacter
}

defineProps<Props>()

const explorationStore = useExplorationStore()
const logContainer = ref<HTMLElement>()

const recentEncounters = computed(() => {
  const exploration = explorationStore.currentExploration
  if (!exploration) return []
  
  return exploration.encounters.toReversed()
})

function getEncounterIcon(type: EncounterType): string {
  switch (type) {
    case 'battle': return '⚔'
    case 'event': return '⚡'
    case 'item': return '💎'
    default: return '▶'
  }
}

function getFrequencyClass(frequency: FrequencyType): string {
  switch (frequency) {
    case 'Common':
      return 'bg-gray-600 text-gray-200'
    case 'Rare':
      return 'bg-blue-600 text-blue-100'
    case 'Super Rare':
      return 'bg-purple-600 text-purple-100'
    default:
      return 'bg-gray-600 text-gray-200'
  }
}

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

watch(recentEncounters, async () => {
  await nextTick()
  if (logContainer.value) {
    logContainer.value.scrollTop = logContainer.value.scrollHeight
  }
}, { deep: true })
</script>