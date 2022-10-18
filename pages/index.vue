<template>
  <div>
    <div class="fixed inset-0 bg-stone-700" />
    <div class="relative w-screen h-screen flex justify-center items-center gap-10">
      <pfd-panel :pitch="pitch" :bank="bank" :heading="heading" :ias="ias" :alt="alt" :course="course" />
      <nd-panel :heading="heading" :course="course" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { ref } from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  setup() {
    const pitch = ref(7)
    const bank = ref(12)
    const heading = ref(251)
    const ias = ref(240)
    const alt = ref(7000)
    const course = ref(270)
    return { pitch, bank, heading, ias, alt, course }
  },
})
</script>
