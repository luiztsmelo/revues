<template>
  <div id="reviews" @click="$store.commit('SET_OPENDED_FILTER', null)">

    <div class="filters">
      <span class="label">Filtros: </span>
      <ReviewsFilter label="Avaliação" parameter="score" />
      <ReviewsFilter label="Sentimento" parameter="sentiment" />
      <ReviewsFilter label="Gênero" parameter="gender" />
      <ReviewsFilter label="Canal" parameter="source" />
    </div>

    <Card>
      <div class="reviews-grid">
        <Review v-for="(review, index) in $store.getters.filteredReviews($store.state.pagination.itemsPerPage, $store.state.pagination.page)" :key="index" :review="review" />
        <span v-if="$store.getters.filteredReviews(0, 0).length === 0" >Nenhum resultado encontrado.</span>
      </div>
    </Card>

    <Pagination />

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ReviewsFilter from '@/components/ReviewsFilter.vue'
import Card from '@/components/Card.vue'
import Review from '@/components/Review.vue'
import Pagination from '@/components/Pagination.vue'

export default Vue.extend({
  name: 'reviews',
  components: {
    ReviewsFilter,
    Card,
    Review,
    Pagination
  }
})
</script>

<style lang="scss" scoped>
#reviews {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 28px auto 50px;
  grid-gap: 22px;

  .filters {
    display: flex;
    align-items: center;

    .label {
      padding-right: 9px;
      font-size: 15px;
      font-weight: 500;
    }
  }

  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 120px;
    grid-gap: 25px;
    align-items: center;
  }
}
</style>
