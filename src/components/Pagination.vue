<template>
  <div class="pagination">
    <button @click="$store.dispatch('previousPage')">
      <img src="../assets/images/left-chevron.svg">
    </button>

    <span class="range">{{ paginationRange }} de {{ $store.getters.filteredReviews(0, 0).length }}</span>

    <button @click="$store.dispatch('nextPage')">
      <img src="../assets/images/right-chevron.svg">
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    paginationRange (): string {
      const firstItem = this.$store.state.pagination.itemsPerPage * this.$store.state.pagination.page - (this.$store.state.pagination.itemsPerPage - 1)
      const lastItem = this.$store.state.pagination.itemsPerPage * this.$store.state.pagination.page

      return firstItem + ' - ' + lastItem
    }
  }
})
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-self: center;
  align-self: center;

  .range {
    font-size: 14px;
    font-weight: 400;
    width: 140px;
    text-align: center;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $dark_grey;

    &:hover {
      background-color: $medium_grey;
    }

    img {
      height: 12px;
      width: 12px;
    }
  }
}
</style>
