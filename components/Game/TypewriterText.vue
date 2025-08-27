<template>
  <span>{{ displayedText }}</span>
</template>

<script setup lang="ts">
interface Props {
  text: string
  speed?: number
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  speed: 50,
  delay: 0
})

const displayedText = ref('')

onMounted(() => {
  setTimeout(() => {
    typeText()
  }, props.delay)
})

function typeText() {
  let i = 0
  const typeTimer = setInterval(() => {
    displayedText.value = props.text.substring(0, i + 1)
    i++
    
    if (i >= props.text.length) {
      clearInterval(typeTimer)
    }
  }, props.speed)
}

watch(() => props.text, () => {
  displayedText.value = ''
  setTimeout(() => {
    typeText()
  }, props.delay)
})
</script>