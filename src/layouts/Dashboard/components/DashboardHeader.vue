<template>
  <div id="dashboard-header">
    <h1>{{ $route.name }}</h1>
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
}
</style>
