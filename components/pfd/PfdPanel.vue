<template>
  <div class="w-160 h-160 flex flex-col justify-end items-center text-white bg-slate-900">
    <div class="w-full mb-16 flex justify-center items-center gap-8">
      <pfd-speed :air-speed="ias" :ground-speed="groundSpeed" :commanded-air-speed="commandedAirSpeed" />
      <div class="relative flex flex-col justify-end items-center">
        <pfd-horizon :pitch="pitch" :bank="bank" />
        <div class="absolute -bottom-36 w-full h-28 flex flex-col justify-start items-center overflow-hidden">
          <span class="text-3xl text-white transform translate-y-1">▽</span>
          <pfd-navigation :course="course" :heading="heading" :size="400" />
        </div>
        <pfd-aoa-indicator class="absolute -top-24 right-4" :aoa="aoa" :stab-trim="stabTrim" />
      </div>
      <pfd-altitude :altitude="altitude" :vertical-speed="verticalSpeed" :commanded-altitude="commandedAltitude" :inchHg="inchHg" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PfdPanel',
  props: {
    pitch: {
      type: Number,
      required: true,
    },
    bank: {
      type: Number,
      required: true,
    },
    heading: {
      type: Number,
      required: true,
    },
    ias: {
      type: Number,
      required: true,
    },
    groundSpeed: {
      type: Number,
    },
    altitude: {
      type: Number,
      required: true,
    },
    verticalSpeed: {
      type: Number,
      required: true,
    },
    commandedAirSpeed: {
      type: Number,
    },
    commandedAltitude: {
      type: Number,
    },
    course: {
      type: Number,
    },
    aoa: {
      type: Number,
    },
    stabTrim: {
      type: Number,
    },
    inchHg: {
      type: Number,
    },
  },
})
</script>
