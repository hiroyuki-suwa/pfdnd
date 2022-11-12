<template>
  <div class="w-96 h-160 p-4 flex flex-col justify-start bg-slate-900">
    <div class="flex flex-col items-center">
      <div class="flex gap-16">
        <eicas-thrust-indicator :target="targetThrottleLeft" :throttle="throttleLeft" :thrust="N1Left" />
        <eicas-thrust-indicator :target="targetThrottleRight" :throttle="throttleRight" :thrust="N1Right" />
      </div>
      <div>N1</div>
      <div class="flex gap-16">
        <eicas-thrust-indicator :target="targetThrottleLeft" :throttle="throttleLeft" :thrust="N2Left" />
        <eicas-thrust-indicator :target="targetThrottleRight" :throttle="throttleRight" :thrust="N2Right" />
      </div>
      <div>N2</div>
    </div>
    <table class="mt-4 text-white">
      <tr><td>r = (x,y,z)</td><td>({{ Number(x).toFixed(0) }}m, {{ Number(y).toFixed(0) }}m, {{ Number(z).toFixed(0) }}m)</td></tr>
      <tr><td>v = dr/dt</td><td>({{ Number(Vx).toFixed(0) }}m/s, {{ Number(Vy).toFixed(0) }}m/s, {{ Number(Vz).toFixed(0) }}m/s)</td></tr>
      <tr><td>|v|</td><td>{{ Number(V).toFixed(2) }}m/s</td></tr>
      <tr><td>G-force</td><td>{{ Number(gForce).toFixed(2) }} G</td></tr>
      <tr><td>ias</td><td>{{ Number(ias).toFixed(0) }} kt</td></tr>
      <tr><td>GroundSpeed</td><td>{{ (Number(Vxy) * 3.6).toFixed(0) }} km/h</td></tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { injectUseStore } from '~/store'

export default Vue.extend({
  name: 'EicasPanel',
  setup() {
    const state = injectUseStore()
    return { ...state }
  },
})
</script>

<style scoped>
tr td:first-child {
  @apply text-left;
}
tr td:last-child {
  @apply text-right;
}
</style>
