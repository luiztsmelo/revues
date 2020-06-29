<template>
  <apexchart type="area" height="100%" :options="chartOptions" :series="series" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    series () {
      const data = []

      for (const date of this.$store.getters.reviewsDailyConsolidations) {
        data.push({
          x: date.date,
          y: date.averageScore
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
          enabled: true,
          style: {
            fontSize: '13px',
            fontWeight: '500',
            colors: ['#181818']
          },
          background: {
            padding: 5,
            borderRadius: 5
          }
        },
        colors: ['#FFB600'],
        stroke: {
          curve: 'smooth',
          colors: ['#FFB600']
        },
        grid: {
          show: false
        },
        yaxis: {
          show: false,
          min: 1,
          max: 5
        },
        tooltip: {
          enabled: false
        }
      }
    }
  }
})
</script>
