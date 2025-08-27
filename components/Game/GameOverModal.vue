<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
  >
    <div class="bg-gray-900 border-2 border-red-500 rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-2xl">
      <div class="mb-6">
        <div class="text-6xl mb-4">💀</div>
        <h2 class="text-3xl font-bold text-red-500 mb-2">GAME OVER</h2>
        <p class="text-gray-300 mb-4">{{ characterName }} has fallen in battle...</p>
        
        <div class="bg-gray-800 border border-gray-700 rounded p-4 mb-6">
          <div class="text-sm text-gray-400 space-y-1">
            <div>Level Reached: <span class="text-white font-bold">{{ level }}</span></div>
            <div>XP Earned: <span class="text-yellow-400 font-bold">{{ totalXp }}</span></div>
            <div>Gold Earned: <span class="text-yellow-500 font-bold">{{ gold }}</span></div>
            <div>Time Survived: <span class="text-blue-400 font-bold">{{ survivalTime }}</span></div>
          </div>
        </div>
        
        <p class="text-gray-400 text-sm mb-6">
          Your character has permanently died. Create a new character to continue your adventure.
        </p>
      </div>
      
      <div class="space-y-3">
        <button
          class="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-bold"
          @click="createNewCharacter"
        >
          Create New Character
        </button>
        <button
          class="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          @click="backToMenu"
        >
          Back to Main Menu
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  characterName?: string
  level?: number
  totalXp?: number
  gold?: number
  survivalTime?: string
}

const props = withDefaults(defineProps<Props>(), {
  characterName: 'Unknown Hero',
  level: 1,
  totalXp: 0,
  gold: 0,
  survivalTime: '0 minutes'
})

const emit = defineEmits<{
  createNewCharacter: []
  backToMenu: []
}>()

function createNewCharacter() {
  emit('createNewCharacter')
}

function backToMenu() {
  emit('backToMenu')
}
</script>

<style scoped>
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
}
</style>