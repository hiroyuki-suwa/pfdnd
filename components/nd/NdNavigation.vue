<template>
  <div class="text-white">
    <div class="relative text-white border-2 border-white rounded-full"
      :style="{transform: `rotate(${-heading}deg)`, height: `${size}px`, width: `${size}px`}">
      <div class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3/4 h-3/4 border-2 border-dashed border-white rounded-full" />
      <div class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1/2 h-1/2 border-2 border-dashed border-white rounded-full" />
      <div class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1/4 h-1/4 border-2 border-dashed border-white rounded-full" />
      <div v-for="(tick) in ticks" :key="tick.value" class="absolute top-0 left-1/2 w-0 h-full" :style="{transform: `rotate(${tick.value}deg)`}">
        <div class="absolute top-0 w-0.5 transform -translate-x-1/2 bg-white" :style="{height: tick.major ? '2%' : '1%'}" />
        <div v-if="tick.label" class="absolute left-1/2 transform -translate-x-1/2 text-white" :style="{top: '2%', fontSize: `${size/56}px`}">{{ tick.label }}</div>
      </div>
      <div v-if="course !== undefined" class="absolute top-0 left-1/2 w-0 h-full" :style="{transform: `rotate(${course}deg)`}">
        <div class="absolute left-1/2 transform -translate-x-1/2 scale-x-150 text-pink-400" :style="{top: '-1.25em', fontFamily: 'sans', fontSize: `${size/40}px`}">M</div>
        <div class="absolute left-1/2 transform -translate-x-1/2 w-3/4 border border-dashed border-pink-400" :style="`height: ${size/2}px;`" />
      </div>
      <div v-if="tracking !== undefined" class="absolute top-0 left-1/2 w-0 h-full" :style="{transform: `rotate(${tracking}deg)`}">
        <div class="absolute left-1/2 transform -translate-x-1/2 w-3/4 border border border-white" :style="`height: ${size/2}px;`" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NdNavigation',
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
    size: {
      type: Number,
      default: 640,
    },
  },
  setup() {
    const ticks = [
      { value: 5 },
      { value: 10, major: true },
      { value: 15 },
      { value: 20, major: true },
      { value: 25 },
      { value: 30, major: true, label: '3' },
      { value: 35 },
      { value: 40, major: true },
      { value: 45 },
      { value: 50, major: true },
      { value: 55 },
      { value: 60, major: true, label: '6' },
      { value: 65 },
      { value: 70, major: true },
      { value: 75 },
      { value: 80, major: true },
      { value: 85 },
      { value: 90, major: true, label: '9' },
      { value: 95 },
      { value: 100, major: true },
      { value: 105 },
      { value: 110, major: true },
      { value: 115 },
      { value: 120, major: true, label: '12' },
      { value: 125 },
      { value: 130, major: true },
      { value: 135 },
      { value: 140, major: true },
      { value: 145 },
      { value: 150, major: true, label: '15' },
      { value: 155 },
      { value: 160, major: true },
      { value: 165 },
      { value: 170, major: true },
      { value: 175 },
      { value: 180, major: true, label: '18' },
      { value: 185 },
      { value: 190, major: true },
      { value: 195 },
      { value: 200, major: true },
      { value: 205 },
      { value: 210, major: true, label: '21' },
      { value: 215 },
      { value: 220, major: true },
      { value: 225 },
      { value: 230, major: true },
      { value: 235 },
      { value: 240, major: true, label: '24' },
      { value: 245 },
      { value: 250, major: true },
      { value: 255 },
      { value: 260, major: true },
      { value: 265 },
      { value: 270, major: true, label: '27' },
      { value: 275 },
      { value: 280, major: true },
      { value: 285 },
      { value: 290, major: true },
      { value: 295 },
      { value: 300, major: true, label: '30' },
      { value: 305 },
      { value: 310, major: true },
      { value: 315 },
      { value: 320, major: true },
      { value: 325 },
      { value: 330, major: true, label: '33' },
      { value: 335 },
      { value: 340, major: true },
      { value: 345 },
      { value: 350, major: true },
      { value: 355 },
      { value: 360, major: true, label: '36' },
    ]
    return { ticks }
  },
})
</script>
