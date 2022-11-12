<template>
  <div class="relative rounded-3xl overflow-hidden" :style="{ width: `${width}px`, height: `${height}px` }">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
      <div :style="{ transform: `rotate(${-bank}deg)` }">
        <div :style="{ transform: `translateY(${pitch * height / 50}px)` }">
          <div class="relative bg-blue-500 border-b border-white" :style="{ width: `${diagonal}px`, height: `${height * 180/50}px` }">
            <template v-for="i in 36">
              <div v-if="i" class="absolute left-1/2 transform -translate-x-1/2 h-0 flex items-center gap-1" :style="{ bottom: `${i * height / 20}px` }">
                <span v-if="i%4===0">{{ i * 2.5 }}</span>
                <div class="h-0.5 bg-white" :style="{width: `${width / (i%4 ? (i%2 ? 8 : 4) : 2)}px` }" />
                <span v-if="i%4===0">{{ i * 2.5 }}</span>
              </div>
            </template>
          </div>
          <div class="relative bg-yellow-700 border-t border-white" :style="{ width: `${diagonal}px`, height: `${height * 180/50}px` }">
            <template v-for="i in 36">
              <div v-if="i" class="absolute left-1/2 transform -translate-x-1/2 h-0 flex items-center gap-1" :style="{ top: `${i * height / 20}px` }">
                <span v-if="i%4===0">{{ i * 2.5 }}</span>
                <div class="h-0.5 bg-white" :style="{width: `${width / (i%4 ? (i%2 ? 8 : 4) : 2)}px` }" />
                <span v-if="i%4===0">{{ i * 2.5 }}</span>
              </div>
            </template>
          </div>
        </div>
        <span class="absolute top-0 left-1/2 transform text-3xl font-bold" :style="{ transform: `translate(-50%, ${height * 156/50}px)` }">△</span>
      </div>
    </div>
    <div class="absolute inset-x-0 w-full h-full">
      <div class="absolute inset-x-0 w-full h-full">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl font-bold">▼</div>
      </div>
      <div v-for="tick in bankTicks" class="absolute inset-x-0 w-full h-full" :style="{ transform: `rotate(+${tick.value}deg)` }">
        <div v-if="tick.major" class="absolute w-1 h-8 bg-white left-1/2 -translate-x-1/2 -top-4" />
        <div v-else class="absolute w-1 h-4 bg-white left-1/2 -translate-x-1/2 top-0" />
      </div>
      <div v-for="tick in bankTicks" class="absolute inset-x-0 w-full h-full" :style="{ transform: `rotate(-${tick.value}deg)` }">
        <div v-if="tick.major" class="absolute w-1 h-8 bg-white left-1/2 -translate-x-1/2 -top-4" />
        <div v-else class="absolute w-1 h-4 bg-white left-1/2 -translate-x-1/2 top-0" />
      </div>
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-8 text-black text-4xl font-bold" style="text-shadow: 2px 2px 0 white, 2px -2px 0 white, -2px 2px 0 white, -2px -2px 0 white;">
      <span>━┓</span><span>・</span><span>┏━</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { computed } from 'vue'

export default Vue.extend({
  name: 'PfdHorizon',
  props: {
    pitch: {
      type: Number,
      required: true,
    },
    bank: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      default: 320,
    },
    height: {
      type: Number,
      default: 320,
    },
  },
  setup(props) {
    const diagonal = computed(() => Math.sqrt(props.width ** 2 + props.height ** 2))
    const bankTicks = [
      { value: 10 },
      { value: 20 },
      { value: 30, major: true },
      { value: 45 },
      { value: 60, major: true },
    ]
    const pitch = computed(() => {
      let pitch = Number(props.pitch) % 360
      if (pitch < 0) pitch += 360
      const quadrant = Math.floor(pitch / 90) % 4
      switch (quadrant) {
        case 0:
          return pitch
        case 1:
          return 90 - pitch % 90
        case 2:
          return -pitch % 90
        case 3:
          return -90 + pitch % 90
      }
    })
    const bank = computed(() => {
      let pitch = Number(props.pitch) % 360
      if (pitch < 0) pitch += 360
      const quadrant = Math.floor(pitch / 90) % 4
      let bank = Number(props.bank)
      if (quadrant === 1 || quadrant === 2) bank += 180
      bank %= 360
      if (bank > 180) bank -= 360
      return bank
    })
    return { diagonal, bankTicks, pitch, bank }
  },
})
</script>
