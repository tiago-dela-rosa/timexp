<template>
  <div v-if="explorationStore.isExploring" class="retro-container">
    <div class="space-y-4">
      <h3 class="retro-text text-lg flex items-center gap-2">
        <span>🗺️</span>
        EXPLORATION IN PROGRESS
      </h3>
      
      <div v-if="exploration" class="space-y-3">
        <div>
          <div class="flex justify-between text-sm font-mono mb-1">
            <span>{{ exploration.region.name.toUpperCase() }}</span>
            <span>{{ formatTime(timeRemaining) }}</span>
          </div>
          
          <div class="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-1000"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
          
          <div class="flex justify-between text-xs font-mono text-gray-400 mt-1">
            <span>{{ exploration.encounters.length }} encounters</span>
            <span>{{ Math.round(progressPercentage) }}%</span>
          </div>
        </div>

        <div class="text-xs font-mono text-gray-300 space-y-1">
          <div class="flex justify-between">
            <span>Next encounter in:</span>
            <span class="text-yellow-400">{{ formatTime(nextEncounterIn) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Bonus multiplier:</span>
            <span class="text-green-400">×{{ exploration.currentBonus.toFixed(1) }}</span>
          </div>
        </div>

        <div v-if="recentEncounter" class="border border-blue-400 p-2 rounded bg-blue-900/20">
          <div class="text-xs font-mono">
            <div class="flex items-center justify-between mb-1">
              <span class="text-blue-400">RECENT ENCOUNTER</span>
              <span class="text-gray-400">{{ formatTimestamp(recentEncounter.timestamp) }}</span>
            </div>
            <div class="text-white">{{ recentEncounter.name }}</div>
            <div class="text-gray-300">{{ recentEncounter.description }}</div>
          </div>
        </div>

        <div v-if="isDev" class="border border-orange-400 p-2 rounded bg-orange-900/20">
          <div class="text-xs font-mono text-orange-300 mb-2">DEV TOOLS</div>
          <button 
            class="text-xs text-orange-400 hover:text-orange-300 font-mono border border-orange-400 px-2 py-1 hover:bg-orange-400 hover:text-black transition-colors"
            @click="triggerTestEncounter"
          >
            TRIGGER ENCOUNTER
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useExplorationStore } from '~/stores/exploration'

const explorationStore = useExplorationStore()
const currentTime = ref(Date.now())
let timerInterval: NodeJS.Timeout | null = null

const exploration = computed(() => explorationStore.currentExploration)

const recentEncounter = computed(() => {
  const encounters = exploration.value?.encounters
  return encounters && encounters.length > 0 ? encounters[encounters.length - 1] : null
})

const timeRemaining = computed(() => {
  if (!exploration.value?.isActive) return 0
  const endTime = exploration.value.endTime
  return Math.max(0, endTime - currentTime.value)
})

const progressPercentage = computed(() => {
  if (!exploration.value) return 0
  const total = exploration.value.duration * 60 * 1000
  const elapsed = currentTime.value - exploration.value.startTime
  return Math.min(100, (elapsed / total) * 100)
})

const nextEncounterIn = computed(() => {
  if (!exploration.value?.isActive) return 0
  return Math.max(0, exploration.value.nextEncounterTime - currentTime.value)
})

const isDev = computed(() => process.env.NODE_ENV === 'development')

function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  
  if (minutes === 0) return `${seconds}s ago`
  return `${minutes}m ago`
}

function triggerTestEncounter() {
  explorationStore.triggerTestEncounter()
}


onMounted(() => {
  explorationStore.loadExploration()
  timerInterval = setInterval(() => {
    currentTime.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
})
</script>