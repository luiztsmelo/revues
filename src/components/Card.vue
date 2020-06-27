<template>
  <div class="card">

    <span class="label">{{ label }}</span>

    <slot />

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'card',
  props: {
    label: { type: String, default: 'Label', required: true }
  }
})
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: $light_grey;
  border-radius: 12px;
  padding: 20px;

  .label {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    word-spacing: 2px;
  }
}
</style>
