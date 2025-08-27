<template>
  <div v-if="showSummary && summary" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div class="retro-container max-w-md mx-4 max-h-[90vh] overflow-y-auto">
      <div class="space-y-4">
        <div class="text-center">
          <h2 class="retro-text text-xl mb-2 text-green-400">EXPLORATION COMPLETE!</h2>
          <p class="text-sm font-mono text-gray-300">{{ regionName }}</p>
        </div>

        <div class="ascii-border p-4 space-y-3">
          <div class="text-center">
            <div class="text-2xl font-mono text-yellow-400 mb-1">
              {{ summary.totalEncounters }}
            </div>
            <div class="text-xs text-gray-400 font-mono">TOTAL ENCOUNTERS</div>
          </div>

          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-lg font-mono text-red-400">{{ summary.battles }}</div>
              <div class="text-xs text-gray-400 font-mono">⚔ BATTLES</div>
            </div>
            <div>
              <div class="text-lg font-mono text-blue-400">{{ summary.events }}</div>
              <div class="text-xs text-gray-400 font-mono">⚡ EVENTS</div>
            </div>
            <div>
              <div class="text-lg font-mono text-purple-400">{{ summary.items }}</div>
              <div class="text-xs text-gray-400 font-mono">💎 ITEMS</div>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <div v-if="summary.totalXp > 0" class="flex justify-between items-center py-2 border-b border-gray-600">
            <span class="font-mono text-sm text-gray-300">Experience Gained:</span>
            <span class="font-mono text-sm text-green-400">+{{ summary.totalXp }} XP</span>
          </div>
          
          <div v-if="summary.totalGold > 0" class="flex justify-between items-center py-2 border-b border-gray-600">
            <span class="font-mono text-sm text-gray-300">Gold Earned:</span>
            <span class="font-mono text-sm text-yellow-400">+{{ summary.totalGold }} Gold</span>
          </div>

          <div v-if="summary.itemsFound.length > 0" class="py-2">
            <div class="font-mono text-sm text-gray-300 mb-2">Items Found:</div>
            <div class="space-y-1">
              <div 
                v-for="(item, index) in summary.itemsFound" 
                :key="index"
                class="font-mono text-xs text-purple-400 pl-4"
              >
                • {{ item }}
              </div>
            </div>
          </div>
        </div>

        <div class="text-center space-y-2">
          <div class="text-xs font-mono text-gray-400">
            Duration: {{ formatDuration(summary.duration) }}
          </div>
          
          <button 
            class="w-full retro-button py-2"
            @click="closeSummary"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IExplorationSummary } from '~/stores/exploration'

const props = defineProps<{
  summary: IExplorationSummary | null
  regionName?: string
  show: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const showSummary = computed(() => props.show && props.summary !== null)

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} minutes`
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
  return `${hours}h ${remainingMinutes}m`
}

function closeSummary() {
  emit('close')
}
</script>