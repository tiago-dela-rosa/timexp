<template>
  <NuxtLayout>
    <div class="p-4">
      <div v-if="character" class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-3 gap-6">
          <GameCharacterStats :character="character" />
          <GameGameActions :character="character" />
        </div>
      </div>
      
      <GameNoCharacterFallback v-else />

      <GameLevelUpAnimation
        :show="levelUpData.show"
        :character-name="levelUpData.characterName"
        :new-level="levelUpData.newLevel"
        :stat-bonuses="levelUpData.statBonuses"
        @close="characterStore.closeLevelUpAnimation"
      />
      
      <GameBattleModal />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import GameCharacterStats from '~/components/Game/CharacterStats.vue'
import GameGameActions from '~/components/Game/GameActions.vue'
import GameNoCharacterFallback from '~/components/Game/NoCharacterFallback.vue'
import GameLevelUpAnimation from '~/components/Game/LevelUpAnimation.vue'
import GameBattleModal from '~/components/Game/BattleModal.vue'
import { useCharacterStore } from '~/stores/character'
import { useExplorationStore } from '~/stores/exploration'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

// Explicitly use default layout
definePageMeta({
  layout: 'default'
})

const characterStore = useCharacterStore()
const explorationStore = useExplorationStore()
const { character, levelUpData } = storeToRefs(characterStore)

onMounted(() => {
  characterStore.loadCharacter()
  explorationStore.loadExploration()
})
</script>