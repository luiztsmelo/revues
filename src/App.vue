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
  mounted () {
    this.$store.commit('SET_WINDOW_WIDTH', window.outerWidth)
    this.$store.commit('SET_PAGINATION_ITEMS_PER_PAGE', this.$store.state.windowWidth <= 1440 ? 6 : 12)
    this.$store.dispatch('fetchReviews')
  }
})
</script>

<style lang="scss">
@import '../node_modules/normalize.css/normalize.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

#app {
  font-family: 'Poppins';
  color: $dark_text;
}
</style>
