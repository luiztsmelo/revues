<template>
  <apexchart type="bar" height="100%" :options="chartOptions" :series="series" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    series () {
      return this.$store.getters.totalReviewsByScoreSeries
    },
    chartOptions () {
      return {
        chart: {
          toolbar: {
            show: false
          },
          fontFamily: 'Poppins'
        },
        colors: ['#FFB600'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '42%',
            dataLabels: {
              position: 'top'
            },
            colors: {
              backgroundBarColors: ['#e8e8e8']
            }
          }
        },
        grid: {
          show: false
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '11px',
            colors: ['#FFF']
          }
        },
        xaxis: {
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
