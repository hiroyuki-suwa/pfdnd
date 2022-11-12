<template>
  <div class="relative h-120 w-36 text-white">
    <pfd-vertical-speed class="absolute right-0 inset-y-0" :vertical-speed="verticalSpeed"/>
    <div class="absolute w-20 left-0 inset-y-0 bg-gray-600 overflow-hidden">
      <div class="w-20 flex flex-col-reverse" :style="{transform: `translateY(${offset}px)`}">
        <div v-for="tick in ticks" :key="tick" class="relative" :style="{ marginTop: `${gap}px` }">
          <div v-if="tick === 0" class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-2 bg-white" />
          <div v-else class="absolute left-0 top-1/2 -translate-y-1/2 w-4 bg-white" :class="tick % 500 === 0 ? 'h-2' : 'h-1'" />
          <div v-if="tick % 200 === 0" class="absolute left-6 top-1/2 -translate-y-1/2 flex items-center">
            <template v-if="tick < 1000">
              <span class="text-md">{{ tick }}</span>
            </template>
            <template v-else>
              <span class="text-xl">{{ Math.floor(tick/1000) }}</span><span class="text-sm">{{ tick % 1000 || '000' }}</span>
            </template>
          </div>
        </div>
        <div v-if="commandedAltitude !== undefined" class="absolute -left-2 -translate-y-1/2 rotate-90 scale-x-150 text-3xl text-pink-400" :style="{top: `${tagOffset}px`, fontFamily: 'sans'}">M</div>
      </div>
    </div>
    <div v-if="commandedAltitude !== undefined" class="absolute left-0 -top-10 text-pink-400">
      <span class="inline-block w-20 text-2xl text-right">{{ cmdAlt }}</span>
    </div>
    <div class="absolute left-4 top-1/2 -translate-y-1/2 w-24 py-2 bg-slate-900 border border-white flex justify-center items-center">
      <span class="text-3xl">{{ alt1000 }}</span>
      <span class="text-xl">{{ alt10 }}</span>
    </div>
    <div v-if="inchHg !== undefined" class="absolute left-0 -bottom-10 text-green-400">
      <span class="inline-block w-20 text-2xl text-right">{{ inHg }}</span>
      <span class="inline-block w-6 text-lg">IN.</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { computed } from 'vue'

export default Vue.extend({
  name: 'PfdAltitude',
  props: {
    altitude: {
      type: Number,
      required: true,
    },
    verticalSpeed: {
      type: Number,
      required: true,
    },
    commandedAltitude: {
      type: Number,
    },
    inchHg: {
      type: Number,
    },
  },
  setup: (props) => {
    const MAX = 100000
    const GAP = 100
    const SCALE = 0.4
    const altitude = computed(() => Math.max(-MAX+1, Math.min(MAX-1, props.altitude)))
    const alt1000 = computed(() => ('00' + Math.floor(Math.abs(altitude.value) / 1000)).slice(-2))
    const alt10 = computed(() => ('000' + Math.floor(Math.abs(altitude.value) / 10) % 100 * 10).slice(-3))
    const cmdAlt = computed(() => props.commandedAltitude && Math.round(props.commandedAltitude))
    const inHg = computed(() => props.inchHg?.toFixed(2))
    const ticks = Array.from({ length: 2 * MAX/GAP }, (_, i) => i * GAP - MAX)
    const offset = computed(() => (altitude.value - MAX) * SCALE + 240)
    const tagOffset = computed(() => (MAX - cmdAlt.value) * SCALE)
    return { alt1000, alt10, cmdAlt, inHg, ticks, offset, tagOffset, gap: GAP * SCALE }
  },
})
</script>
