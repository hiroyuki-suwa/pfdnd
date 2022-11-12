<template>
  <display-assy>
    <pfd-panel :pitch="pitch" :bank="bank" :heading="heading" :ias="ias" :ground-speed="gs" :altitude="alt" :vertical-speed="vs" :commanded-air-speed="cmdIas" :commanded-altitude="cmdAlt" :course="cmdHdg" :aoa="aoa" :stab-trim="stabTrim" :inchHg="inHg" />
  </display-assy>
</template>

<script lang="ts">
import Vue from 'vue'
import { injectUseStore } from '~/store';

export default Vue.extend({
  name: "PfdAssy",
  setup() {
    const state = injectUseStore();
    return { ...state };
  },
})
</script>
