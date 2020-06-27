<template>
  <div id="home">

    <Card label="Avaliação Média" style="grid-area: 1 / 1 / 1 / 1">
      <div class="score-container">

        <div class="score">
          <span class="value">{{ $store.getters.averageScore }}</span>
          <span class="total-reviews">{{ $store.state.reviews.length }} avaliações</span>
        </div>

        <TotalReviewsByScoreChart />

      </div>
    </Card>

    <Card label="Média avaliações diárias" style="grid-area: 1 / 2 / 1 / 4">
      <DailyAverageScoreChart />
    </Card>

    <Card label="Últimas avaliações" style="grid-area: 2 / 1 / 3 / 3">
      <div class="reviews-table">
        <div class="review" v-for="(review, index) in $store.getters.latestReviews" :key="index">
          <div class="sentiment">
            <img :src="sentimentImgSrc(review)" :alt="review.sentiment">
          </div>

          <div class="details">
            <span class="reviewer">{{ review.reviewer }}<span class="date">{{ review.date }}</span></span>
            <span class="text">{{ review.text }}</span>
          </div>

          <div class="score">
            <span class="source">{{ review.source }}</span>
            <StarRating :score="review.score" />
          </div>
        </div>
      </div>
    </Card>

    <Card label="Avaliações por canal" style="grid-area: 2 / 3 / 3 / 4">
      <span style="display: none">{{ $store.getters.reviewsDailyValues }}</span>
    </Card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'
import TotalReviewsByScoreChart from '@/components/charts/TotalReviewsByScoreChart.vue'
import DailyAverageScoreChart from '@/components/charts/DailyAverageScoreChart.vue'
import StarRating from '@/components/StarRating.vue'

export default Vue.extend({
  name: 'home',
  components: {
    Card,
    TotalReviewsByScoreChart,
    DailyAverageScoreChart,
    StarRating
  },
  methods: {
    sentimentImgSrc (review) {
      if (review.gender === 'male') {
        return require(`../../assets/images/${review.sentiment === 'Positivo' ? 'positive_male' : 'negative_sentiment'}.svg`)
      } else {
        return require(`../../assets/images/${review.sentiment === 'Positivo' ? 'positive_female' : 'negative_sentiment'}.svg`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
#home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 260px 1fr;
  grid-gap: 22px;

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
    margin-top: 20px;

    .review {
      display: grid;
      grid-template-columns: 90px 4fr 1fr;
      align-items: center;
      padding: 22px 0;
      border-bottom: 1px solid #dedede;

      &:last-child {
        border: none;
      }

      .sentiment {
        display: grid;
        align-items: center;
        justify-content: center;

        img {
          width: 38px;
          height: 38px;
        }
      }

      .details {
        display: grid;

        .reviewer {
          font-size: 14px;
          font-weight: 600;
          padding-bottom: 8px;
        }

        .text {
          font-size: 14px;
        }

        .date {
          font-size: 13px;
          font-weight: 400;
          color: $light_text;
          padding-left: 10px;
        }
      }

      .score {
        display: flex;
        flex-direction: column;
        align-items: center;

        .source {
          font-size: 14px;
          font-weight: 400;
          padding-bottom: 6px;
        }
      }
    }
  }
}
</style>
