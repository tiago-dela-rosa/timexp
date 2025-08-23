<template>
  <div class="retro-container">
    <h2 class="retro-text text-lg mb-4 flex items-center gap-2">
      <span>📜</span>
      GAME LOG
    </h2>
    <div class="ascii-border p-4 h-48 overflow-y-auto">
      <div class="retro-text text-sm space-y-1">
        <div class="flex items-start gap-2">
          <span>▶</span>
          <span>Character {{ character.name }} has been created.</span>
        </div>
        <div class="flex items-start gap-2">
          <span>▶</span>
          <span>You are ready to begin your adventure...</span>
        </div>
        <div class="flex items-start gap-2">
          <span>▶</span>
          <span>Choose an action to continue.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '~/stores/models/character'

interface Props {
  character: Character
}

defineProps<Props>()
</script>