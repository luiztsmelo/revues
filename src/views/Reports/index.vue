<template>
  <div id="reports">

    <Card label="Evolução avaliações totais" style="grid-area: 1 / 1 / 1 / 4">
      <TotalReviewsDailyChart />
    </Card>

    <Card label="Evolução avaliações por sentimentos totais" style="grid-area: 2 / 1 / 2 / 4">
      <TotalSentimentsDailyChart />
    </Card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'
import TotalReviewsDailyChart from '@/components/charts/TotalReviewsDailyChart.vue'
import TotalSentimentsDailyChart from '@/components/charts/TotalSentimentsDailyChart.vue'

export default Vue.extend({
  name: 'reports',
  components: {
    Card,
    TotalReviewsDailyChart,
    TotalSentimentsDailyChart
  }
})
</script>

<style lang="scss" scoped>
#reports {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 260px 260px 1fr 1fr;
  grid-gap: 22px;
}
</style>
