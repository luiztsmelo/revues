<template>
  <div id="reports">

    <Card label="Evolução avaliações totais" style="grid-area: 1 / 1 / 1 / 3">
      <TotalReviewsDailyChart />
    </Card>

    <Card label="Evolução avaliações por sentimentos totais" style="grid-area: 1 / 3 / 1 / 5">
      <TotalSentimentsDailyChart />
    </Card>

    <Card label="Categorias mais elogiadas" style="grid-area: 2 / 1 / 2 / 3">
      <WordCloud
        :data="$store.getters.categoriesBySentiment('Positivo')"
        font="Poppins"
        :fontSize="[10, 60]"
        :showTooltip="false"
        :color="['#2DD278', '#51DD92', '#7FE9B0']"
        :margin="{top: 30, right: 0, bottom: 0, left: 0 }"
      />
    </Card>

    <Card label="Categorias mais reclamadas" style="grid-area: 2 / 3 / 2 / 5">
      <WordCloud
        :data="$store.getters.categoriesBySentiment('Negativo')"
        font="Poppins"
        :fontSize="[10, 60]"
        :showTooltip="false"
        :color="['#EE3C37', '#FF625E', '#FF8B87']"
        :margin="{top: 30, right: 0, bottom: 0, left: 0 }"
      />
    </Card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'
import TotalReviewsDailyChart from '@/components/charts/TotalReviewsDailyChart.vue'
import TotalSentimentsDailyChart from '@/components/charts/TotalSentimentsDailyChart.vue'
import WordCloud from 'vue-wordcloud'

export default Vue.extend({
  name: 'reports',
  components: {
    Card,
    TotalReviewsDailyChart,
    TotalSentimentsDailyChart,
    WordCloud
  }
})
</script>

<style lang="scss" scoped>
#reports {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 280px 280px;
  grid-gap: 22px;
  width: 100%;
}

.wordCloud {
  cursor: default;
  user-select: none;
}
</style>
