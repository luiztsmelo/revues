<template>
  <div id="app">
    <component :is="$route.meta.layout">
      <router-view/>
    </component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  created () {
    this.$store.dispatch('fetchData')
  }
})
</script>

<style lang="scss">
@import '../node_modules/normalize.css/normalize.css';
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

#app {
  font-family: 'Inter';
}
</style>
