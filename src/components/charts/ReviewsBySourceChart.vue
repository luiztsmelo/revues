<template>
  <apexchart type="bar" height="85%" :options="chartOptions" :series="series" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    series () {
      return this.$store.getters.totalSentimentsBySourceSeries
    },
    chartOptions () {
      return {
        chart: {
          toolbar: {
            show: false
          },
          fontFamily: 'Poppins',
          stacked: true,
          stackType: '100%'
        },
        tooltip: {
          enabled: false
        },
        colors: ['#2DD278', '#FFB600', '#EE3C37'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '40%'
          }
        },
        grid: {
          show: false
        },
        xaxis: {
          categories: ['Facebook', 'Google'],
          labels: {
            show: false
          }
        },
        legend: {
          show: false
        }
      }
    }
  }
})
</script>
