<template>
  <div id="dashboard-sidebar">

    <span class="logo">revues</span>

    <div class="brand-info">
      <span class="name">Shop. Guanabara</span>
    </div>

    <nav>
      <router-link class="link" :to="link.to" v-for="link in links" :key="link.to" :class="{ 'link-active': $route.path === link.to }">
        <img class="icon" :src="imgSrc(link.iconName)">
        <span class="label">{{ link.label }}</span>
      </router-link>
    </nav>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'dashboard-sidebar',
  props: {
    links: Array
  },
  methods: {
    imgSrc (iconName: string): string {
      return require(`@/assets/images/${iconName}.svg`)
    }
  }
})
</script>

<style lang="scss" scoped>
#dashboard-sidebar {
  grid-area: DashboardSidebar;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $dark_grey;
  padding: 40px 20px;

  .logo {
    text-transform: uppercase;
    font-size: 19px;
    font-weight: 500;
    color: #fff;
    letter-spacing: 5px;
  }

  .brand-info {
    margin: 70px 0;

    .name {
      font-size: 15px;
      font-weight: 500;
      color: #fff;
    }
  }

  nav {
    display: grid;
    grid-gap: 15px;
    width: 100%;

    .link {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 10px;
      border-radius: 4px;

      .icon {
        width: 16px;
        height: auto;
        filter: invert(100%);
        margin-right: 16px;
      }

      .label {
        color: #fff;
        font-size: 14px;
      }
    }

    .link-active {
      background-color: #fff;

      .icon {
        filter: invert(0%);
      }

      .label {
        color: #000;
        font-size: 14px;
      }
    }
  }
}
</style>
