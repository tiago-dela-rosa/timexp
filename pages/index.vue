<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="retro-container max-w-md w-full text-center">
      <GameLogo />
      <MenuActions />
      <CurrentCharacterSummary />
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuActions from '~/components/MainMenu/MenuActions.vue'
import GameLogo from '~/components/MainMenu/GameLogo.vue'
import CurrentCharacterSummary from '~/components/MainMenu/CurrentCharacterSummary.vue'
import { useCharacterStore } from '~/stores/character'

const characterStore = useCharacterStore()

onMounted(() => {
  characterStore.loadCharacter()
})
</script>