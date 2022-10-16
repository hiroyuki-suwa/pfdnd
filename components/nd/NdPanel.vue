<template>
  <div class="p-4 bg-black rounded-2xl border-4 border-t-stone-900 border-r-stone-800 border-b-stone-600 border-l-stone-800">
    <div class="w-160 h-160 flex flex-col justify-center">
      <div class="flex flex-col justify-center items-center">
        <div class="w-24 text-3xl text-white text-center border-x border-b border-white">{{ hdg }}</div>
      </div>
      <div class="w-full h-120 -mt-2 flex flex-col justify-start items-center overflow-hidden">
        <span class="text-3xl text-white transform translate-y-1">▽</span>
        <nd-navigation :heading="heading" :course="course" :size="960" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { computed } from 'vue'
import NdNavigation from '~/components/nd/NdNavigation.vue';

export default Vue.extend({
  name: 'NdPanel',
  components: { NdNavigation },
  props: {
    heading: {
      type: Number,
      default: 0,
    },
    course: {
      type: Number,
      default: 0,
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
