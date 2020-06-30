<template>
  <div class="reviews-filter">
    <button type="button" @click.stop="filterButtonClick" :class="buttonClasses">{{ label }}</button>

    <div class="options" v-if="$store.state.openedFilter === parameter">
      <span
        class="option"
        :class="{ 'selected-option': $store.state.filters.includes(option) }"
        v-for="option in filteredOptions"
        :key="option.value"
        @click="optionClick(option)"
        >{{ option.text }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { filter } from 'lodash'
import { Filter } from '@/types'

export default Vue.extend({
  props: {
    label: { type: String, required: true },
    parameter: { type: String, required: true }
  },
  data () {
    return {
      filterOptions: [
        { parameter: 'score', text: '1 estrela', value: 1 },
        { parameter: 'score', text: '2 estrelas', value: 2 },
        { parameter: 'score', text: '3 estrelas', value: 3 },
        { parameter: 'score', text: '4 estrelas', value: 4 },
        { parameter: 'score', text: '5 estrelas', value: 5 },
        { parameter: 'sentiment', text: 'Positivo', value: 'Positivo' },
        { parameter: 'sentiment', text: 'Neutro', value: 'Neutro' },
        { parameter: 'sentiment', text: 'Negativo', value: 'Negativo' },
        { parameter: 'gender', text: 'Feminino', value: 'female' },
        { parameter: 'gender', text: 'Masculino', value: 'male' },
        { parameter: 'gender', text: 'Outro', value: 'other' },
        { parameter: 'source', text: 'Google', value: 'Google' },
        { parameter: 'source', text: 'Facebook', value: 'Facebook' }
      ]
    }
  },
  methods: {
    filterButtonClick () {
      if (this.$store.state.openedFilter && this.$store.state.openedFilter === this.parameter) {
        this.$store.commit('SET_OPENDED_FILTER', '')
      } else {
        this.$store.commit('SET_OPENDED_FILTER', this.parameter)
      }
    },
    optionClick (option: Filter) {
      this.$store.commit('SET_FILTER', option)
      this.$store.commit('SET_OPENDED_FILTER', '')
    }
  },
  computed: {
    filteredOptions (): Filter {
      return filter(this.filterOptions, { parameter: this.parameter })
    },
    buttonClasses () {
      let isOpened = false
      let someSelected = false

      if (this.$store.state.openedFilter === this.parameter) {
        isOpened = true
      }

      if (filter(this.$store.state.filters, { parameter: this.parameter }).length > 0) {
        someSelected = true
      }

      return {
        opened: isOpened,
        selected: someSelected
      }
    }
  },
  watch: {
    '$store.state.filters' (value: Filter) {
      if (value) {
        this.$store.commit('SET_PAGINATION_PAGE', 1)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.reviews-filter {
  position: relative;

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    height: 28px;
    border-radius: 18px;
    border: 1px solid $medium_grey;
    padding: 0 12px;
    margin-right: 7px;
    background-color: #fff;
    font-size: 13px;
    font-weight: 500;

    &:hover {
      border: 1px solid $dark_grey;
      background-color: $lightest_grey;
    }
  }

  .opened {
    border: 1px solid $dark_grey;
    background-color: $lightest_grey;
  }

  .selected {
    border: 1px solid $dark_grey !important;
    background-color: $dark_grey !important;
    color: #fff !important;
  }

  .options {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(36px);
    width: 180px;
    background-color: #fff;
    border-radius: 12px;
    border: 1px solid $light_grey;
    overflow: hidden;
    z-index: 2;

    .option {
      cursor: pointer;
      line-height: 36px;
      border-bottom: 1px solid $light_grey;
      padding: 0 15px;
      font-size: 14px;
      font-weight: 400;

      &:last-child {
        border: none;
      }

      &:hover {
        background-color: $lightest_grey;
      }
    }

    .selected-option {
      background-color: $dark_grey !important;
      color: #fff !important;
    }
  }
}
</style>
