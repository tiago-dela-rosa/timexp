<template>
  <div v-if="region" class="space-y-6">
    <div class="rounded-lg">
      <h3 class="text-xl font-mono text-green-400 mb-2">
        {{ region.name.toUpperCase() }}
      </h3>
      <p class="text-gray-300 font-mono text-sm mb-4">
        {{ region.description }}
      </p>
    </div>
   
    <div class="border border-gray-600 p-4 rounded-lg bg-black/30">
      <div class="flex border-b border-gray-600 mb-4">
        <button 
          v-for="tab in tabs" 
          :key="tab.key"
          class="px-4 py-2 font-mono text-sm transition-colors"
          :class="{
            'text-green-400 border-b-2 border-green-400': activeTab === tab.key,
            'text-gray-400 hover:text-white': activeTab !== tab.key
          }"
          @click="activeTab = tab.key"
        >
          {{ tab.icon }} {{ tab.label }}
        </button>
      </div>

      <div class="space-y-2 max-h-64 overflow-y-auto">
        <div v-if="activeTab === 'enemies'">
          <div 
            v-for="enemy in region.enemies" 
            :key="enemy.name"
            class="border border-gray-600 p-3 rounded bg-black/50"
          >
            <div class="flex justify-between items-center">
              <span class="font-mono text-white text-sm">{{ enemy.name }}</span>
              <span 
                class="text-xs font-mono px-2 py-1 rounded"
                :class="getFrequencyClass(enemy.frequency)"
              >
                {{ enemy.frequency }}
              </span>
            </div>
            <p class="text-xs text-gray-400 font-mono mt-1">{{ enemy.description }}</p>
          </div>
        </div>

        <div v-if="activeTab === 'events'">
          <div 
            v-for="event in region.events" 
            :key="event.name"
            class="border border-gray-600 p-3 rounded bg-black/50"
          >
            <div class="flex justify-between items-center">
              <span class="font-mono text-white text-sm">{{ event.name }}</span>
              <span 
                class="text-xs font-mono px-2 py-1 rounded"
                :class="getFrequencyClass(event.frequency)"
              >
                {{ event.frequency }}
              </span>
            </div>
            <p class="text-xs text-gray-400 font-mono mt-1">{{ event.description }}</p>
          </div>
        </div>

        <div v-if="activeTab === 'items'">
          <div 
            v-for="item in region.items" 
            :key="item.name"
            class="border border-gray-600 p-3 rounded bg-black/50"
          >
            <div class="flex justify-between items-center">
              <span class="font-mono text-white text-sm">{{ item.name }}</span>
              <span 
                class="text-xs font-mono px-2 py-1 rounded"
                :class="getFrequencyClass(item.frequency)"
              >
                {{ item.frequency }}
              </span>
            </div>
            <p class="text-xs text-gray-400 font-mono mt-1">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="border border-green-400 p-4 rounded-lg bg-green-900/10 space-y-3">
      <div class="flex flex-wrap gap-2 justify-center">
        <button 
          v-for="option in timeOptions" 
          :key="option.value"
          class="px-3 py-2 text-xs font-mono rounded transition-colors"
          :class="{
            'bg-green-400 text-black': selectedTime === option.value,
            'border border-gray-600 text-gray-300 hover:border-green-400': selectedTime !== option.value
          }"
          @click="selectedTime = option.value"
        >
          {{ option.label }}
        </button>
      </div>
      
      <button 
        class="w-full py-3 px-4 border border-green-400 text-green-400 font-mono hover:bg-green-400 hover:text-black transition-colors"
        :disabled="!selectedTime"
        :class="{ 'opacity-50 cursor-not-allowed': !selectedTime }"
        @click="startExploration"
      >
        ► START {{ selectedTime ? getTimeLabel(selectedTime) : '' }} EXPLORATION
      </button>
      
      <p v-if="selectedTime" class="text-xs text-center text-yellow-400 font-mono">
        ⚠ Cannot be cancelled once started • {{ getCurrentTimeOption()?.risk }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Region, FrequencyType } from '~/stores/models/region'

const props = defineProps<{
  region: Region | null
}>()

const emit = defineEmits<{
  startExploration: [region: Region, duration: number]
}>()

type TabKey = 'enemies' | 'events' | 'items'

const activeTab = ref<TabKey>('enemies')
const selectedTime = ref<number | null>(null)

const tabs = [
  { key: 'enemies' as TabKey, label: 'ENEMIES', icon: '⚔' },
  { key: 'events' as TabKey, label: 'EVENTS', icon: '⚡' },
  { key: 'items' as TabKey, label: 'ITEMS', icon: '💎' }
]

const timeOptions = [
  {
    value: 30,
    label: '30 Minutes',
    risk: 'Low Risk',
    description: 'Quick exploration with basic rewards'
  },
  {
    value: 60,
    label: '1 Hour',
    risk: 'Medium Risk',
    description: 'Balanced risk and reward exploration'
  },
  {
    value: 180,
    label: '3 Hours',
    risk: 'High Risk',
    description: 'Extended exploration with maximum rewards'
  }
]

const getFrequencyClass = (frequency: FrequencyType): string => {
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

const getTimeLabel = (minutes: number): string => {
  const option = timeOptions.find(opt => opt.value === minutes)
  return option?.label.toUpperCase() || ''
}

const getCurrentTimeOption = () => {
  return timeOptions.find(opt => opt.value === selectedTime.value)
}

const startExploration = () => {
  if (props.region && selectedTime.value) {
    emit('startExploration', props.region, selectedTime.value)
  }
}
</script>