<template>
  <div id="dashboard-layout">

    <DashboardSidebar :links="dashboardSidebarLinks" />

    <DashboardView>
      <slot />
    </DashboardView>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DashboardSidebar from './components/DashboardSidebar.vue'
import DashboardView from './components/DashboardView.vue'

export default Vue.extend({
  name: 'dashboard-layout',
  components: {
    DashboardSidebar,
    DashboardView
  },
  data () {
    return {
      dashboardSidebarLinks: [
        {
          label: 'Início',
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
    'DashboardSidebar DashboardView';
  grid-template-columns: 220px auto;
  height: 100vh;
  width: 100vw;
}
</style>
