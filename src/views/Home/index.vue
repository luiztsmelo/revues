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

    <Card label="Últimas avaliações negativas" style="grid-area: 2 / 1 / 5 / 3">
      <div class="reviews-table">
        <Review v-for="(review, index) in $store.getters.latestNegativeReviews(10, 1)" :key="index" :review="review" />
      </div>
    </Card>

    <Card label="Avaliações por sentimento" style="grid-area: 2 / 3 / 3 / 4">
      <apexchart type="bar" height="85%" :options="chartOptionsSentiment" :series="seriesSentiment" />
    </Card>

    <Card label="Avaliações por canal" style="grid-area: 3 / 3 / 4 / 4">
      <apexchart type="bar" height="85%" :options="chartOptionsSource" :series="seriesSource" />
    </Card>

    <Card label="Avaliações por gênero" style="grid-area: 4 / 3 / 5 / 4">
    </Card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'
import TotalReviewsByScoreChart from '@/components/charts/TotalReviewsByScoreChart.vue'
import DailyAverageScoreChart from '@/components/charts/DailyAverageScoreChart.vue'
import Review from '@/components/Review.vue'

export default Vue.extend({
  name: 'home',
  components: {
    Card,
    TotalReviewsByScoreChart,
    DailyAverageScoreChart,
    Review
  },
  data () {
    return {
      seriesSource: [{
        data: [
          {
            x: 'Google',
            y: 80
          },
          {
            x: 'Facebook',
            y: 20
          }
        ]
      }],
      seriesSentiment: [{
        data: [
          {
            x: 'Positivo',
            y: 70
          },
          {
            x: 'Neutro',
            y: 20
          },
          {
            x: 'Negativo',
            y: 10
          }
        ]
      }],
      chartOptionsSource: {
        chart: {
          toolbar: {
            show: false
          },
          fontFamily: 'Poppins'
        },
        tooltip: {
          enabled: false
        },
        colors: ['#181818'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '40%',
            dataLabels: {
              position: 'top'
            }
          }
        },
        grid: {
          show: false
        },
        dataLabels: {
          enabled: true,
          offsetX: -8,
          formatter: function (val) {
            return val + '%'
          },
          style: {
            fontSize: '12px',
            colors: ['#FFF']
          }
        },
        xaxis: {
          labels: {
            show: false
          }
        }
      },
      chartOptionsSentiment: {
        chart: {
          toolbar: {
            show: false
          },
          fontFamily: 'Poppins'
        },
        tooltip: {
          enabled: false
        },
        colors: ['#2DD278', '#FFB600', '#EE3C37'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '50%',
            distributed: true,
            dataLabels: {
              position: 'top'
            }
          }
        },
        grid: {
          show: false
        },
        dataLabels: {
          enabled: true,
          offsetX: -8,
          formatter: function (val) {
            return val + '%'
          },
          style: {
            fontSize: '12px',
            colors: ['#FFF']
          }
        },
        legend: {
          show: false
        },
        xaxis: {
          labels: {
            show: false
          }
        }
      }
    }
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
  grid-template-rows: 260px 1fr 1fr 1fr;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    grid-gap: 22px;
    margin-top: 20px;
  }
}
</style>
