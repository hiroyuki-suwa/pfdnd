<template>
  <div class="overflow-hidden">
    <div class="fixed inset-0 bg-stone-700" />
    <div class="pfdnd relative w-screen h-screen pt-32 flex flex-col md:flex-row justify-center items-center md:items-start">
      <pfd-assy class="-mx-2" />
      <nd-assy class="-mx-2" />
      <eicas-assy class="-mx-2" />
    </div>
    <hud-screen class="fixed top-0 inset-x-0" />
    <control-stick v-show="false" class="fixed bottom-10 left-10" />
    <control-throttle v-show="false" class="fixed bottom-10 right-10" />
    <button class="fixed top-4 right-4 p-2 border border-red-500 text-red-500" @click="toggleSimulation">{{ label }}</button>
  </div>
</template>

<script lang="ts">
import Vue, { onMounted, onUnmounted, ref } from 'vue'
import { provideUseStore } from '~/store'

export default Vue.extend({
  name: 'IndexPage',
  setup() {
    const fps = 100
    const timelapse = 1
    const label = ref('START')
    const { controlAircraft } = provideUseStore(fps)
    let timer: NodeJS.Timer | undefined

    const startSimulation = () => {
      timer = setInterval(controlAircraft, 1000 / fps / timelapse)
      label.value = 'PAUSE'
    }
    const stopSimulation = () => {
      clearInterval(timer); timer = undefined
      label.value = 'RESUME'
    }
    const toggleSimulation = () => {
      if (timer) { stopSimulation(); return }
      startSimulation()
    }

    onMounted(() => {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        console.log(e.key)
        switch (e.key) {
          case ' ':
            toggleSimulation()
            break
        }
      })
    })

    onUnmounted(stopSimulation)

    return { toggleSimulation, label }
  },
})
</script>

<style scoped>
.pfdnd {
  transform: scale(.6);
}

@screen sm {
  .pfdnd {
    transform: scale(.6);
  }
}

@screen md {
  .pfdnd {
    transform: scale(.4);
  }
}

@screen lg {
  .pfdnd {
    transform: scale(.55);
  }
}

@screen xl {
  .pfdnd {
    transform: scale(.7);
  }
}
</style>
