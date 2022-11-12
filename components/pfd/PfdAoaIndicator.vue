<template>
  <div>
    <div class="w-16 h-16 rounded-full border border-2 border-white border-b-0 border-l-0" style="transform: rotate(45deg);">
      <div class="absolute w-16 h-16 flex justify-end items-center" style="transform: rotate(  45deg) translateX(8px);"><div class="w-2 h-1 bg-white"></div></div>
      <div class="absolute w-16 h-16 flex justify-end items-center" style="transform: rotate(   0deg) translateX(8px);"><div class="w-2 h-1 bg-white"></div></div>
      <div class="absolute w-16 h-16 flex justify-end items-center" style="transform: rotate( -45deg) translateX(8px);"><div class="w-2 h-1 bg-white"></div></div>
      <div class="absolute w-16 h-16 flex justify-end items-center" style="transform: rotate( -90deg) translateX(8px);"><div class="w-2 h-1 bg-white"></div></div>
      <div class="absolute w-16 h-16 flex justify-end items-center" style="transform: rotate(-135deg) translateX(8px);"><div class="w-2 h-1 bg-white"></div></div>
      <div class="absolute w-16 h-16 flex justify-end items-center" style="transform: rotate(-180deg) translateX(8px);"><div class="w-2 h-1 bg-white"></div></div>
      <div v-if="stabTrim !== undefined" class="absolute w-16 h-16 flex justify-end items-center" :style="{transform: `rotate(${trimRotate}deg)`}">
        <div class="absolute top-1/2 -right-5 -translate-y-1/2">◀</div>
      </div>
      <div class="absolute w-16 h-16 flex justify-end items-center" :style="{transform: `rotate(${aoaRotate}deg)`}"><div class="w-8 h-1 bg-white"></div></div>
    </div>
    <div class="absolute bottom-2 right-10 w-16 h-4 text-white text-sm text-right">{{ Number(aoa).toFixed(1) }}</div>
  </div>
</template>

<script lang="ts">
import Vue, { computed } from 'vue'

export default Vue.extend({
  name: 'PfdAoaIndicator',
  props: {
    aoa: {
      type: Number,
      required: true,
    },
    stabTrim: {
      type: Number,
    },
  },
  setup(props) {
    const aoaRotate = computed(() => -Math.min(21, Math.max(-6, props.aoa)) * 9)
    const trimRotate = computed(() => -props.stabTrim * 9)
    return { aoaRotate, trimRotate }
  },
})
</script>
