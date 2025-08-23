<template>
  <div class="retro-container">
    <h2 class="retro-text text-lg mb-4">PREVIEW:</h2>
    <div v-if="selectedClassData || characterName" class="space-y-3">
      <div class="stat-display">
        <span>{{ getStatIcon('') }}NAME:</span>
        <span :class="{ 'opacity-50': !characterName }">{{ characterName || 'Enter name...' }}</span>
      </div>
      <div class="stat-display">
        <span>CLASS:</span>
        <span :class="{ 'opacity-50': !selectedClassData }" class="flex items-center gap-1">
          <span v-if="selectedClassData">{{ getClassIcon(selectedClassData.name) }}</span>
          {{ selectedClassData?.name.toUpperCase() || 'Select class...' }}
        </span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('level') }}LEVEL:</span>
        <span>1</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('hp') }}HP:</span>
        <span :class="{ 'opacity-50': !selectedClassData }">{{ selectedClassData?.stats.hp || '-' }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('mp') }}MP:</span>
        <span :class="{ 'opacity-50': !selectedClassData }">{{ selectedClassData?.stats.mp || '-' }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('attack') }}ATK:</span>
        <span :class="{ 'opacity-50': !selectedClassData }">{{ selectedClassData?.stats.attack || '-' }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('defense') }}DEF:</span>
        <span :class="{ 'opacity-50': !selectedClassData }">{{ selectedClassData?.stats.defense || '-' }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('lives') }}LIVES:</span>
        <span>3</span>
      </div>
    </div>
    <div v-else class="retro-text opacity-50">
      Enter a name or select a class to see preview...
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CharacterClass } from '~/stores/models/character'
import { getClassIcon, getStatIcon } from '~/utils/ascii-icons'

interface Props {
  characterName: string
  selectedClassData: CharacterClass | null
}

defineProps<Props>()
</script>