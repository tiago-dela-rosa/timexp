<template>
  <div class="retro-container mb-6 mx-4 mt-4">
    <div class="flex justify-between items-center">
      <h1 class="retro-title flex items-center gap-2">
        <span class="text-2xl">⚡</span>
        TIMEXP
      </h1>
      <button 
        class="retro-button flex items-center gap-2"
        @click="goToMenu"
      >
        <span>{{ getActionIcon('menu') }}</span>
        MENU
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'
import { ASCII_ICONS } from '~/utils/ascii-icons'

function getActionIcon(action: string): string {
  return ASCII_ICONS.ACTIONS[action as keyof typeof ASCII_ICONS.ACTIONS] || ''
}

function goToMenu() {
  navigateTo('/')
}
</script>