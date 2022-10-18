<template>
  <div class="p-4 bg-black rounded-2xl border-4 border-t-stone-900 border-r-stone-800 border-b-stone-600 border-l-stone-800">
    <div class="w-160 h-160 flex flex-col justify-center">
      <div class="w-full flex justify-center items-center gap-4 overflow-hidden">
        <pfd-speed :ias="ias" />
        <pfd-horizon :pitch="pitch" :bank="bank" />
        <pfd-altitude :alt="alt" />
      </div>
      <div class="w-full h-32 flex flex-col justify-start items-center overflow-hidden">
        <span class="text-3xl text-white transform translate-y-1">▽</span>
        <pfd-navigation :course="course" :heading="heading"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PfdSpeed from '~/components/pfd/PfdSpeed.vue';
import PfdHorizon from '~/components/pfd/PfdHorizon.vue';
import PfdAltitude from '~/components/pfd/PfdAltitude.vue';
import PfdNavigation from '~/components/pfd/PfdNavigation.vue';

export default Vue.extend({
  name: 'PfdPanel',
  components: { PfdSpeed, PfdHorizon, PfdAltitude, PfdNavigation },
  props: {
    pitch: {
      type: Number,
      default: 0,
    },
    bank: {
      type: Number,
      default: 0,
    },
    heading: {
      type: Number,
      default: 0,
    },
    ias: {
      type: Number,
      default: 0,
    },
    alt: {
      type: Number,
      default: 0,
    },
    course: {
      type: Number,
      default: 0,
    },
  },
})
</script>
