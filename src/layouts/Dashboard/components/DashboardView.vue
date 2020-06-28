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
  padding: 10px 40px 40px 40px;
}
</style>
