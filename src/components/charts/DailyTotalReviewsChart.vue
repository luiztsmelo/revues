<template>
  <apexchart type="area" height="100%" :options="chartOptions" :series="series" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    series () {
      const data = []

      for (const date of this.$store.getters.reviewsDailyValues) {
        data.push({
          x: date.date,
          y: date.totalReviews
        })
      }

      return [{ data }]
    },
    chartOptions () {
      return {
        chart: {
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          fontFamily: 'Poppins'
        },
        dataLabels: {
          enabled: true
        },
        colors: ['#26B8EA'],
        stroke: {
          curve: 'smooth',
          colors: ['#26B8EA']
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        },
        yaxis: {
          show: false
        },
        tooltip: {
          enabled: false
        }
      }
    }
  }
})
</script>
