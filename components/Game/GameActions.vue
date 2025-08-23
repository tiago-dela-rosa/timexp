<template>
  <div class="lg:col-span-2 space-y-6">
    <div class="retro-container">
      <h2 class="retro-text text-lg mb-4">ACTIONS</h2>
      <div class="grid grid-cols-2 gap-4">
        <button class="retro-button py-3 flex items-center justify-center gap-2">
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
    
    <GameLog :character="character" />
  </div>
</template>

<script setup lang="ts">
import type { Character } from '~/stores/models/character'
import GameLog from './GameLog.vue'
import { ASCII_ICONS } from '~/utils/ascii-icons'

interface Props {
  character: Character
}

defineProps<Props>()

function getActionIcon(action: string): string {
  return ASCII_ICONS.ACTIONS[action as keyof typeof ASCII_ICONS.ACTIONS] || ''
}
</script>