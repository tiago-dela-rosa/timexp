<template>
  <div class="min-h-screen">
    <AppHeader v-if="showHeader" />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const showHeader = computed(() => {
  return route.name === 'game'
})
</script>