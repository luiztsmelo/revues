<template>
  <div id="dashboard-layout">

    <Loading v-if="$store.state.loading" />

    <DashboardHeader />

    <DashboardSidebar :links="dashboardSidebarLinks" />

    <DashboardView>
      <slot />
    </DashboardView>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/Loading.vue'
import DashboardHeader from './components/DashboardHeader.vue'
import DashboardSidebar from './components/DashboardSidebar.vue'
import DashboardView from './components/DashboardView.vue'

export default Vue.extend({
  name: 'dashboard-layout',
  components: {
    Loading,
    DashboardHeader,
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
    'DashboardSidebar DashboardHeader'
    'DashboardSidebar DashboardView';
  grid-template-columns: 230px auto;
  grid-template-rows: 120px auto;
  height: 100vh;
  width: 100vw;
}
</style>
