<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="retro-container max-w-4xl w-full">
      <h1 class="retro-title text-center">CREATE CHARACTER</h1>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <CharacterNameInput v-model="characterName" />
          <ClassSelection v-model="selectedClass" />
          
          <button 
            :disabled="!canCreate"
            class="retro-button w-full py-3 text-lg flex items-center justify-center gap-2"
            @click="createCharacter"
          >
            <span>{{ getActionIcon('create') }}</span>
            CREATE CHARACTER
          </button>
          
          <button 
            class="retro-button w-full flex items-center justify-center gap-2"
            @click="goBack"
          >
            <span>{{ getActionIcon('back') }}</span>
            BACK TO MENU
          </button>
        </div>
        
        <CharacterPreview 
          :character-name="characterName"
          :selected-class-data="selectedClassData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterNameInput from '~/components/CharacterCreation/CharacterNameInput.vue'
import ClassSelection from '~/components/CharacterCreation/ClassSelection.vue'
import CharacterPreview from '~/components/CharacterCreation/CharacterPreview.vue'
import { useCharacterStore } from '~/stores/character'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { navigateTo } from '#app'
import { ASCII_ICONS } from '~/utils/ascii-icons'

const characterName = ref('')
const selectedClass = ref('')

const characterStore = useCharacterStore()
const { characterClasses } = storeToRefs(characterStore)

const selectedClassData = computed(() => {
  return characterClasses.value.find(c => c.name === selectedClass.value) || null
})

const canCreate = computed(() => {
  return characterName.value.trim().length > 0 && selectedClass.value
})

function createCharacter() {
  if (!canCreate.value) return
  
  const success = characterStore.createCharacter(characterName.value, selectedClass.value)
  if (success) {
    navigateTo('/game')
  }
}

function getActionIcon(action: string): string {
  return ASCII_ICONS.ACTIONS[action as keyof typeof ASCII_ICONS.ACTIONS] || ''
}

function goBack() {
  navigateTo('/')
}
</script>