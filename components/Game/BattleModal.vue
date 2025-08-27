<template>
  <div
    v-if="characterStore.battleState.isInBattle"
    class="fixed inset-0 bg-black flex items-center justify-center z-50"
    :style="{ backgroundColor: `rgba(0, 0, 0, ${battleConfig.ui.modalBackgroundOpacity})` }"
  >
    <div 
      class="bg-gray-900 border-2 border-green-400 rounded-lg p-6 max-w-lg w-full mx-4 shadow-2xl"
      :style="{ backgroundColor: `rgba(17, 24, 39, ${battleConfig.ui.modalContentOpacity})` }"
    >
      <div class="text-center">
        <h2 class="text-xl font-bold text-green-400 mb-4">⚔️ BATTLE ⚔️</h2>
        
        <!-- Hero HP Bar -->
        <div class="mb-3">
          <div class="text-blue-400 text-sm font-bold mb-1">{{ characterStore.character?.name }}</div>
          <div class="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              class="bg-blue-500 h-full transition-all ease-out"
              :style="{ 
                width: heroHpPercentage + '%',
                transitionDuration: `${battleConfig.ui.hpBarAnimationDuration}ms`
              }"
            ></div>
          </div>
          <div class="text-xs text-gray-300 mt-1">
            {{ currentTurn?.heroHp || characterStore.character?.hp }}/{{ currentTurn?.heroMaxHp || characterStore.character?.maxHp }} HP
          </div>
        </div>

        <!-- Enemy HP Bar -->
        <div class="mb-4">
          <div class="text-red-400 text-sm font-bold mb-1">{{ characterStore.battleState.enemy?.name }}</div>
          <div class="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              class="bg-red-500 h-full transition-all ease-out"
              :style="{ 
                width: enemyHpPercentage + '%',
                transitionDuration: `${battleConfig.ui.hpBarAnimationDuration}ms`
              }"
            ></div>
          </div>
          <div class="text-xs text-gray-300 mt-1">
            {{ currentTurn?.enemyHp || characterStore.battleState.enemy?.hp }}/{{ currentTurn?.enemyMaxHp || characterStore.battleState.enemy?.hp }} HP
          </div>
        </div>

        <!-- Battle Log -->
        <div class="bg-gray-800 bg-opacity-80 border border-gray-700 rounded p-3 mb-4 h-32 overflow-y-auto">
          <div class="text-left space-y-1">
            <div 
              v-for="(logEntry, index) in displayedLogs" 
              :key="index"
              class="text-xs font-mono text-gray-300"
            >
              <TypewriterText 
                :text="logEntry" 
                :speed="battleConfig.timing.typewriterSpeed"
                :delay="index * battleConfig.timing.typewriterDelayMultiplier"
              />
            </div>
          </div>
        </div>

        <!-- Battle Status -->
        <div v-if="battleComplete" class="text-sm font-bold mb-2"
             :class="battleResult?.isVictory ? 'text-green-400' : 'text-red-400'">
          {{ battleResult?.isVictory ? '🏆 VICTORY!' : '💀 DEFEAT!' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBattleTurn } from '~/utils/battle'
import TypewriterText from '~/components/Game/TypewriterText.vue'
import { battleConfig } from '~/config/battle'

const characterStore = useCharacterStore()
const explorationStore = useExplorationStore()

const battleResult = ref(null)
const currentTurnIndex = ref(0)
const displayedLogs = ref<string[]>([])
const battleComplete = ref(false)
const currentTurn = ref<IBattleTurn | null>(null)

const heroHpPercentage = computed(() => {
  if (!currentTurn.value) return 100
  return (currentTurn.value.heroHp / currentTurn.value.heroMaxHp) * 100
})

const enemyHpPercentage = computed(() => {
  if (!currentTurn.value) return 100
  return (currentTurn.value.enemyHp / currentTurn.value.enemyMaxHp) * 100
})

watch(
  () => characterStore.battleState.isInBattle,
  (isInBattle) => {
    if (isInBattle) {
      startAutoBattle()
    } else {
      resetBattle()
    }
  },
  { immediate: true }
)

function startAutoBattle() {
  battleResult.value = characterStore.executeBattle()
  currentTurnIndex.value = 0
  displayedLogs.value = []
  battleComplete.value = false
  currentTurn.value = null
  
  if (battleResult.value) {
    processTurns()
  }
}

function processTurns() {
  if (!battleResult.value?.battleTurns) return
  
  const turns = battleResult.value.battleTurns
  
  const processNextTurn = () => {
    if (currentTurnIndex.value < turns.length) {
      const turn = turns[currentTurnIndex.value]
      currentTurn.value = turn
      displayedLogs.value.push(turn.message)
      currentTurnIndex.value++
      
      if (currentTurnIndex.value < turns.length) {
        setTimeout(processNextTurn, battleConfig.timing.turnDelay)
      } else {
        battleComplete.value = true
        setTimeout(closeBattle, battleConfig.timing.battleEndDelay)
      }
    }
  }
  
  processNextTurn()
}

function closeBattle() {
  const result = characterStore.battleState.battleResult
  const currentEncounter = explorationStore.currentExploration?.encounters
    ?.findLast(e => e.type === 'battle')
  
  if (result && currentEncounter) {
    explorationStore.completeBattle(result.isVictory, currentEncounter.id)
  }
  
  characterStore.closeBattle()
}

function resetBattle() {
  battleResult.value = null
  currentTurnIndex.value = 0
  displayedLogs.value = []
  battleComplete.value = false
  currentTurn.value = null
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>