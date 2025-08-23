<template>
  <div class="space-y-4">
    <button 
      v-if="!hasCharacter"
      class="retro-button w-full py-3 text-lg"
      @click="startNewGame"
    >
      NEW GAME
    </button>
    
    <button 
      v-if="hasCharacter"
      class="retro-button w-full py-3 text-lg"
      @click="continueGame"
    >
      CONTINUE
    </button>
    
    <button 
      v-if="hasCharacter"
      class="retro-button w-full py-3"
      @click="startNewGame"
    >
      NEW CHARACTER
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/character'
import { storeToRefs } from 'pinia'
import { navigateTo } from '#app'

const characterStore = useCharacterStore()
const { hasCharacter } = storeToRefs(characterStore)

function startNewGame() {
  navigateTo('/create-character')
}

function continueGame() {
  if (hasCharacter.value) {
    navigateTo('/game')
  }
}
</script>