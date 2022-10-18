<template>
  <div class="flex flex-col justify-center items-center">
    <div class="w-24 text-3xl text-white text-center border border-white">{{ alt }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PfdAltitude',
  props: {
    alt: {
      type: Number,
      default: 0,
    },
  },
})
</script>
