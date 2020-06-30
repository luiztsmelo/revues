<template>
  <div id="dashboard-header">
    <span class="page-name">{{ $route.name }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'dashboard-header'
})
</script>

<style lang="scss">
#dashboard-header {
  grid-area: DashboardHeader;
  display: grid;
  align-items: center;
  padding: 0 40px;
  border-bottom: 1px solid $light_grey;

  .page-name {
    font-size: 26px;
    font-weight: 700;
  }
}
</style>
