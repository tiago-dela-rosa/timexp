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
        <span>{{ character.xp }}</span>
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
        <span class="text-yellow-400">{{ character.attack }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('defense') }}DEF:</span>
        <span class="text-gray-400">{{ character.defense }}</span>
      </div>
      <div class="stat-display">
        <span>{{ getStatIcon('lives') }}LIVES:</span>
        <span class="text-purple-400">{{ character.lives }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICharacter } from '~/stores/models/character'
import { getClassIcon, getStatIcon } from '~/utils/ascii-icons'

interface Props {
  character: ICharacter
}

defineProps<Props>()
</script>