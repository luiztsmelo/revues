<template>
  <div id="home">

    <Card label="Pontuação Média" style="grid-area: 1 / 1 / 1 / 1">
      <div class="score-container">

        <div class="score">
          <span class="value">{{ $store.getters.averageScore }}</span>
          <span class="total-reviews">{{ $store.state.reviews.length }} avaliações</span>
        </div>

        <TotalReviewsByScoreChart />

      </div>
    </Card>

    <Card label="Evolução pontuação média" style="grid-area: 1 / 2 / 1 / 4">
      <AverageScoreDailyChart />
    </Card>

    <Card label="Últimas avaliações negativas" style="grid-area: 2 / 1 / 5 / 3">
      <div class="reviews-table">
        <Review v-for="(review, index) in $store.getters.latestNegativeReviews(10, 1)" :key="index" :review="review" />
      </div>
    </Card>

    <Card label="Avaliações por sentimento" style="grid-area: 2 / 3 / 3 / 4">
      <ReviewsBySentimentChart />
    </Card>

    <Card label="Sentimentos por canal" style="grid-area: 3 / 3 / 4 / 4">
      <ReviewsBySourceChart />
    </Card>

    <Card label="Sentimentos por gênero" style="grid-area: 4 / 3 / 5 / 4">
      <ReviewsByGenderChart />
    </Card>

    <Card label="Evolução avaliações totais" style="grid-area: 5 / 1 / 6 / 4">
      <TotalReviewsDailyChart />
    </Card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'
import TotalReviewsByScoreChart from '@/components/charts/TotalReviewsByScoreChart.vue'
import AverageScoreDailyChart from '@/components/charts/AverageScoreDailyChart.vue'
import ReviewsBySentimentChart from '@/components/charts/ReviewsBySentimentChart.vue'
import ReviewsBySourceChart from '@/components/charts/ReviewsBySourceChart.vue'
import ReviewsByGenderChart from '@/components/charts/ReviewsByGenderChart.vue'
import TotalReviewsDailyChart from '@/components/charts/TotalReviewsDailyChart.vue'
import Review from '@/components/Review.vue'

export default Vue.extend({
  name: 'Visão Geral',
  components: {
    Card,
    TotalReviewsByScoreChart,
    AverageScoreDailyChart,
    ReviewsBySentimentChart,
    ReviewsBySourceChart,
    ReviewsByGenderChart,
    TotalReviewsDailyChart,
    Review
  }
})
</script>

<style lang="scss" scoped>
#home {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 260px 1fr 1fr 1fr 260px;
  grid-gap: 22px;
  width: 100%;

  .score-container {
    display: grid;
    grid-template-columns: 3fr 7fr;
    grid-gap: 12px;
    align-items: center;
    height: 100%;

    .score {
      display: flex;
      flex-direction: column;
      align-items: center;

      .value {
        font-size: 72px;
        font-weight: 500;
        padding-bottom: 5px;
      }

      .total-reviews {
        font-size: 13px;
        font-weight: 500;
      }
    }
  }

  .reviews-table {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 120px;
    grid-gap: 22px;
    margin-top: 20px;
  }
}
</style>
