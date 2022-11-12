<template>
  <div class="flex flex-col items-center gap-20">
    <input type="range" v-model="aileron" min="-1" max="1" step="0.01" />
    <input type="range" v-model="elevator" min="-1" max="1" step="0.01" class="rotate-90" />
    <input type="range" v-model="rudder" min="-1" max="1" step="0.01" />
  </div>
</template>

<script lang="ts">
import Vue, { onMounted } from 'vue'
import { injectUseStore } from '~/store'

export default Vue.extend({
  name: 'ConsoleScreen',
  setup() {
    const { aileron, elevator, rudder, stabTrim, targetAileron, targetElevator, targetRudder, cmdAlt, cmdVs, cmdHdg } = injectUseStore()

    onMounted(() => {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.altKey && e.shiftKey) {
          switch (e.key) {
            case 'ArrowUp':
              if (cmdVs.value >= 9999) break
              cmdVs.value += 100
              break
            case 'ArrowDown':
              if (cmdVs.value <= -9999) break
              cmdVs.value -= 100
              break
            case 'ArrowLeft':
              cmdHdg.value -= 1
              break
            case 'ArrowRight':
              cmdHdg.value += 1
              break
        }
          return
        }
        if (e.altKey) {
          switch (e.key) {
            case 'ArrowUp':
              if (cmdAlt.value >= 50000) break
              cmdAlt.value += 100
              break
            case 'ArrowDown':
              if (cmdAlt.value <= 0) break
              cmdAlt.value -= 100
              break
            case 'ArrowLeft':
              cmdHdg.value -= 1
              break
            case 'ArrowRight':
              cmdHdg.value += 1
              break
          }
          return
        }
        if (e.shiftKey) {
          switch (e.key) {
            case 'ArrowUp':
              if (stabTrim.value <= -5.00) break
              stabTrim.value -= 0.05
              break
            case 'ArrowDown':
              if (stabTrim.value >= 5.00) break
              stabTrim.value += 0.05
              break
            case 'ArrowLeft':
              targetRudder.value = -1
              break
            case 'ArrowRight':
              targetRudder.value = 1
              break
          }
          return
        }
        switch (e.key) {
          case 'ArrowUp':
            targetElevator.value = -1
            break
          case 'ArrowDown':
            targetElevator.value = 1
            break
          case 'ArrowLeft':
            targetAileron.value = -1
            break
          case 'ArrowRight':
            targetAileron.value = 1
            break
        }
      })
      document.addEventListener('keyup', (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowDown':
            targetElevator.value = 0
            break
          case 'ArrowLeft':
          case 'ArrowRight':
            targetAileron.value = 0
            targetRudder.value = 0
            break
        }
      })
    })

    return { aileron, elevator, rudder, targetAileron, targetElevator, targetRudder }
  },
})
</script>
