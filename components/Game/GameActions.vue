<template>
  <div class="lg:col-span-2 space-y-6">
    <div class="retro-container">
      <h2 class="retro-text text-lg mb-4">ACTIONS</h2>
      <div class="grid grid-cols-2 gap-4">
        <button 
          class="retro-button py-3 flex items-center justify-center gap-2"
          :class="{ 'bg-green-600': showExploreMode }"
          @click="toggleExploreMode"
        >
          <span class="text-xl">{{ getActionIcon('explore') }}</span>
          EXPLORE
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
    
    <GameLog :character="character" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Character } from '~/stores/models/character'
import type { Region } from '~/stores/models/region'
import GameLog from './GameLog.vue'
import RegionSelection from './RegionSelection.vue'
import RegionDetails from './RegionDetails.vue'
import { ASCII_ICONS } from '~/utils/ascii-icons'

interface Props {
  character: Character
}

defineProps<Props>()

const showExploreMode = ref(false)
const selectedRegion = ref<Region | null>(null)

function getActionIcon(action: string): string {
  return ASCII_ICONS.ACTIONS[action as keyof typeof ASCII_ICONS.ACTIONS] || ''
}

function toggleExploreMode(): void {
  showExploreMode.value = !showExploreMode.value
  if (!showExploreMode.value) {
    selectedRegion.value = null
  }
}

function onRegionSelected(region: Region): void {
  selectedRegion.value = region
}

function goBackToRegionSelection(): void {
  selectedRegion.value = null
}

function onStartExploration(region: Region, duration: number): void {
  console.log(`Starting ${duration} minute exploration in:`, region.name)
}
</script>