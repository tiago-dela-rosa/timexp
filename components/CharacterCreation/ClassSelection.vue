<template>
  <div>
    <label class="retro-text block mb-4">SELECT CLASS:</label>
    <div class="space-y-3">
      <div 
        v-for="characterClass in characterStore.characterClasses" 
        :key="characterClass.name"
        class="retro-card"
        :class="{ selected: selectedClass === characterClass.name }"
        @click="selectClass(characterClass.name)"
      >
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-bold text-lg flex items-center gap-2">
              <span class="text-2xl">{{ getClassIcon(characterClass.name) }}</span>
              {{ characterClass.name.toUpperCase() }}
            </h3>
            <p class="text-sm opacity-75">{{ characterClass.description }}</p>
          </div>
          <div class="text-right text-sm">
            <div>{{ getStatIcon('hp') }} {{ characterClass.stats.hp }}</div>
            <div>{{ getStatIcon('mp') }} {{ characterClass.stats.mp }}</div>
            <div>{{ getStatIcon('attack') }} {{ characterClass.stats.attack }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/character'
import { ref, watch } from 'vue'
import { getClassIcon, getStatIcon } from '~/utils/ascii-icons'

interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const characterStore = useCharacterStore()

const selectedClass = ref(props.modelValue)

function selectClass(className: string) {
  selectedClass.value = className
  emit('update:modelValue', className)
}

watch(() => props.modelValue, (newValue) => {
  selectedClass.value = newValue
})
</script>