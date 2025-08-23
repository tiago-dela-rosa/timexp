<template>
  <div v-if="character" class="retro-container mt-6">
    <h3 class="retro-text mb-2 flex items-center gap-2">
      <span>⚔️</span>
      CURRENT CHARACTER:
    </h3>
    <div class="text-left space-y-1">
      <div class="stat-display">
        <span>◆ NAME:</span>
        <span>{{ character.name }}</span>
      </div>
      <div class="stat-display">
        <span>CLASS:</span>
        <span class="flex items-center gap-1">
          {{ getClassIcon(character.class) }}
          {{ character.class.toUpperCase() }}
        </span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('level') }} LEVEL:</span>
        <span>{{ character.level }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('lives') }} LIVES:</span>
        <span>{{ character.lives }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/character'
import { storeToRefs } from 'pinia'
import { getClassIcon, getStatIcon } from '~/utils/ascii-icons'

const characterStore = useCharacterStore()
const { character } = storeToRefs(characterStore)
</script>