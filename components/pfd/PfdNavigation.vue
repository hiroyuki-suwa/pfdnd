<template>
  <div class="text-white">
    <div class="relative text-white bg-gray-600 rounded-full"
      :style="{transform: `rotate(${-heading}deg)`, height: `${size}px`, width: `${size}px`}">
      <div v-for="(tick) in ticks" :key="tick.value" class="absolute top-0 left-1/2 w-0 h-full" :style="{transform: `rotate(${tick.value}deg)`}">
        <div class="absolute top-0 w-0.5 transform -translate-x-1/2 bg-white" :style="{height: tick.major ? '4%' : '2%'}" />
        <div v-if="tick.label" class="absolute left-1/2 transform -translate-x-1/2 text-white text-lg" :style="{top: '4%', fontSize: tick.large ? `${size/32}` : `${size/40}px`}">{{ tick.label }}</div>
      </div>
      <div v-if="course !== undefined" class="absolute top-0 left-1/2 w-0 h-full" :style="{transform: `rotate(${course}deg)`}">
        <div class="absolute left-1/2 transform -translate-x-1/2 scale-x-150 text-pink-400 text-2xl" :style="{top: '-1em', fontFamily: 'sans', fontSize: `${size/18}px`}">M</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PfdHorizon',
  props: {
    heading: {
      type: Number,
      required: true,
    },
    course: {
      type: Number,
    },
    size: {
      type: Number,
      default: 480,
    },
  },
  setup() {
    const ticks = [
      { value: 5 },
      { value: 10, major: true, label: '1' },
      { value: 15 },
      { value: 20, major: true, label: '2' },
      { value: 25 },
      { value: 30, major: true, label: '3', large: true },
      { value: 35 },
      { value: 40, major: true, label: '4' },
      { value: 45 },
      { value: 50, major: true, label: '5' },
      { value: 55 },
      { value: 60, major: true, label: '6', large: true },
      { value: 65 },
      { value: 70, major: true, label: '7' },
      { value: 75 },
      { value: 80, major: true, label: '8' },
      { value: 85 },
      { value: 90, major: true, label: '9', large: true },
      { value: 95 },
      { value: 100, major: true, label: '10' },
      { value: 105 },
      { value: 110, major: true, label: '11' },
      { value: 115 },
      { value: 120, major: true, label: '12', large: true },
      { value: 125 },
      { value: 130, major: true, label: '13' },
      { value: 135 },
      { value: 140, major: true, label: '14' },
      { value: 145 },
      { value: 150, major: true, label: '15', large: true },
      { value: 155 },
      { value: 160, major: true, label: '16' },
      { value: 165 },
      { value: 170, major: true, label: '17' },
      { value: 175 },
      { value: 180, major: true, label: '18', large: true },
      { value: 185 },
      { value: 190, major: true, label: '19' },
      { value: 195 },
      { value: 200, major: true, label: '20' },
      { value: 205 },
      { value: 210, major: true, label: '21', large: true },
      { value: 215 },
      { value: 220, major: true, label: '22' },
      { value: 225 },
      { value: 230, major: true, label: '23' },
      { value: 235 },
      { value: 240, major: true, label: '24', large: true },
      { value: 245 },
      { value: 250, major: true, label: '25' },
      { value: 255 },
      { value: 260, major: true, label: '26' },
      { value: 265 },
      { value: 270, major: true, label: '27', large: true },
      { value: 275 },
      { value: 280, major: true, label: '28' },
      { value: 285 },
      { value: 290, major: true, label: '29' },
      { value: 295 },
      { value: 300, major: true, label: '30', large: true },
      { value: 305 },
      { value: 310, major: true, label: '31' },
      { value: 315 },
      { value: 320, major: true, label: '32' },
      { value: 325 },
      { value: 330, major: true, label: '33', large: true },
      { value: 335 },
      { value: 340, major: true, label: '34' },
      { value: 345 },
      { value: 350, major: true, label: '35' },
      { value: 355 },
      { value: 360, major: true, label: '36', large: true },
    ]
    return { ticks }
  },
})
</script>
