<template>
  <apexchart type="bar" height="85%" :options="chartOptions" :series="series" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    series () {
      return this.$store.getters.totalReviewsBySentimentSeries
    },
    chartOptions () {
      return {
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
            barHeight: '60%',
            distributed: true,
            dataLabels: {
              position: 'top'
            }
          }
        },
        grid: {
          show: false
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
  }
})
</script>
