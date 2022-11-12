<template>
  <div class="relative w-32 h-32 rounded-full border border-2 border-white border-t-0 border-r-0">
    <div class="absolute w-32 h-32 flex justify-end items-center" :style="{transform: `translateX(16px)`}">
      <div class="w-4 h-1 bg-white"></div>
    </div>
    <div class="absolute w-32 h-32 flex justify-end items-center" :style="{transform: `rotate(${min}deg) translateX(16px)`}">
      <div class="w-4 h-1 bg-white"></div>
    </div>
    <div class="absolute w-32 h-32 flex justify-end items-center" :style="{transform: `rotate(${std}deg) translateX(16px)`}">
      <div class="w-4 h-1 bg-yellow-400"></div>
    </div>
    <div class="absolute w-32 h-32 flex justify-end items-center" :style="{transform: `rotate(${max}deg) translateX(16px)`}">
      <div class="w-4 h-1 bg-red-500"></div>
    </div>
    <div class="absolute w-32 h-32 flex justify-end items-center" :style="{transform: `rotate(${tgt}deg) translateX(16px)`}">
      <div class="text-green-400 rotate-90">▼</div>
    </div>
    <div class="absolute w-32 h-32 flex justify-end items-center" :style="{transform: `rotate(${ttl}deg) translateX(16px)`}">
      <div class="text-white rotate-90">▽</div>
    </div>
    <div class="absolute w-32 h-32 flex justify-end items-center" :style="{transform: `rotate(${tst}deg)`}">
      <div class="w-16 h-1 bg-white"></div>
    </div>
    <div class="absolute bottom-1/2 right-0 w-16 text-center text-white border border-white">{{ (thrust * 100).toFixed(1) }}</div>
  </div>
</template>

<script lang="ts">
import Vue, { computed } from 'vue'
import { injectUseStore } from '~/store'

export default Vue.extend({
  name: 'EicasThrustIndicator',
  props: {
    target: {
      type: Number,
    },
    throttle: {
      type: Number,
    },
    thrust: {
      type: Number,
    },
  },
  setup(props) {
    const RANGE = 192
    const { MAX_POWER, MIN_POWER } = injectUseStore()
    const tgt = computed(() => {
      if (props.target === undefined) { return 0 }
      return (props.target * (MAX_POWER - MIN_POWER) + MIN_POWER ) * RANGE
    })
    const ttl = computed(() => {
      if (props.throttle === undefined) { return 0 }
      return (props.throttle * (MAX_POWER - MIN_POWER) + MIN_POWER ) * RANGE
    })
    const tst = computed(() => {
      if (props.thrust === undefined) { return 0 }
      return props.thrust * RANGE
    })
    const max = computed(() => {
      return MAX_POWER * RANGE
    })
    const std = computed(() => {
      return RANGE
    })
    const min = computed(() => {
      return MIN_POWER * RANGE
    })
    return { tgt, ttl, tst, max, std, min }
  },
})
</script>
