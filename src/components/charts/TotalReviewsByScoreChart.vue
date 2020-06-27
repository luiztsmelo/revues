<template>
  <apexchart type="bar" height="100%" :options="chartOptions" :series="series" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    series () {
      return [{ data: this.$store.getters.totalReviewsByScore }]
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
            barHeight: '26%',
            colors: {
              backgroundBarColors: ['#dedede']
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          labels: {
            show: false
          },
          categories: ['5', '4', '3', '2', '1']
        },
        tooltip: {
          enabled: false
        }
      }
    }
  }
})
</script>
