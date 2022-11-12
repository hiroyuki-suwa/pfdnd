<template>
  <div class="overflow-hidden">
    <div class="h-120 w-16 translate-x-4">
      <div class="w-0 h-80 absolute top-1/2 -translate-y-1/2 border-y-slate-900 border-l-gray-600" style="border-left-width:64px; border-right-width:0; border-top-width:240px; border-bottom-width:240px;" />
      <div class="absolute w-16 right-0 inset-y-0 overflow-hidden">
        <div class="absolute top-0 -left-44 h-120 w-120" :style="{transform: `rotate(${vsRotation}deg)`}">
          <div class="absolute top-1/2 -left-1/2 w-120 h-1 bg-white" />
        </div>
      </div>
    </div>
    <div class="absolute inset-x-0 top-0 h-20 bg-slate-900" />
    <div class="absolute w-10 h-20 left-1 top-1/2 -translate-y-1/2 bg-slate-900" />
    <div class="absolute inset-x-0 bottom-0 h-20 bg-slate-900" />
    <div v-if="verticalSpeed > 0" class="absolute top-10 right-0 text-sm background-slate-900">{{ verticalSpeed }}</div>
    <div v-if="verticalSpeed < 0" class="absolute bottom-10 right-0 text-sm background-slate-900">{{ -verticalSpeed }}</div>
  </div>
</template>

<script lang="ts">
import Vue, { computed } from 'vue'

export default Vue.extend({
  name: 'PfdVerticalSpeed',
  props: {
    verticalSpeed: {
      type: Number,
      required: true,
    },
  },
  setup: (props) => {
    const verticalSpeed = computed(() => Math.max(-99999, Math.min(99999, Math.round(props.verticalSpeed))))
    const vsRotation = computed(() => {
      const MAX_VS = 6000
      const MAX_DEG = 75
      const MIDDLE_VS = 1000
      const vs = Math.min(MAX_VS, Math.max(-MAX_VS, props.verticalSpeed))
      return Math.atan(vs/MIDDLE_VS) / (Math.atan(MAX_VS/MIDDLE_VS)) * MAX_DEG
    })
    return { verticalSpeed, vsRotation }
  },
})
</script>
