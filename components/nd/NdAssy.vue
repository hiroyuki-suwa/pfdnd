<template>
  <display-assy>
    <nd-panel :heading="heading" :tracking="tracking" :course="cmdHdg" />
  </display-assy>
</template>

<script lang="ts">
import Vue from 'vue'
import { injectUseStore } from '~/store';

export default Vue.extend({
  name: "NdAssy",
  setup() {
      const state = injectUseStore();
      return { ...state };
  },
})
</script>
