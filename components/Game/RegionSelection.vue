<template>
  <div class="space-y-4">
    <h3 class="text-xl font-mono text-green-400 border-b border-green-400 pb-2">
      SELECT REGION
    </h3>
    
    <div class="space-y-3">
      <div 
        v-for="region in regionsStore.regions" 
        :key="region.id"
        class="border border-gray-600 p-4 rounded-lg bg-black/50"
        :class="{
          'opacity-50': !region.isUnlocked,
          'cursor-pointer hover:border-green-400': region.isUnlocked,
          'cursor-not-allowed': !region.isUnlocked,
          'border-green-400 bg-green-900/20': selectedRegion?.id === region.id
        }"
        @click="selectRegion(region)"
      >
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-lg font-mono text-white">
            {{ region.isUnlocked ? '▶' : '🔒' }} {{ region.name }}
          </h4>
          <div v-if="!region.isUnlocked && region.unlockRequirement" 
               class="text-sm text-yellow-400 font-mono">
            {{ region.unlockRequirement.description }}
          </div>
        </div>
        
        <p class="text-gray-300 text-sm font-mono mb-2">
          {{ region.description }}
        </p>
        
        <div class="flex space-x-4 text-xs font-mono text-gray-400">
          <span>Enemies: {{ region.enemies.length }}</span>
          <span>Events: {{ region.events.length }}</span>
          <span>Items: {{ region.items.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IRegion } from '~/stores/models/region'
import { useRegionsStore } from '~/stores/regions'

const regionsStore = useRegionsStore()
const selectedRegion = ref<IRegion | null>(null)

const emit = defineEmits<{
  regionSelected: [region: IRegion]
}>()

const selectRegion = (region: IRegion) => {
  if (!region.isUnlocked) return
  
  selectedRegion.value = region
  emit('regionSelected', region)
}
</script>