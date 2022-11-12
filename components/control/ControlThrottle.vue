<template>
  <div class="flex flex-col items-center gap-10 -rotate-90">
    <input type="range" v-model="throttleLeft" min="0" max="1" step="0.01" />
    <input type="range" v-model="throttleRight" min="0" max="1" step="0.01" />
  </div>
</template>

<script lang="ts">
import Vue, { onMounted } from 'vue'
import { injectUseStore } from '~/store'

export default Vue.extend({
  name: 'ConsoleScreen',
  setup() {
    const { throttleLeft, throttleRight, cmdIas } = injectUseStore()

    onMounted(() => {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.altKey && e.shiftKey) {
          switch (e.key) {
            case '+':
              throttleLeft.value += 0.01
              throttleRight.value += 0.01
              if (throttleLeft.value > 1) throttleLeft.value = 1
              if (throttleRight.value > 1) throttleRight.value = 1
              break
            case '-':
              throttleLeft.value -= 0.01
              throttleRight.value -= 0.01
              if (throttleLeft.value < 0) throttleLeft.value = 0
              if (throttleRight.value < 0) throttleRight.value = 0
              break
          }
        }
        if (e.altKey) {
          switch (e.key) {
            case '+':
              throttleRight.value += 0.01
              if (throttleRight.value > 1) throttleRight.value = 1
              break
            case '-':
              throttleRight.value -= 0.01
              if (throttleRight.value < 0) throttleRight.value = 0
              break
          }
        }
        if (e.shiftKey) {
          switch (e.key) {
            case '+':
              throttleLeft.value += 0.01
              if (throttleLeft.value > 1) throttleLeft.value = 1
              break
            case '-':
              throttleLeft.value -= 0.01
              if (throttleLeft.value < 0) throttleLeft.value = 0
              break
          }
          return
        }
        switch (e.key) {
          case '+':
            if (cmdIas.value >= 999) break
            cmdIas.value += 1
            break
          case '-':
            if (cmdIas.value <= 45) break
            cmdIas.value -= 1
            break
        }
      })
    })

    return { throttleLeft, throttleRight }
  },
})
</script>
