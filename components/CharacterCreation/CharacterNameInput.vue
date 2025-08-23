<template>
  <div>
    <label class="retro-text block mb-2 flex items-center gap-2">
      <span>⚔️</span>
      CHARACTER NAME:
    </label>
    <input 
      v-model="localName" 
      type="text" 
      placeholder="◆ Enter your hero's name..."
      class="retro-input w-full"
      maxlength="20"
      @input="updateName"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localName = ref(props.modelValue)

function updateName() {
  emit('update:modelValue', localName.value)
}

watch(() => props.modelValue, (newValue) => {
  localName.value = newValue
})
</script>