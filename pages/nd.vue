<template>
  <div>
    <div class="fixed inset-0 bg-black" />
    <div class="relative w-screen h-screen flex justify-center items-center">
      <nd-panel :heading="heading" :tracking="heading" :course="course" />
      <input type="range" class="absolute bottom-0 left-0 w-full" min="-360" max="360" v-model="course" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { computed, onMounted, onUnmounted, ref } from 'vue'

export default Vue.extend({
  name: "NdPage",
  setup() {
    const fps = 50 // frames per second
    const resolution = .01 // degrees
    const turnRateLimit = 3 // degrees per second
    const turnRateOffset = .2 // degrees per second
    const turnSensitivity = .5 // any positive number

    const normalizeDegree = (degree: number) => {
      const d = degree % 360;
      return d < 0 ? d + 360 : d;
    }

    const course = ref(0)
    const heading = ref(0)
    const turnRate = computed(() => {
      let diff = normalizeDegree(course.value - heading.value)
      if (diff > 180) diff -= 360
      if (Math.abs(diff) < resolution) return 0
      return Math.min(turnRateLimit - turnRateOffset, Math.max(-turnRateLimit + turnRateOffset, diff * turnSensitivity)) + Math.sign(diff) * turnRateOffset;
    })

    const makeTurn = () => {
      let value = heading.value + turnRate.value / fps
      value = Math.round(value / resolution) * resolution
      heading.value = value
    }

    let timer: NodeJS.Timer
    onMounted(() => {
      timer = setInterval(makeTurn, 1000 / fps)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })

    return { course, heading }
  },
})
</script>
