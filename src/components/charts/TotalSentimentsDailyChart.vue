<template>
  <apexchart type="bar" height="100%" :options="chartOptions" :series="series" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    series () {
      return this.$store.getters.totalSentimentsDailySeries
    },
    chartOptions () {
      return {
        chart: {
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        colors: ['#2DD278', '#FFB600', '#EE3C37'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '40%'
          }
        },
        grid: {
          show: false,
          padding: {
            left: -30
          }
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            '01/01/2020',
            '02/01/2020',
            '03/01/2020',
            '04/01/2020',
            '05/01/2020',
            '06/01/2020',
            '07/01/2020',
            '08/01/2020'
          ]
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          enabled: false
        }
      }
    }
  }
})
</script>
