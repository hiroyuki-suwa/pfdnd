<template>
  <div class="w-160 h-160 flex flex-col justify-start items-center bg-slate-900">
    <div class="flex justify-center items-center">
      <div class="mx-4 text-2xl text-green-400">HDG</div>
      <div class="w-24 text-2xl text-white text-center border-x border-b border-white">{{ hdg }}</div>
      <div class="mx-4 text-2xl text-green-400">MAG</div>
    </div>
    <div class="relative w-full h-140 -mt-2 flex flex-col justify-start items-center overflow-hidden">
      <span class="text-3xl text-white transform translate-y-1">▽</span>
      <nd-navigation :heading="heading" :tracking="tracking" :course="course" :size="960" />
      <div class="absolute top-128 text-white text-xl scale-y-150">△</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { computed } from 'vue'

export default Vue.extend({
  name: 'NdPanel',
  props: {
    heading: {
      type: Number,
      required: true,
    },
    tracking: {
      type: Number,
    },
    course: {
      type: Number,
    },
  },
  setup(props) {
    const normalizeDegree = (degree: number) => {
      const d = degree % 360;
      return d < 0 ? d + 360 : d;
    }

    const hdg = computed(() => Math.round(normalizeDegree(props.heading)))

    return { hdg }
  }
})
</script>
