<template>
  <button type="button" :class="theme" :disabled="disabled">
    <img class="icon" :src="imgSrc" v-if="icon">
    <span class="text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: { type: String, default: 'button', required: true },
    theme: { type: String, default: 'primary', required: true },
    disabled: { type: Boolean, default: false, required: false },
    icon: { type: String, required: false }
  },
  computed: {
    imgSrc (): string {
      return require(`@/assets/images/${this.icon}.svg`)
    }
  }
})
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  height: 36px;
  border-radius: 18px;
  border: none;
  padding: 0 13px;
  justify-self: start;

  .text {
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    text-align: center;
  }

  .icon {
    width: 14px;
    height: 14px;
    margin-right: 8px;
  }
}

.primary {
  background-color: $light_blue;
  color: #fff;

  > .icon {
    filter: grayscale(100%) brightness(1000%);
  }
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>
