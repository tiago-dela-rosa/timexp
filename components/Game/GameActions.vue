<template>
  <div class="lg:col-span-2 space-y-6">
    <div class="retro-container">
      <h2 class="retro-text text-lg mb-4">ACTIONS</h2>
      <div class="grid grid-cols-2 gap-4">
        <button 
          class="retro-button py-3 flex items-center justify-center gap-2"
          :class="{ 
            'bg-green-600': showExploreMode,
            'opacity-50 cursor-not-allowed': !canExplore
          }"
          :disabled="!canExplore"
          @click="toggleExploreMode"
        >
          <span class="text-xl">{{ getActionIcon('explore') }}</span>
          EXPLORE
          <span v-if="!canExplore" class="text-xs">(BUSY)</span>
        </button>
        <button class="retro-button py-3 flex items-center justify-center gap-2">
          <span class="text-xl">{{ getActionIcon('rest') }}</span>
          REST
        </button>
        <button class="retro-button py-3 flex items-center justify-center gap-2">
          <span class="text-xl">{{ getActionIcon('train') }}</span>
          TRAIN
        </button>
        <button class="retro-button py-3 flex items-center justify-center gap-2">
          <span class="text-xl">{{ getActionIcon('inventory') }}</span>
          INVENTORY
        </button>
      </div>
    </div>

    <div v-if="showExploreMode" class="retro-container">
      <div v-if="!selectedRegion" class="grid lg:grid-cols-1 gap-6">
        <RegionSelection @region-selected="onRegionSelected" />
      </div>
      
      <div v-else class="space-y-4">
        <button 
          class="text-sm font-mono text-blue-400 hover:text-blue-300 border-b border-blue-400 pb-1"
          @click="goBackToRegionSelection"
        >
          ← Back to Regions
        </button>
        <RegionDetails 
          :region="selectedRegion" 
          @start-exploration="onStartExploration"
        />
      </div>
    </div>

    <ExplorationProgress />
    
    <GameLog :character="character" />

    <ExplorationSummary 
      :summary="completedSummary"
      :region-name="completedRegionName"
      :show="showSummary"
      @close="onCloseSummary"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ICharacter } from '~/stores/models/character'
import type { IRegion } from '~/stores/models/region'
import type { IExplorationSummary } from '~/stores/exploration'
import GameLog from './GameLog.vue'
import RegionSelection from './RegionSelection.vue'
import RegionDetails from './RegionDetails.vue'
import ExplorationProgress from './ExplorationProgress.vue'
import ExplorationSummary from './ExplorationSummary.vue'
import { ASCII_ICONS } from '~/utils/ascii-icons'
import { useExplorationStore } from '~/stores/exploration'

interface Props {
  character: ICharacter
}

defineProps<Props>()

const explorationStore = useExplorationStore()
const showExploreMode = ref(false)
const selectedRegion = ref<IRegion | null>(null)
const showSummary = ref(false)
const completedSummary = ref<IExplorationSummary | null>(null)
const completedRegionName = ref<string>('')

const canExplore = computed(() => !explorationStore.isExploring)

function getActionIcon(action: string): string {
  return ASCII_ICONS.ACTIONS[action as keyof typeof ASCII_ICONS.ACTIONS] || ''
}

function toggleExploreMode(): void {
  if (!canExplore.value) return
  
  showExploreMode.value = !showExploreMode.value
  if (!showExploreMode.value) {
    selectedRegion.value = null
  }
}

function onRegionSelected(region: IRegion): void {
  selectedRegion.value = region
}

function goBackToRegionSelection(): void {
  selectedRegion.value = null
}

function onStartExploration(region: IRegion, duration: number): void {
  const success = explorationStore.startExploration(region, duration)
  if (success) {
    showExploreMode.value = false
    selectedRegion.value = null
  }
}

function onCloseSummary(): void {
  showSummary.value = false
  completedSummary.value = null
  completedRegionName.value = ''
}

watch(() => explorationStore.currentExploration, (newExploration, oldExploration) => {
  if (oldExploration?.isActive && newExploration && !newExploration.isActive) {
    const summary = explorationStore.getExplorationSummary()
    if (summary) {
      completedSummary.value = summary
      completedRegionName.value = newExploration.region.name
      showSummary.value = true
    }
  }
}, { deep: true })
</script>