<template>
  <div class="retro-container">
    <h2 class="retro-text text-lg mb-4">CHARACTER INFO</h2>
    <div class="space-y-2">
      <div class="stat-display">
        <span>{{ getStatIcon('') }}NAME:</span>
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
        <span>{{ getStatIcon('level') }}LEVEL:</span>
        <span>{{ character.level }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('xp') }}EXP:</span>
        <span>{{ character.xp }}/{{ xpRequired }}</span>
      </div>
      <div class="mb-2">
        <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500"
            :style="{ width: `${xpPercentage}%` }"
          ></div>
        </div>
        <div class="text-xs text-gray-400 mt-1 text-center">
          {{ Math.round(xpPercentage) }}% to level {{ character.level + 1 }}
        </div>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('hp') }}HP:</span>
        <span class="text-red-400">{{ character.hp }}/{{ character.maxHp }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('mp') }}MP:</span>
        <span class="text-blue-400">{{ character.mp }}/{{ character.maxMp }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('attack') }}ATK:</span>
        <span class="text-yellow-400">{{ character.minAttack }} - {{ character.maxAttack }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('defense') }}DEF:</span>
        <span class="text-gray-400">{{ character.defense }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('lives') }}LIVES:</span>
        <span class="text-purple-400">{{ character.lives }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('gold') }}GOLD:</span>
        <span class="text-yellow-400">{{ character.gold }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ICharacter } from '~/stores/models/character'
import { getClassIcon, getStatIcon } from '~/utils/ascii-icons'
import { useCharacterStore } from '~/stores/character'

interface Props {
  character: ICharacter
}

const props = defineProps<Props>()
const characterStore = useCharacterStore()

const xpRequired = computed(() => {
  return characterStore.calculateXpRequired(props.character.level + 1)
})

const xpPercentage = computed(() => {
  if (xpRequired.value === 0) return 100
  return Math.min(100, (props.character.xp / xpRequired.value) * 100)
})
</script>