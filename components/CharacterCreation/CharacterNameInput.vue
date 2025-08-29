<template>
  <div>
    <label class="retro-text block mb-2 flex items-center gap-2">
      <span>⚔️</span>
      CHARACTER NAME:
    </label>
    <div class="flex gap-2">
      <input 
        v-model="localName" 
        type="text" 
        placeholder="◆ Enter your hero's name..."
        class="retro-input flex-1"
        maxlength="20"
        @input="updateName"
      >
      <button
        @click="generateRandomName"
        :disabled="isGenerating"
        class="retro-button px-3 py-1 text-sm"
        type="button"
      >
        {{ isGenerating ? '⏳' : '🎲' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
  characterClass?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localName = ref(props.modelValue)
const isGenerating = ref(false)

function updateName() {
  emit('update:modelValue', localName.value)
}

async function generateRandomName() {
  isGenerating.value = true
  
  try {
    
    const response = await $fetch('/api/generateName', {
      method: "POST",
      body: {
        characterClass: props.characterClass,
      }
    })
    
    localName.value = response.name || ''
    updateName()
  } catch (error) {
    console.error('Error generating random name:', error)
  } finally {
    isGenerating.value = false
  }
}

watch(() => props.modelValue, (newValue) => {
  localName.value = newValue
})
</script>