<template>
  <div class="p-4 text-emerald-500 bg-black">
    <div class="hud flex flex-col md:flex-row items-center justify-center gap-20">
      <div class="flex items-center gap-10">
        <hud-angle-indicator :alpha="bank" symbol="亠" />
        <div class="w-64 overflow-hidden">
          <table>
            <tr><td>bank</td><td>{{ Number(bank).toFixed(2) }}</td></tr>
          </table>
        </div>
      </div>
      <div class="flex items-center gap-10">
        <hud-angle-indicator :alpha="pitch" :beta="glide" :offset="-90" symbol="✝" />
        <div class="w-64 overflow-hidden">
          <table class="w-64">
            <tr><td>pitch</td><td>{{ Number(pitch).toFixed(2) }}</td></tr>
            <tr><td>glide</td><td>{{ Number(glide).toFixed(2) }}</td></tr>
            <tr><td>aoa</td><td>{{ Number(aoa).toFixed(2) }}</td></tr>
          </table>
        </div>
      </div>
      <div class="flex items-center gap-10">
        <hud-angle-indicator :alpha="heading" :beta="tracking" symbol="✝" />
        <div class="w-64 overflow-hidden">
          <table class="w-64">
            <tr><td>heading</td><td>{{ Number(heading).toFixed(2) }}</td></tr>
            <tr><td>tracking</td><td>{{ Number(tracking).toFixed(2) }}</td></tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { injectUseStore } from '~/store'

export default Vue.extend({
  name: 'ConsoleScreen',
  setup() {
    const state = injectUseStore()
    return { ...state }
  },
})
</script>

<style scoped>
td {
  padding-right: 1em;
}

.hud {
  transform: scale(.6);
}

@screen sm {
  .hud  {
    transform: scale(.6);
  }
}

@screen md {
  .hud  {
    transform: scale(.4);
  }
}

@screen lg {
  .hud  {
    transform: scale(.6);
  }
}

@screen xl {
  .hud  {
    transform: scale(.8);
  }
}
</style>
