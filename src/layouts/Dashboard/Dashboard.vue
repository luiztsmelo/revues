<template>
  <div id="dashboard-layout">

    <DashboardHeader />

    <DashboardSidebar :links="dashboardSidebarLinks" />

    <DashboardView>
      <ScaleLoader :loading="$store.state.loading" color="#FFB600" />
      <slot v-if="!$store.state.loading" />
    </DashboardView>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DashboardHeader from './components/DashboardHeader.vue'
import DashboardSidebar from './components/DashboardSidebar.vue'
import DashboardView from './components/DashboardView.vue'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export default Vue.extend({
  name: 'dashboard-layout',
  components: {
    DashboardHeader,
    DashboardSidebar,
    DashboardView,
    ScaleLoader
  },
  data () {
    return {
      dashboardSidebarLinks: [
        {
          label: 'Visão Geral',
          to: '/',
          iconName: 'dashboard'
        },
        {
          label: 'Avaliações',
          to: '/avaliacoes',
          iconName: 'comment'
        },
        {
          label: 'Relatórios',
          to: '/relatorios',
          iconName: 'reports'
        }
      ]
    }
  }
})
</script>

<style lang="scss">
#dashboard-layout {
  display: grid;
  grid-template-areas:
    'DashboardSidebar DashboardHeader'
    'DashboardSidebar DashboardView';
  grid-template-columns: 220px auto;
  grid-template-rows: 80px auto;
  height: 100vh;
  width: 100vw;
}
</style>
