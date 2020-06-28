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
            barHeight: '40%',
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
          formatter: function (val) {
            return val
          },
          style: {
            fontSize: '11px',
            colors: ['#FFF']
          }
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
