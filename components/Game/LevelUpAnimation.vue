<template>
  <Teleport to="body">
    <div
      v-if="show"
      v-motion
      :initial="{ opacity: 0, scale: 0.5 }"
      :enter="{ 
        opacity: 1, 
        scale: 1,
        transition: { duration: 800, ease: 'backOut' }
      }"
      :leave="{ 
        opacity: 0, 
        scale: 0.8,
        transition: { duration: 500, ease: 'easeInOut' }
      }"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      @click="closeAnimation"
    >
      <div 
        class="relative text-center p-8 retro-container max-w-md mx-4"
        @click.stop
      >
        <div
          v-motion
          :initial="{ y: -50, opacity: 0 }"
          :enter="{
            y: 0,
            opacity: 1,
            transition: { delay: 200, duration: 600, ease: 'backOut' }
          }"
          class="mb-6"
        >
          <div class="text-6xl mb-4 animate-pulse">✨</div>
          <h2 class="retro-text text-2xl text-yellow-400 font-bold mb-2">
            LEVEL UP!
          </h2>
          <div class="text-lg text-white mb-4">
            {{ characterName }} reached level {{ newLevel }}!
          </div>
        </div>

        <div
          v-motion
          :initial="{ y: 50, opacity: 0 }"
          :enter="{
            y: 0,
            opacity: 1,
            transition: { delay: 400, duration: 600, ease: 'backOut' }
          }"
          class="space-y-3 mb-6"
        >
          <div class="text-sm text-gray-300 mb-4">STAT INCREASES:</div>
          
          <div
            v-for="(bonus, index) in statBonuses"
            :key="bonus.stat"
            v-motion
            :initial="{ x: -30, opacity: 0 }"
            :enter="{
              x: 0,
              opacity: 1,
              transition: { delay: 600 + (index * 150), duration: 400, ease: 'easeOut' }
            }"
            class="flex items-center justify-between bg-gray-800/50 px-4 py-2 rounded border border-gray-600"
          >
            <div class="flex items-center gap-2">
              <span class="text-lg">{{ bonus.icon }}</span>
              <span class="text-white font-mono">{{ bonus.stat.toUpperCase() }}</span>
            </div>
            <div class="text-green-400 font-bold">+{{ bonus.amount }}</div>
          </div>
        </div>

        <div
          v-motion
          :initial="{ scale: 0.8, opacity: 0 }"
          :enter="{
            scale: 1,
            opacity: 1,
            transition: { delay: 1200, duration: 400, ease: 'backOut' }
          }"
          class="space-y-3"
        >
          <div class="text-xs text-gray-400 mb-3">
            Click anywhere to continue
          </div>
          
          <div class="flex justify-center">
            <div
              class="w-16 h-1 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full"
              v-motion
              :initial="{ scaleX: 0 }"
              :enter="{
                scaleX: 1,
                transition: { delay: 1000, duration: 800, ease: 'easeInOut' }
              }"
            ></div>
          </div>
        </div>

        <div
          v-motion
          :initial="{ rotate: 0, scale: 1 }"
          :enter="{
            rotate: [0, 10, -10, 5, -5, 0],
            scale: [1, 1.1, 1],
            transition: { 
              delay: 300,
              duration: 1000,
              ease: 'easeInOut',
              repeat: 0
            }
          }"
          class="absolute -top-4 -right-4 text-3xl"
        >
          ⭐
        </div>
        
        <div
          v-motion
          :initial="{ rotate: 0, scale: 1 }"
          :enter="{
            rotate: [0, -10, 10, -5, 5, 0],
            scale: [1, 1.2, 1],
            transition: { 
              delay: 600,
              duration: 1200,
              ease: 'easeInOut',
              repeat: 0
            }
          }"
          class="absolute -top-6 -left-2 text-2xl"
        >
          ✨
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface StatBonus {
  stat: string
  amount: number
  icon: string
}

interface Props {
  show: boolean
  characterName: string
  newLevel: number
  statBonuses: readonly StatBonus[]
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

function closeAnimation() {
  emit('close')
}
</script>

<style scoped>
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
}

.retro-container {
  animation: glow 2s ease-in-out infinite;
}
</style>