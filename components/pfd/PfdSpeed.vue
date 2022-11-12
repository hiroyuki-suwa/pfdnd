<template>
  <div class="relative h-120 w-24 text-white">
    <div class="absolute w-20 right-0 inset-y-0 bg-gray-600 overflow-hidden">
      <div class="relative w-20 flex flex-col-reverse" :style="{transform: `translateY(${offset}px)`}">
        <div v-for="tick in ticks" :key="tick" class="relative" :style="{ marginTop: `${gap}px` }">
          <template v-if="tick > 20">
            <div class="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-4 bg-white" />
            <div v-if="tick % 20 === 0" class="absolute right-6 top-1/2 -translate-y-1/2">
              <span class="text-lg">{{ tick }}</span>
            </div>
          </template>
        </div>
        <div v-if="commandedAirSpeed !== undefined" class="absolute -right-2 -translate-y-1/2 -rotate-90 scale-x-150 text-3xl text-pink-400" :style="{top: `${tagOffset}px`, fontFamily: 'sans'}">M</div>
      </div>
    </div>
    <div v-if="commandedAirSpeed !== undefined" class="absolute right-0 -top-10 text-pink-400">
      <span class="inline-block w-20 text-2xl text-right">{{ cmdIas }}</span>
    </div>
    <div class="absolute right-4 top-1/2 -translate-y-1/2 w-20 py-2 text-3xl bg-slate-900 text-center border border-white">{{ ias }}</div>
    <div v-if="groundSpeed !== undefined" class="absolute right-0 -bottom-10 text-white">
      <span class="inline-block w-6 text-lg">GS</span>
      <span class="inline-block w-10 text-2xl text-right">{{ gs }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { computed } from 'vue'

export default Vue.extend({
  name: 'PfdSpeed',
  props: {
    airSpeed: {
      type: Number,
      required: true,
    },
    groundSpeed: {
      type: Number,
    },
    commandedAirSpeed: {
      type: Number,
    },
  },
  setup(props) {
    const MAX = 1000
    const MIN = 45
    const GAP = 10
    const SCALE = 4
    const airSpeed = computed(() => Math.min(MAX - 1, Math.max(45, props.airSpeed)))
    const ias = computed(() => ('000' + Math.round(airSpeed.value)).slice(-3))
    const gs = computed(() => props.groundSpeed && Math.round(props.groundSpeed))
    const cmdIas = computed(() => props.commandedAirSpeed && Math.round(props.commandedAirSpeed))
    const ticks = Array.from({ length: MAX/GAP }, (_, i) => i * GAP)
    const offset = computed(() => (airSpeed.value - MAX) * SCALE + 240)
    const tagOffset = computed(() => (MAX - cmdIas.value) * SCALE)
    return { ias, gs, cmdIas, ticks, offset, tagOffset, GAP, SCALE, gap: GAP * SCALE }
  }
})
</script>
