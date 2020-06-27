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
  display: grid;
  padding: 20px 40px 40px 40px;
}
</style>
