<template>
  <div>
    <div class="fixed inset-0 bg-black" />
    <div class="relative w-screen h-screen flex justify-center items-center">
      <pfd-panel :pitch="pitch" :bank="bank" :heading="heading" :ias="ias" :altitude="altitude" :vertical-speed="verticalSpeed" :course="course" />
      <input type="range" class="absolute bottom-72 left-0 w-full" min="-180" max="180" v-model="pitch" />
      <input type="range" class="absolute bottom-60 left-0 w-full" min="-180" max="180" v-model="bank" />
      <input type="range" class="absolute bottom-48 left-0 w-full" min="-360" max="360" v-model="heading" />
      <input type="range" class="absolute bottom-36 left-0 w-full" min="0" max="999" v-model="ias" />
      <input type="range" class="absolute bottom-24 left-0 w-full" min="0" max="99999" v-model="altitude" />
      <input type="range" class="absolute bottom-12 left-0 w-full" min="-6000" max="6000" v-model="verticalSpeed" />
      <input type="range" class="absolute bottom-0 left-0 w-full" min="-360" max="360" v-model="course" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { ref } from 'vue'

export default Vue.extend({
  name: "PfdPage",
  setup() {
    const pitch = ref(7)
    const bank = ref(12)
    const heading = ref(251)
    const ias = ref(240)
    const altitude = ref(7000)
    const verticalSpeed = ref(0)
    const course = ref(270)
    return { pitch, bank, heading, ias, altitude, verticalSpeed, course }
  },
})
</script>
