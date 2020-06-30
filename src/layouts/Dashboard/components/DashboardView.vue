<template>
  <div id="dashboard-view">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'dashboard-view'
})
</script>

<style lang="scss">
#dashboard-view {
  grid-area: DashboardView;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  overflow: auto !important;
}
</style>
