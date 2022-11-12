<template>
  <div class="display-assy p-1 bg-gray-900 rounded-2xl border-4 border-t-stone-900 border-r-stone-800 border-b-stone-600 border-l-stone-800 shadowinset-a">
    <div class="p-8 pb-24 bg-stone-700 rounded-xl border border-[4px] border-b-stone-900 border-l-stone-800 border-t-stone-600 border-r-stone-800 shadowinset-b">
      <div class="relative p-6 text-white bg-black rounded-[40px] border-4 border-t-stone-900 border-r-stone-800 border-b-stone-600 border-l-stone-800 shadowinset-a">
        <div class="crt">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DisplayAssy',
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=B612+Mono&display=swap');

.display-assy {
  font-family: 'B612 Mono', monospace;
}

.shadowinset-a {
  box-shadow: 2px 4px 4px 0 rgba(255, 255, 255, 0.4);
}

.shadowinset-b {
  box-shadow: inset 2px 4px 4px 0 rgba(255, 255, 255, 0.4);
}

.crt::before {
  content: " ";
  display: block;
  position: absolute;
  top: 20px;
  left: 20px;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.06), rgba(0, 0, 255, 0.06));
  box-shadow: inset 0px 4px 8px 2px rgba(127, 0, 255, 0.2);
  z-index: 2;
  background-size: 100% 6px, 4px 100%;
  pointer-events: none;
  animation: scan .06s linear infinite;
}

.crt::after {
  content: " ";
  display: block;
  position: absolute;
  top: 20px;
  left: 20px;
  bottom: 20px;
  right: 20px;
  background: rgba(18, 16, 16, 0.1);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  animation: flicker .06s infinite;
}

@keyframes flicker {
  000% { opacity: .14; }
  005% { opacity: .15; }
  010% { opacity: .92; }
  015% { opacity: .65; }
  020% { opacity: .35; }
  025% { opacity: .89; }
  030% { opacity: .79; }
  035% { opacity: .32; }
  040% { opacity: .38; }
  045% { opacity: .46; }
  050% { opacity: .26; }
  055% { opacity: .43; }
  060% { opacity: .38; }
  065% { opacity: .32; }
  070% { opacity: .79; }
  075% { opacity: .50; }
  080% { opacity: .28; }
  085% { opacity: .84; }
  090% { opacity: .19; }
  095% { opacity: .71; }
  100% { opacity: .69; }
}

@keyframes scan {
  0% { transform: translateY(0); }
  100% { transform: translateY(6px); }
}
</style>
