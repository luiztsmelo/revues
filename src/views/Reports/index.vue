<template>
  <div id="reports">

    <Card label="Total avaliações diárias" style="grid-area: 1 / 1 / 1 / 4">
      <DailyTotalReviewsChart />
    </Card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'
import DailyTotalReviewsChart from '@/components/charts/DailyTotalReviewsChart.vue'

export default Vue.extend({
  name: 'reports',
  components: {
    Card,
    DailyTotalReviewsChart
  }
})
</script>

<style lang="scss" scoped>
#reports {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 260px 1fr 1fr 1fr;
  grid-gap: 22px;
}
</style>
