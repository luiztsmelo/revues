<template>
  <div class="star-rating">

    <img src="../assets/images/star.svg" v-for="star in score" :key="star">

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    score: { type: Number, default: 5, required: true }
  }
})
</script>

<style lang="scss" scoped>
.star-rating {
  display: flex;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
    padding: 0 1px;
  }
}
</style>
