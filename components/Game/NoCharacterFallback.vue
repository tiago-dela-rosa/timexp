<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="retro-container text-center">
      <div class="text-6xl mb-4">❌</div>
      <h2 class="retro-title">NO CHARACTER FOUND</h2>
      <p class="retro-text mb-6 flex items-center justify-center gap-2">
        <span>⚠️</span>
        You need to create a character first.
      </p>
      <button 
        class="retro-button flex items-center justify-center gap-2"
        @click="createCharacter"
      >
        <span>⚔️</span>
        CREATE CHARACTER
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'

function createCharacter() {
  navigateTo('/create-character')
}
</script>