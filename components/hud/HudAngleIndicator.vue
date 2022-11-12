<template>
  <div class="relative w-32 h-32 rounded-full border border-2 border-white" :style="{transform: `rotate(${offset}deg)`}">
    <div v-if="beta !== undefined" class="absolute w-32 h-32 flex justify-center items-center" :style="{transform: `rotate(${beta}deg)`}">
      <div class="w-1 h-32 bg-yellow-400"></div>
    </div>
    <div class="absolute w-32 h-32 flex justify-center items-center" :style="{transform: `rotate(${alpha}deg)`}">
      <div class="text-white text-7xl">{{ symbol }}</div>
    </div>
    <div class="absolute -top-6 left-1/2 -translate-x-1/2 text-white">▼</div>
    <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white">△</div>
    <div class="absolute -left-6 top-1/2 -translate-y-1/2 text-white">▷</div>
    <div class="absolute -right-6 top-1/2 -translate-y-1/2 text-white">◁</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'InstrumentAngleIndicator',
  props: {
    alpha: {
      type: Number,
      default: 0,
    },
    beta: {
      type: Number,
    },
    offset: {
      type: Number,
      default: 0,
    },
    symbol: {
      type: String,
      default: '↑',
    },
  }
})
</script>
